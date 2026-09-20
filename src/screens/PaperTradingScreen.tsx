import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView, SafeAreaView, Alert, Switch, TextInput, Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColors } from '../context/ThemeContext';
import type { ThemeColors } from '../theme/colors';
import { spacing, radius, fonts } from '../theme/spacing';
import { STORAGE_KEYS } from '../utils/storage';
import PriceChart from '../components/PriceChart';
import { INSTRUMENTS } from '../data/instruments';
import { useEntitlements } from '../context/EntitlementsContext';
import SubscriptionGate from '../components/SubscriptionGate';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { HomeStackParamList } from '../navigation/types';

type Holding = {
  symbol: string;
  qty: number;
  avgPrice: number;
  stopLoss: number | null;
  target: number | null;
  trailingPercent: number | null;
  trailingHigh: number | null;
};

type OrderReason = 'Manual' | 'Stop-Loss' | 'Target' | 'Trailing SL';

type OrderRecord = {
  id: string;
  symbol: string;
  side: 'BUY' | 'SELL';
  qty: number;
  price: number;
  reason: OrderReason;
  timestamp: string;
};

type SimState = { cash: number; holdings: Holding[]; orders: OrderRecord[] };

const STARTING_CASH = 100000;
const TICK_MS = 2500;
const HISTORY_CAP = 24;

const defaultSim: SimState = { cash: STARTING_CASH, holdings: [], orders: [] };

function formatRupees(n: number) {
  return `₹${n.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`;
}

function seedHistory(prices: Record<string, number>) {
  const map: Record<string, number[]> = {};
  INSTRUMENTS.forEach((ins) => {
    const points: number[] = [];
    let price = ins.base;
    for (let i = 0; i < 12; i++) {
      price = Math.max(ins.base * 0.85, price + (Math.random() - 0.5) * ins.base * 0.01);
      points.push(Math.round(price * 100) / 100);
    }
    map[ins.symbol] = points;
    prices[ins.symbol] = points[points.length - 1];
  });
  return map;
}

function getReasonColor(colors: ThemeColors): Record<OrderReason, string> {
  return {
    Manual: colors.primary,
    'Stop-Loss': colors.danger,
    Target: colors.success,
    'Trailing SL': colors.gold,
  };
}

type TabKey = 'market' | 'portfolio' | 'orders';

type Props = NativeStackScreenProps<HomeStackParamList, 'PaperTrading'>;

