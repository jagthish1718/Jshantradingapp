import { useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView, SafeAreaView, Alert, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColors } from '../context/ThemeContext';
import type { ThemeColors } from '../theme/colors';
import { spacing, radius, fonts } from '../theme/spacing';
import { STORAGE_KEYS } from '../utils/storage';
import { INSTRUMENTS } from '../data/instruments';
import { ensureStarted, subscribe, getPrice, optionPremium, optionSymbol, STARTING_CASH, FRACTIONAL_VOL_PER_MINUTE } from '../data/marketSim';
import type { SimState } from '../types/trading';
import CandlestickChart, { Candle } from '../components/CandlestickChart';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { HomeStackParamList } from '../navigation/types';

type Timeframe = '1' | '2' | '3' | '5' | '10' | '15' | '20' | '25' | '30' | 'D' | 'W' | 'M';

// Real candle-interval picker: minutes for the intraday buckets, then
// Day/Week/Month. `count` is how many bars are visible at once (a fixed
// "recent session" length for the minute intervals, then a sensible
// look-back for the higher ones). `minutes` drives synthetic volatility —
// a candle spanning more time should swing more (see MINUTE_VOL below).
const TIMEFRAMES: { key: Timeframe; label: string; minutes: number; count: number }[] = [
  { key: '1', label: '1m', minutes: 1, count: 60 },
  { key: '2', label: '2m', minutes: 2, count: 60 },
  { key: '3', label: '3m', minutes: 3, count: 60 },
  { key: '5', label: '5m', minutes: 5, count: 60 },
  { key: '10', label: '10m', minutes: 10, count: 60 },
  { key: '15', label: '15m', minutes: 15, count: 60 },
  { key: '20', label: '20m', minutes: 20, count: 60 },
  { key: '25', label: '25m', minutes: 25, count: 60 },
  { key: '30', label: '30m', minutes: 30, count: 60 },
  { key: 'D', label: 'Day', minutes: 1440, count: 30 },
  { key: 'W', label: 'Week', minutes: 1440 * 7, count: 26 },
  { key: 'M', label: 'Month', minutes: 1440 * 30, count: 24 },
];

// Every other interval's per-candle volatility scales off the shared
// 1-minute figure by sqrt(minutes) (volatility grows with the square root
// of elapsed time). Built from marketSim's own live-tick pace, not a
// separate hand-tuned number, so a chart's synthetic older candles never
// look wilder (or calmer) than the real, live-ticking candle next to them.
function volForMinutes(minutes: number): number {
  return FRACTIONAL_VOL_PER_MINUTE * Math.sqrt(minutes);
}

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');
// Full-bleed-feeling chart: fill almost the whole screen width, and take a
// large enough slice of screen height to actually look like a real trading
// app's chart rather than a small preview.
const CHART_WIDTH = SCREEN_W - spacing.md * 2 - spacing.xs * 2 - 2;
const CHART_HEIGHT = Math.round(Math.max(300, Math.min(440, SCREEN_H * 0.42)));

// Anchored so the series always ends exactly at `anchorPrice` — keeps the
// static candle shape consistent with the live price line drawn on top of
// it (see CandlestickChart's `livePrice` prop).
function genCandles(anchorPrice: number, count: number, volPct: number): Candle[] {
  const base = anchorPrice;
  const raw: Candle[] = [];
  let price = base * (0.94 + Math.random() * 0.06);
  for (let i = 0; i < count; i++) {
    const o = price;
    const change = (Math.random() - 0.47) * base * volPct;
    const c = Math.max(base * 0.5, o + change);
    const wick = base * volPct * 0.7;
    const h = Math.max(o, c) + Math.random() * wick;
    const l = Math.max(base * 0.4, Math.min(o, c) - Math.random() * wick);
    const v = Math.round(40000 + Math.random() * 160000);
    raw.push({ o, h, l, c, v });
    price = c;
  }
  const drift = anchorPrice - raw[raw.length - 1].c;
  return raw.map((d) => ({
    o: Math.round((d.o + drift) * 100) / 100,
    h: Math.round((d.h + drift) * 100) / 100,
    l: Math.round((d.l + drift) * 100) / 100,
    c: Math.round((d.c + drift) * 100) / 100,
    v: d.v,
  }));
}

function formatRupees(n: number) {
  return `₹${n.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`;
}

type Props = NativeStackScreenProps<HomeStackParamList, 'ChartView'>;

export default function ChartViewScreen({ navigation, route }: Props) {
  const colors = useThemeColors();
  const styles = makeStyles(colors);
  const { symbol, option } = route.params;
  const instrument = INSTRUMENTS.find((i) => i.symbol === symbol) ?? INSTRUMENTS[0];
  const [timeframe, setTimeframe] = useState<Timeframe>('15');
  const [trading, setTrading] = useState(false);

  // The underlying's own live-updating candle series — the single source
  // of truth for every price shown on this screen. The old design
  // generated the whole series once and froze it at mount, so the live
  // price line drifted further from the last candle the longer the screen
  // stayed open (exactly the "candle on one side, price line on the other"
  // mismatch). Now the right-most candle is a real, currently-forming bar
  // that keeps extending its H/L/C to the live tick, and only rolls over
  // into a new candle once a full interval (per the selected timeframe)
  // has actually elapsed — so the candle, the live price line, the price
  // badge and the volume bar underneath it always agree.
  const tf = TIMEFRAMES.find((t) => t.key === timeframe)!;
  const [underlyingCandles, setUnderlyingCandles] = useState<Candle[]>(() =>
    genCandles(getPrice(instrument.symbol) || instrument.base, tf.count, volForMinutes(tf.minutes))
  );
  const rolloverAtRef = useRef<number>(Date.now());

  // Re-seed the whole series when the interval changes (a 1m chart and a
  // Month chart aren't the same data at a different zoom — they're
  // different bars), and start the day/week ticker fresh.
  useEffect(() => {
    ensureStarted();
    const seedTf = TIMEFRAMES.find((t) => t.key === timeframe)!;
    setUnderlyingCandles(genCandles(getPrice(instrument.symbol) || instrument.base, seedTf.count, volForMinutes(seedTf.minutes)));
    rolloverAtRef.current = Date.now();
  }, [timeframe, instrument.symbol]);

  // Every market tick: extend the currently-forming candle to the new
  // price, or roll into a fresh one once its interval has elapsed.
  useEffect(() => {
    const unsub = subscribe(() => {
      const price = getPrice(instrument.symbol);
      const liveTf = TIMEFRAMES.find((t) => t.key === timeframe)!;
      const intervalMs = liveTf.minutes * 60 * 1000;
      setUnderlyingCandles((prev) => {
        if (prev.length === 0) return prev;
        const last = prev[prev.length - 1];
        const now = Date.now();
        if (now - rolloverAtRef.current >= intervalMs) {
          rolloverAtRef.current = now;
          const fresh: Candle = { o: price, h: price, l: price, c: price, v: Math.round(40000 + Math.random() * 160000) };
          const kept = prev.length >= liveTf.count ? prev.slice(prev.length - liveTf.count + 1) : prev;
          return [...kept, fresh];
        }
        const updated: Candle = {
          ...last,
          c: price,
          h: Math.max(last.h, price),
          l: Math.min(last.l, price),
          v: (last.v ?? 0) + Math.round(500 + Math.random() * 2000),
        };
        return [...prev.slice(0, -1), updated];
      });
    });
    return unsub;
  }, [timeframe, instrument.symbol]);

  const underlyingSpot = getPrice(instrument.symbol);
  // For an option strike, the "live price" is its premium — recomputed
  // fresh off the underlying's spot on every tick, so it moves in real
  // time just like the plain-instrument chart does.
  const livePrice = option ? optionPremium(underlyingSpot, option.strike, option.optType === 'CE') : underlyingSpot;

  const displaySymbol = option
    ? optionSymbol({ underlying: instrument.symbol, strike: option.strike, type: option.optType, expiry: option.expiry, lotSize: option.lotSize })
    : instrument.symbol;
  const displayName = option ? `${instrument.name} · Expiry ${option.expiry}` : instrument.name;

  const candles = useMemo(() => {
    if (!option) return underlyingCandles;

    // Run every underlying O/H/L/C through the exact same optionPremium()
    // formula the rest of the app prices this option with — not a separate
    // random walk. This is what makes the option's chart mathematically
    // consistent with its LTP, delta and moneyness: a deep ITM strike
    // tracks the underlying almost 1:1, a far OTM strike barely moves, and
    // Calls/Puts move opposite directions off the same underlying candle —
    // all for free, because it's the same pricing function everywhere.
    const isCall = option.optType === 'CE';
    return underlyingCandles.map((d) => {
      const oPrem = optionPremium(d.o, option.strike, isCall);
      const cPrem = optionPremium(d.c, option.strike, isCall);
      const hPrem = optionPremium(d.h, option.strike, isCall);
      const lPrem = optionPremium(d.l, option.strike, isCall);
      // optionPremium isn't monotonic in the same direction for CE vs PE
      // (a Put's premium falls as spot rises), so derive the wick's
      // high/low from all four priced corners rather than assuming order.
      const vals = [oPrem, cPrem, hPrem, lPrem];
      return { o: oPrem, h: Math.max(...vals), l: Math.min(...vals), c: cPrem, v: d.v };
    });
  }, [underlyingCandles, option?.strike, option?.optType]);

  const first = candles[0];
  const changePct = ((livePrice - first.o) / first.o) * 100;
  const trendColor = changePct >= 0 ? colors.success : colors.danger;

  const periodHigh = Math.max(...candles.map((c) => c.h), livePrice);
  const periodLow = Math.min(...candles.map((c) => c.l), livePrice);

  // One-click 1-qty market order, straight off the chart — same pattern
  // Kite's own BUY/SELL price buttons use. Reads/writes AsyncStorage
  // directly so it works no matter which tab of Paper Trading you came
  // from; that screen re-syncs on focus, so it'll show up there too.
  // Only used for plain instruments — an option strike routes to the full
  // Order screen instead (see handleTrade), since writes/margin need that.
  const quickTrade = async (side: 'BUY' | 'SELL') => {
    setTrading(true);
    const price = getPrice(instrument.symbol);
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEYS.paperTrading);
      const sim: SimState = raw
        ? { cash: STARTING_CASH, holdings: [], orders: [], ...JSON.parse(raw) }
        : { cash: STARTING_CASH, holdings: [], orders: [] };
      if (!Array.isArray(sim.holdings)) sim.holdings = [];
      if (!Array.isArray(sim.orders)) sim.orders = [];

      if (side === 'BUY') {
        if (price > sim.cash) {
          Alert.alert('Not enough cash', `You need ${formatRupees(price)} but only have ${formatRupees(sim.cash)} available.`);
          return;
        }
        const existing = sim.holdings.find((h) => h.symbol === instrument.symbol);
        if (existing) {
          const newQty = existing.qty + 1;
          existing.avgPrice = (existing.avgPrice * existing.qty + price) / newQty;
          existing.qty = newQty;
        } else {
          sim.holdings.push({
            symbol: instrument.symbol,
            qty: 1,
            avgPrice: price,
            stopLoss: null,
            target: null,
            trailingPercent: null,
            trailingHigh: null,
          });
        }
        sim.cash -= price;
      } else {
        const existing = sim.holdings.find((h) => h.symbol === instrument.symbol && h.qty > 0);
        if (!existing) {
          Alert.alert('No position', `You don't hold any ${instrument.symbol} to sell yet.`);
          return;
        }
        existing.qty -= 1;
        sim.cash += price;
        if (existing.qty <= 0) sim.holdings = sim.holdings.filter((h) => h.symbol !== instrument.symbol);
      }

      sim.orders.unshift({
        id: `${Date.now()}-chart-${side.toLowerCase()}`,
        symbol: instrument.symbol,
        side,
        qty: 1,
        price,
        reason: 'Manual',
        timestamp: new Date().toISOString(),
      });

      await AsyncStorage.setItem(STORAGE_KEYS.paperTrading, JSON.stringify(sim));
      Alert.alert(side === 'BUY' ? 'Bought' : 'Sold', `1 qty of ${instrument.symbol} @ ${formatRupees(price)}`);
    } catch {
      Alert.alert('Something went wrong', 'Could not place this order — please try again.');
    } finally {
      setTrading(false);
    }
  };

  const handleTrade = (side: 'BUY' | 'SELL') => {
    if (option) {
      // Options carry lot sizes, margin blocking and write economics that
      // the full Order screen already handles correctly — route there
      // instead of re-implementing that logic here.
      navigation.navigate('OptionOrder', {
        underlying: instrument.symbol,
        strike: option.strike,
        optType: option.optType,
        expiry: option.expiry,
        lotSize: option.lotSize,
        side,
      });
    } else {
      quickTrade(side);
    }
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
        <View style={styles.headerTopRow}>
          <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={18} color="#fff" />
          </Pressable>
          <View style={{ flex: 1, marginLeft: spacing.sm }}>
            <Text style={styles.headerSymbol}>{displaySymbol}</Text>
            <Text style={styles.headerName}>{displayName}</Text>
          </View>
        </View>
        <View style={styles.priceRow}>
          <Text style={styles.headerPrice}>{formatRupees(livePrice)}</Text>
          <Text style={[styles.headerChange, { color: '#fff', backgroundColor: trendColor }]}>
            {changePct >= 0 ? '+' : ''}
            {changePct.toFixed(2)}%
          </Text>
        </View>
      </View>

      <View style={styles.tfRow}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tfRowContent}>
          {TIMEFRAMES.map((t) => (
            <Pressable
              key={t.key}
              style={[styles.tfChip, timeframe === t.key && styles.tfChipActive]}
              onPress={() => setTimeframe(t.key)}
            >
              <Text style={[styles.tfChipText, timeframe === t.key && styles.tfChipTextActive]} numberOfLines={1}>
                {t.label}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.md, paddingTop: spacing.md, paddingBottom: spacing.xl }}>
        <View style={styles.chartCard}>
          <CandlestickChart data={candles} width={CHART_WIDTH} height={CHART_HEIGHT} livePrice={livePrice} showVolume />
        </View>

        <View style={styles.quickTradeRow}>
          <Pressable style={[styles.quickTradeButton, styles.buyButton]} disabled={trading} onPress={() => handleTrade('BUY')}>
            <Text style={styles.quickTradePrice}>{formatRupees(livePrice)}</Text>
            <Text style={styles.quickTradeLabel}>BUY</Text>
          </Pressable>
          <Text style={styles.quickTradeHint}>{option ? `Lot ${option.lotSize}` : '1 qty'}</Text>
          <Pressable style={[styles.quickTradeButton, styles.sellButton]} disabled={trading} onPress={() => handleTrade('SELL')}>
            <Text style={styles.quickTradePrice}>{formatRupees(livePrice)}</Text>
            <Text style={styles.quickTradeLabel}>SELL</Text>
          </Pressable>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statCell}>
            <Text style={styles.statLabel}>Open</Text>
            <Text style={styles.statValue}>{formatRupees(first.o)}</Text>
          </View>
          <View style={styles.statCell}>
            <Text style={styles.statLabel}>High</Text>
            <Text style={[styles.statValue, { color: colors.success }]}>{formatRupees(periodHigh)}</Text>
          </View>
          <View style={styles.statCell}>
            <Text style={styles.statLabel}>Low</Text>
            <Text style={[styles.statValue, { color: colors.danger }]}>{formatRupees(periodLow)}</Text>
          </View>
          <View style={styles.statCell}>
            <Text style={styles.statLabel}>LTP</Text>
            <Text style={styles.statValue}>{formatRupees(livePrice)}</Text>
          </View>
        </View>

        <View style={styles.demoBanner}>
          <Ionicons name="information-circle-outline" size={16} color={colors.primary} />
          <Text style={styles.demoBannerText}>
            {option
              ? `Tracking the ${option.optType === 'CE' ? 'Call' : 'Put'} premium for ${instrument.symbol} ${option.strike}, live off the underlying's spot. The right-most candle updates with every tick; older candles are simulated for practice.`
              : 'Drag on the chart for a crosshair readout. The right-most candle updates live with the price feed, so it always matches the dashed line and badge. Older candles are simulated for practice.'}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const makeStyles = (colors: ThemeColors) => StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  header: { backgroundColor: colors.primary, paddingHorizontal: spacing.lg, paddingTop: spacing.lg, paddingBottom: spacing.md },
  headerTopRow: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.md },
  backButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerSymbol: { fontFamily: fonts.bold, fontSize: 17, color: '#fff' },
  headerName: { fontFamily: fonts.regular, fontSize: 11.5, color: 'rgba(255,255,255,0.75)', marginTop: 1 },
  priceRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  headerPrice: { fontFamily: fonts.displayBold, fontSize: 24, color: '#fff' },
  headerChange: {
    fontFamily: fonts.semiBold,
    fontSize: 12,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: radius.sm,
    overflow: 'hidden',
  },
  quickTradeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  quickTradeButton: { flex: 1, alignItems: 'center', borderRadius: radius.md, paddingVertical: 9 },
  buyButton: { backgroundColor: colors.primary },
  sellButton: { backgroundColor: colors.danger },
  quickTradePrice: { fontFamily: fonts.bold, fontSize: 14, color: '#fff' },
  quickTradeLabel: { fontFamily: fonts.semiBold, fontSize: 10.5, color: 'rgba(255,255,255,0.85)', marginTop: 1, letterSpacing: 0.5 },
  quickTradeHint: { fontFamily: fonts.regular, fontSize: 10.5, color: colors.textLight },
  tfRow: {
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingVertical: spacing.md,
  },
  tfRowContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
  },
  tfChip: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 40,
    minHeight: 34,
    paddingVertical: 9,
    paddingHorizontal: spacing.sm + 2,
    borderRadius: radius.pill,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tfChipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  // Full-contrast text even when unselected — these are tappable interval
  // buttons, not passive labels, so they need to stay legible at a glance.
  tfChipText: { fontFamily: fonts.bold, fontSize: 13.5, color: colors.text },
  tfChipTextActive: { color: '#fff' },
  chartCard: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.xs,
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  statsRow: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    paddingVertical: spacing.md,
    marginBottom: spacing.lg,
  },
  statCell: { flex: 1, alignItems: 'center' },
  statLabel: { fontFamily: fonts.regular, fontSize: 10.5, color: colors.textMuted, marginBottom: 3 },
  statValue: { fontFamily: fonts.semiBold, fontSize: 13, color: colors.text },
  demoBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.primaryLight,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.xl,
  },
  demoBannerText: { flex: 1, fontFamily: fonts.regular, fontSize: 12, color: colors.primary, lineHeight: 17 },
});