export default function PaperTradingScreen({ navigation }: Props) {
  const colors = useThemeColors();
  const styles = makeStyles(colors);
  const reasonColor = getReasonColor(colors);
  const [loaded, setLoaded] = useState(false);
  const { isSubscribed } = useEntitlements();
  const [, bump] = useState(0);
  const rerender = () => bump((n) => n + 1);

  const simRef = useRef<SimState>(defaultSim);
  const pricesRef = useRef<Record<string, number> | null>(null);
  const historyRef = useRef<Record<string, number[]> | null>(null);
  const equityHistoryRef = useRef<number[]>([]);

  if (pricesRef.current === null) {
    pricesRef.current = {};
    historyRef.current = seedHistory(pricesRef.current);
  }

  const [tab, setTab] = useState<TabKey>('market');
  const [expanded, setExpanded] = useState<string | null>(null);
  const [qty, setQty] = useState(1);
  const [useSL, setUseSL] = useState(false);
  const [slPrice, setSlPrice] = useState('');
  const [useTarget, setUseTarget] = useState(false);
  const [targetPrice, setTargetPrice] = useState('');
  const [useTrailing, setUseTrailing] = useState(false);
  const [trailingPct, setTrailingPct] = useState('2');

  const liveDot = useRef(new Animated.Value(0.3)).current;

  const persistSim = () => {
    AsyncStorage.setItem(STORAGE_KEYS.paperTrading, JSON.stringify(simRef.current)).catch(() => {});
  };

  // Load any saved cash / holdings / order history.
  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEYS.paperTrading);
        if (raw) {
          const parsed = JSON.parse(raw);
          simRef.current = {
            cash: typeof parsed.cash === 'number' ? parsed.cash : STARTING_CASH,
            holdings: Array.isArray(parsed.holdings) ? parsed.holdings : [],
            orders: Array.isArray(parsed.orders) ? parsed.orders : [],
          };
        }
      } catch {
        // ignore
      } finally {
        setLoaded(true);
        rerender();
      }
    })();
  }, []);

  // The "LIVE" pulsing dot.
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(liveDot, { toValue: 1, duration: 700, useNativeDriver: true }),
        Animated.timing(liveDot, { toValue: 0.3, duration: 700, useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [liveDot]);

  // The live market tick — moves every instrument's price a little, then
  // checks every open position's stop-loss / target / trailing stop-loss
  // and auto-closes anything that's been triggered.
  useEffect(() => {
    const id = setInterval(() => {
      const prices = pricesRef.current!;
      const history = historyRef.current!;

      INSTRUMENTS.forEach((ins) => {
        const prev = prices[ins.symbol] ?? ins.base;
        const drift = (Math.random() - 0.5) * ins.base * 0.006;
        let next = prev + drift;
        next = Math.max(ins.base * 0.7, Math.min(ins.base * 1.3, next));
        next = Math.round(next * 100) / 100;
        prices[ins.symbol] = next;
        const hist = history[ins.symbol] ?? [];
        hist.push(next);
        if (hist.length > HISTORY_CAP) hist.shift();
        history[ins.symbol] = hist;
      });

      let changed = false;
      const survivors: Holding[] = [];
      for (const h of simRef.current.holdings) {
        const price = prices[h.symbol];
        let sell = false;
        let reason: OrderReason = 'Manual';

        if (h.trailingPercent) {
          const newHigh = Math.max(h.trailingHigh ?? h.avgPrice, price);
          h.trailingHigh = newHigh;
          const trigger = newHigh * (1 - h.trailingPercent / 100);
          if (price <= trigger) {
            sell = true;
            reason = 'Trailing SL';
          }
        }
        if (!sell && h.stopLoss != null && price <= h.stopLoss) {
          sell = true;
          reason = 'Stop-Loss';
        }
        if (!sell && h.target != null && price >= h.target) {
          sell = true;
          reason = 'Target';
        }

        if (sell) {
          simRef.current.cash += price * h.qty;
          simRef.current.orders = [
            {
              id: `${Date.now()}-${h.symbol}-${reason}`,
              symbol: h.symbol,
              side: 'SELL',
              qty: h.qty,
              price,
              reason,
              timestamp: new Date().toISOString(),
            },
            ...simRef.current.orders,
          ];
          changed = true;
        } else {
          survivors.push(h);
        }
      }
      simRef.current.holdings = survivors;

      const holdingsValue = survivors.reduce((sum, h) => sum + (prices[h.symbol] ?? h.avgPrice) * h.qty, 0);
      const equity = simRef.current.cash + holdingsValue;
      const eq = equityHistoryRef.current;
      eq.push(Math.round(equity * 100) / 100);
      if (eq.length > 40) eq.shift();

      if (changed) persistSim();
      rerender();
    }, TICK_MS);
    return () => clearInterval(id);
  }, []);

  if (!loaded) return <SafeAreaView style={styles.root} />;

  if (!isSubscribed) {
    return (
      <SubscriptionGate
        icon="trending-up"
        title="Paper Trading is a membership feature"
        message="Practice trading with virtual money using live-style prices. Subscribe to unlock Paper Trading, Trading Journal and all lessons."
        onSubscribe={() => (navigation.getParent() as any)?.navigate('ProfileTab', { screen: 'Subscription' })}
        onBack={() => navigation.goBack()}
      />
    );
  }

  const prices = pricesRef.current!;
  const history = historyRef.current!;
  const { cash, holdings, orders } = simRef.current;
  const holdingsValue = holdings.reduce((sum, h) => sum + (prices[h.symbol] ?? h.avgPrice) * h.qty, 0);
  const portfolioValue = cash + holdingsValue;
  const totalPnl = portfolioValue - STARTING_CASH;

  const resetAdvancedForm = () => {
    setQty(1);
    setUseSL(false);
    setSlPrice('');
    setUseTarget(false);
    setTargetPrice('');
    setUseTrailing(false);
    setTrailingPct('2');
  };

  const buy = (symbol: string) => {
    const price = prices[symbol];
    const cost = price * qty;
    if (qty <= 0) return;
    if (cost > simRef.current.cash) {
      Alert.alert(
        'Not enough cash',
        `You need ${formatRupees(cost)} but only have ${formatRupees(simRef.current.cash)} available.`
      );
      return;
    }
    const sl = useSL && slPrice.trim() ? parseFloat(slPrice) : null;
    const target = useTarget && targetPrice.trim() ? parseFloat(targetPrice) : null;
    const trailing = useTrailing && trailingPct.trim() ? parseFloat(trailingPct) : null;

    const existing = simRef.current.holdings.find((h) => h.symbol === symbol);
    if (existing) {
      const newQty = existing.qty + qty;
      existing.avgPrice = (existing.avgPrice * existing.qty + cost) / newQty;
      existing.qty = newQty;
      if (sl !== null && !isNaN(sl)) existing.stopLoss = sl;
      if (target !== null && !isNaN(target)) existing.target = target;
      if (trailing !== null && !isNaN(trailing)) {
        existing.trailingPercent = trailing;
        existing.trailingHigh = Math.max(existing.trailingHigh ?? price, price);
      }
    } else {
      simRef.current.holdings.push({
        symbol,
        qty,
        avgPrice: price,
        stopLoss: sl !== null && !isNaN(sl) ? sl : null,
        target: target !== null && !isNaN(target) ? target : null,
        trailingPercent: trailing !== null && !isNaN(trailing) ? trailing : null,
        trailingHigh: trailing !== null && !isNaN(trailing) ? price : null,
      });
    }
    simRef.current.cash -= cost;
    simRef.current.orders = [
      { id: `${Date.now()}-buy`, symbol, side: 'BUY', qty, price, reason: 'Manual', timestamp: new Date().toISOString() },
      ...simRef.current.orders,
    ];
    persistSim();
    resetAdvancedForm();
    setExpanded(null);
    rerender();
  };

  const sell = (symbol: string) => {
    const existing = simRef.current.holdings.find((h) => h.symbol === symbol);
    if (!existing || qty <= 0) return;
    const price = prices[symbol];
    const sellQty = Math.min(qty, existing.qty);
    simRef.current.cash += price * sellQty;
    existing.qty -= sellQty;
    simRef.current.orders = [
      {
        id: `${Date.now()}-sell`,
        symbol,
        side: 'SELL',
        qty: sellQty,
        price,
        reason: 'Manual',
        timestamp: new Date().toISOString(),
      },
      ...simRef.current.orders,
    ];
    if (existing.qty <= 0) simRef.current.holdings = simRef.current.holdings.filter((h) => h.symbol !== symbol);
    persistSim();
    resetAdvancedForm();
    setExpanded(null);
    rerender();
  };

  const closePosition = (symbol: string) => {
    const existing = simRef.current.holdings.find((h) => h.symbol === symbol);
    if (!existing) return;
    const price = prices[symbol];
    simRef.current.cash += price * existing.qty;
    simRef.current.orders = [
      {
        id: `${Date.now()}-close`,
        symbol,
        side: 'SELL',
        qty: existing.qty,
        price,
        reason: 'Manual',
        timestamp: new Date().toISOString(),
      },
      ...simRef.current.orders,
    ];
    simRef.current.holdings = simRef.current.holdings.filter((h) => h.symbol !== symbol);
    persistSim();
    rerender();
  };

  const resetPortfolio = () => {
    simRef.current = { ...defaultSim };
    equityHistoryRef.current = [];
    persistSim();
    rerender();
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
        <View style={styles.headerTopRow}>
          <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={18} color="#fff" />
          </Pressable>
          <View style={styles.liveBadge}>
            <Animated.View style={[styles.liveDot, { opacity: liveDot }]} />
            <Text style={styles.liveBadgeText}>LIVE</Text>
          </View>
        </View>
        <Text style={styles.headerLabel}>Portfolio value</Text>
        <Text style={styles.headerValue}>{formatRupees(portfolioValue)}</Text>
        <View style={styles.headerStatsRow}>
          <Text style={[styles.headerPnl, totalPnl >= 0 ? styles.pnlPositive : styles.pnlNegative]}>
            {totalPnl >= 0 ? '+' : ''}
            {formatRupees(totalPnl)} overall
          </Text>
          <Text style={styles.headerCash}>Cash: {formatRupees(cash)}</Text>
        </View>
      </View>

      <View style={styles.tabRow}>
        {(['market', 'portfolio', 'orders'] as TabKey[]).map((t) => (
          <Pressable key={t} style={[styles.tabChip, tab === t && styles.tabChipActive]} onPress={() => setTab(t)}>
            <Text style={[styles.tabChipText, tab === t && styles.tabChipTextActive]}>
              {t === 'market' ? 'Market' : t === 'portfolio' ? 'Portfolio' : 'Orders'}
            </Text>
          </Pressable>
        ))}
        <Pressable style={styles.tabChip} onPress={() => navigation.navigate('OptionsChain')}>
          <Text style={styles.tabChipText}>Options</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={{ padding: spacing.lg }} keyboardShouldPersistTaps="handled">
        {tab === 'market' && (
          <>
            <View style={styles.demoBanner}>
              <Ionicons name="information-circle-outline" size={16} color={colors.primary} />
              <Text style={styles.demoBannerText}>
                Prices tick live every {TICK_MS / 1000}s while this screen is open. Stop-loss, target & trailing
                stop-loss orders execute automatically the moment they're triggered.
              </Text>
            </View>

            {INSTRUMENTS.map((ins) => {
              const price = prices[ins.symbol];
              const hist = history[ins.symbol];
              const changePct = ((hist[hist.length - 1] - hist[0]) / hist[0]) * 100;
              const trendColor = changePct >= 0 ? colors.success : colors.danger;
              const isExpanded = expanded === ins.symbol;
              const holding = holdings.find((h) => h.symbol === ins.symbol);

              return (
                <View key={ins.symbol} style={styles.instrumentCard}>
                  <Pressable
                    style={styles.instrumentRow}
                    onPress={() => {
                      resetAdvancedForm();
                      setExpanded(isExpanded ? null : ins.symbol);
                    }}
                  >
                    <View style={{ flex: 1 }}>
                      <Text style={styles.instrumentSymbol}>{ins.symbol}</Text>
                      <Text style={styles.instrumentName}>{ins.name}</Text>
                    </View>
                    <PriceChart
                      data={hist}
                      width={56}
                      height={26}
                      color={trendColor}
                      strokeWidth={1.5}
                      showArea={false}
                      showDot={false}
                      gradientId={`spark-${ins.symbol}`}
                    />
                    <View style={styles.priceBlock}>
                      <Text style={styles.instrumentPrice}>{formatRupees(price)}</Text>
                      <Text style={[styles.instrumentChange, { color: trendColor }]}>
                        {changePct >= 0 ? '+' : ''}
                        {changePct.toFixed(1)}%
                      </Text>
                    </View>
                    <Ionicons
                      name={isExpanded ? 'chevron-up' : 'chevron-down'}
                      size={18}
                      color={colors.textLight}
                      style={{ marginLeft: spacing.sm }}
                    />
                  </Pressable>

                  {isExpanded && (
                    <View style={styles.tradePanel}>
                      <View style={styles.detailChartWrap}>
                        <PriceChart
                          data={hist}
                          width={264}
                          height={90}
                          color={trendColor}
                          baseline={hist[0]}
                          gradientId={`chart-${ins.symbol}`}
                        />
                      </View>
                      <Pressable
                        style={styles.fullChartLink}
                        onPress={() => navigation.navigate('ChartView', { symbol: ins.symbol })}
                      >
                        <Ionicons name="stats-chart-outline" size={13} color={colors.primary} />
                        <Text style={styles.fullChartLinkText}>View full chart</Text>
                      </Pressable>

                      <View style={styles.qtyRow}>
                        <Text style={styles.qtyLabel}>Quantity</Text>
                        <View style={styles.stepper}>
                          <Pressable style={styles.stepperBtn} onPress={() => setQty((q) => Math.max(1, q - 1))}>
                            <Ionicons name="remove" size={16} color={colors.primary} />
                          </Pressable>
                          <Text style={styles.stepperValue}>{qty}</Text>
                          <Pressable style={styles.stepperBtn} onPress={() => setQty((q) => q + 1)}>
                            <Ionicons name="add" size={16} color={colors.primary} />
                          </Pressable>
                        </View>
                      </View>
                      <Text style={styles.estCost}>Est. cost: {formatRupees(price * qty)}</Text>

                      <View style={styles.advancedBox}>
                        <Text style={styles.advancedTitle}>Order options (optional)</Text>

                        <View style={styles.switchRow}>
                          <View style={{ flex: 1 }}>
                            <Text style={styles.switchLabel}>Stop-Loss</Text>
                            {useSL && (
                              <TextInput
                                style={styles.switchInput}
                                value={slPrice}
                                onChangeText={setSlPrice}
                                keyboardType="decimal-pad"
                                placeholder={`e.g. ${Math.round(price * 0.97)}`}
                                placeholderTextColor={colors.textLight}
                              />
                            )}
                          </View>
                          <Switch
                            value={useSL}
                            onValueChange={(v) => {
                              setUseSL(v);
                              if (v && !slPrice) setSlPrice(String(Math.round(price * 0.97)));
                            }}
                            trackColor={{ true: colors.primary, false: colors.border }}
                          />
                        </View>

                        <View style={styles.switchRow}>
                          <View style={{ flex: 1 }}>
                            <Text style={styles.switchLabel}>Target</Text>
                            {useTarget && (
                              <TextInput
                                style={styles.switchInput}
                                value={targetPrice}
                                onChangeText={setTargetPrice}
                                keyboardType="decimal-pad"
                                placeholder={`e.g. ${Math.round(price * 1.05)}`}
                                placeholderTextColor={colors.textLight}
                              />
                            )}
                          </View>
                          <Switch
                            value={useTarget}
                            onValueChange={(v) => {
                              setUseTarget(v);
                              if (v && !targetPrice) setTargetPrice(String(Math.round(price * 1.05)));
                            }}
                            trackColor={{ true: colors.primary, false: colors.border }}
                          />
                        </View>

                        <View style={styles.switchRow}>
                          <View style={{ flex: 1 }}>
                            <Text style={styles.switchLabel}>Trailing Stop-Loss</Text>
                            {useTrailing && (
                              <View style={styles.trailingInputRow}>
                                <TextInput
                                  style={[styles.switchInput, { flex: 1 }]}
                                  value={trailingPct}
                                  onChangeText={setTrailingPct}
                                  keyboardType="decimal-pad"
                                  placeholder="2"
                                  placeholderTextColor={colors.textLight}
                                />
                                <Text style={styles.trailingPctSign}>%</Text>
                              </View>
                            )}
                          </View>
                          <Switch value={useTrailing} onValueChange={setUseTrailing} trackColor={{ true: colors.primary, false: colors.border }} />
                        </View>
                      </View>

                      <View style={styles.tradeButtonsRow}>
                        <Pressable style={[styles.tradeButton, styles.buyButton]} onPress={() => buy(ins.symbol)}>
                          <Text style={styles.tradeButtonText}>Buy</Text>
                        </Pressable>
                        <Pressable
                          style={[styles.tradeButton, styles.sellButton, !holding && styles.tradeButtonDisabled]}
                          onPress={() => sell(ins.symbol)}
                          disabled={!holding}
                        >
                          <Text style={[styles.tradeButtonText, !holding && styles.tradeButtonTextDisabled]}>Sell</Text>
                        </Pressable>
                      </View>
                    </View>
                  )}
                </View>
              );
            })}

            <Pressable style={styles.resetButton} onPress={resetPortfolio}>
              <Ionicons name="refresh-outline" size={15} color={colors.textMuted} />
              <Text style={styles.resetButtonText}>Reset portfolio</Text>
            </Pressable>
          </>
        )}

        {tab === 'portfolio' && (
          <>
            {equityHistoryRef.current.length >= 2 && (
              <View style={styles.chartCard}>
                <Text style={styles.chartCardTitle}>Live portfolio value</Text>
                <View style={styles.detailChartWrap}>
                  <PriceChart
                    data={equityHistoryRef.current}
                    width={264}
                    height={90}
                    color={totalPnl >= 0 ? colors.success : colors.danger}
                    baseline={STARTING_CASH}
                    gradientId="portfolio-equity"
                  />
                </View>
              </View>
            )}

            {holdings.length === 0 ? (
              <View style={styles.emptyState}>
                <Ionicons name="pie-chart-outline" size={32} color={colors.textLight} />
                <Text style={styles.emptyTitle}>No open positions</Text>
                <Text style={styles.emptySubtitle}>Buy something from the Market tab to see it here.</Text>
              </View>
            ) : (
              holdings.map((h) => {
                const cur = prices[h.symbol] ?? h.avgPrice;
                const pnl = (cur - h.avgPrice) * h.qty;
                const hasRules = h.stopLoss != null || h.target != null || h.trailingPercent != null;
                return (
                  <View key={h.symbol} style={styles.holdingCard}>
                    <View style={styles.holdingTopRow}>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.holdingSymbol}>{h.symbol}</Text>
                        <Text style={styles.holdingMeta}>
                          {h.qty} qty · avg {formatRupees(h.avgPrice)} · now {formatRupees(cur)}
                        </Text>
                      </View>
                      <Text style={[styles.holdingPnl, pnl >= 0 ? styles.pnlPositive : styles.pnlNegative]}>
                        {pnl >= 0 ? '+' : ''}
                        {formatRupees(pnl)}
                      </Text>
                    </View>

                    {hasRules && (
                      <View style={styles.rulesRow}>
                        {h.stopLoss != null && (
                          <View style={[styles.ruleTag, { backgroundColor: colors.dangerBg }]}>
                            <Text style={[styles.ruleTagText, { color: colors.danger }]}>SL {formatRupees(h.stopLoss)}</Text>
                          </View>
                        )}
                        {h.target != null && (
                          <View style={[styles.ruleTag, { backgroundColor: colors.successBg }]}>
                            <Text style={[styles.ruleTagText, { color: colors.success }]}>Target {formatRupees(h.target)}</Text>
                          </View>
                        )}
                        {h.trailingPercent != null && (
                          <View style={[styles.ruleTag, { backgroundColor: colors.goldBg }]}>
                            <Text style={[styles.ruleTagText, { color: colors.gold }]}>Trailing {h.trailingPercent}%</Text>
                          </View>
                        )}
                      </View>
                    )}

                    <Pressable style={styles.closeButton} onPress={() => closePosition(h.symbol)}>
                      <Text style={styles.closeButtonText}>Close position</Text>
                    </Pressable>
                  </View>
                );
              })
            )}
          </>
        )}

        {tab === 'orders' && (
          <>
            {orders.length === 0 ? (
              <View style={styles.emptyState}>
                <Ionicons name="receipt-outline" size={32} color={colors.textLight} />
                <Text style={styles.emptyTitle}>No orders yet</Text>
                <Text style={styles.emptySubtitle}>Your buy & sell history — manual and auto-triggered — shows up here.</Text>
              </View>
            ) : (
              orders.map((o) => (
                <View key={o.id} style={styles.orderCard}>
                  <View
                    style={[
                      styles.orderSideBadge,
                      { backgroundColor: o.side === 'BUY' ? colors.successBg : colors.dangerBg },
                    ]}
                  >
                    <Text style={[styles.orderSideText, { color: o.side === 'BUY' ? colors.success : colors.danger }]}>
                      {o.side}
                    </Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.orderSymbol}>{o.symbol}</Text>
                    <Text style={styles.orderMeta}>
                      {o.qty} qty @ {formatRupees(o.price)}
                    </Text>
                  </View>
                  <View style={{ alignItems: 'flex-end' }}>
                    <Text style={[styles.orderReason, { color: reasonColor[o.reason] }]}>{o.reason}</Text>
                    <Text style={styles.orderTime}>
                      {new Date(o.timestamp).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                    </Text>
                  </View>
                </View>
              ))
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const makeStyles = (colors: ThemeColors) => StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  header: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
  },
  headerTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  backButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderRadius: radius.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
  },
  liveDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#5CF08A' },
  liveBadgeText: { fontFamily: fonts.bold, fontSize: 10, color: '#fff', letterSpacing: 0.5 },
  headerLabel: { fontFamily: fonts.regular, fontSize: 12.5, color: 'rgba(255,255,255,0.75)' },
  headerValue: { fontFamily: fonts.displayBold, fontSize: 28, color: '#fff', marginTop: 2 },
  headerStatsRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: spacing.sm },
  headerPnl: { fontFamily: fonts.semiBold, fontSize: 12.5 },
  headerCash: { fontFamily: fonts.regular, fontSize: 12.5, color: 'rgba(255,255,255,0.8)' },
  pnlPositive: { color: colors.success },
  pnlNegative: { color: colors.danger },
  tabRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.primary,
  },
  tabChip: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: radius.pill,
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  tabChipActive: { backgroundColor: '#fff' },
  tabChipText: { fontFamily: fonts.semiBold, fontSize: 12.5, color: 'rgba(255,255,255,0.85)' },
  tabChipTextActive: { color: colors.primary },
  demoBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.primaryLight,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  demoBannerText: { flex: 1, fontFamily: fonts.regular, fontSize: 12, color: colors.primary, lineHeight: 17 },
  instrumentCard: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    marginBottom: spacing.sm,
    overflow: 'hidden',
  },
  instrumentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    gap: spacing.sm,
  },
  instrumentSymbol: { fontFamily: fonts.semiBold, fontSize: 14, color: colors.text },
  instrumentName: { fontFamily: fonts.regular, fontSize: 11.5, color: colors.textMuted, marginTop: 2 },
  priceBlock: { alignItems: 'flex-end' },
  instrumentPrice: { fontFamily: fonts.bold, fontSize: 14.5, color: colors.text },
  instrumentChange: { fontFamily: fonts.semiBold, fontSize: 11, marginTop: 1 },
  tradePanel: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    padding: spacing.md,
    backgroundColor: colors.surface,
  },
  detailChartWrap: { alignItems: 'center' },
  fullChartLink: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    marginTop: spacing.xs,
  },
  fullChartLinkText: { fontFamily: fonts.semiBold, fontSize: 11.5, color: colors.primary },
  qtyRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: spacing.sm },
  qtyLabel: { fontFamily: fonts.medium, fontSize: 13, color: colors.text },
  stepper: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  stepperBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepperValue: { fontFamily: fonts.semiBold, fontSize: 14, color: colors.text, minWidth: 20, textAlign: 'center' },
  estCost: { fontFamily: fonts.regular, fontSize: 12, color: colors.textMuted, marginTop: spacing.sm },
  advancedBox: {
    marginTop: spacing.md,
    backgroundColor: colors.background,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
  },
  advancedTitle: {
    fontFamily: fonts.semiBold,
    fontSize: 11,
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: spacing.sm,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.xs,
  },
  switchLabel: { fontFamily: fonts.medium, fontSize: 13, color: colors.text },
  switchInput: {
    fontFamily: fonts.regular,
    fontSize: 13,
    color: colors.text,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
    marginTop: 4,
    maxWidth: 140,
  },
  trailingInputRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs, maxWidth: 140 },
  trailingPctSign: { fontFamily: fonts.semiBold, fontSize: 13, color: colors.textMuted },
  tradeButtonsRow: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.md },
  tradeButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 11,
    borderRadius: radius.md,
  },
  buyButton: { backgroundColor: colors.success },
  sellButton: { backgroundColor: colors.danger },
  tradeButtonDisabled: { backgroundColor: colors.border },
  tradeButtonText: { fontFamily: fonts.semiBold, fontSize: 13.5, color: '#fff' },
  tradeButtonTextDisabled: { color: colors.textLight },
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    marginTop: spacing.lg,
    marginBottom: spacing.xl,
  },
  resetButtonText: { fontFamily: fonts.medium, fontSize: 12.5, color: colors.textMuted },
  chartCard: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  chartCardTitle: { fontFamily: fonts.semiBold, fontSize: 12, color: colors.textMuted, marginBottom: spacing.sm },
  emptyState: { alignItems: 'center', paddingVertical: spacing.xxl, gap: spacing.sm },
  emptyTitle: { fontFamily: fonts.semiBold, fontSize: 15, color: colors.text },
  emptySubtitle: {
    fontFamily: fonts.regular,
    fontSize: 12.5,
    color: colors.textMuted,
    textAlign: 'center',
    paddingHorizontal: spacing.xl,
  },
  holdingCard: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  holdingTopRow: { flexDirection: 'row', alignItems: 'center' },
  holdingSymbol: { fontFamily: fonts.semiBold, fontSize: 14, color: colors.text },
  holdingMeta: { fontFamily: fonts.regular, fontSize: 11.5, color: colors.textMuted, marginTop: 2 },
  holdingPnl: { fontFamily: fonts.bold, fontSize: 13.5 },
  rulesRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: spacing.sm },
  ruleTag: { paddingHorizontal: spacing.sm, paddingVertical: 3, borderRadius: radius.sm },
  ruleTagText: { fontFamily: fonts.semiBold, fontSize: 10.5 },
  closeButton: {
    alignSelf: 'flex-start',
    marginTop: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
  },
  closeButtonText: { fontFamily: fonts.semiBold, fontSize: 12, color: colors.textMuted },
  orderCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  orderSideBadge: { paddingHorizontal: spacing.sm, paddingVertical: 4, borderRadius: radius.sm },
  orderSideText: { fontFamily: fonts.bold, fontSize: 11 },
  orderSymbol: { fontFamily: fonts.semiBold, fontSize: 13.5, color: colors.text },
  orderMeta: { fontFamily: fonts.regular, fontSize: 11.5, color: colors.textMuted, marginTop: 2 },
  orderReason: { fontFamily: fonts.semiBold, fontSize: 11 },
  orderTime: { fontFamily: fonts.regular, fontSize: 10.5, color: colors.textLight, marginTop: 2 },
});
