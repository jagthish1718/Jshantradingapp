import { useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView, SafeAreaView, Alert, Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColors } from '../context/ThemeContext';
import type { ThemeColors } from '../theme/colors';
import { spacing, radius, fonts } from '../theme/spacing';
import { STORAGE_KEYS } from '../utils/storage';
import { INSTRUMENTS } from '../data/instruments';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { HomeStackParamList } from '../navigation/types';

const OPTIONABLE = INSTRUMENTS.filter((i) => i.hasOptions);
const STARTING_CASH = 100000;
const TICK_MS = 3000;

type StrikeRow = {
  strike: number;
  isAtm: boolean;
  ceLtp: number;
  ceOi: string;
  ceChange: number;
  peLtp: number;
  peOi: string;
  peChange: number;
};

function nextExpiries(count = 3): string[] {
  const out: string[] = [];
  const d = new Date();
  while (d.getDay() !== 4) d.setDate(d.getDate() + 1); // next Thursday — NSE's usual weekly expiry
  for (let i = 0; i < count; i++) {
    out.push(d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }));
    d.setDate(d.getDate() + 7);
  }
  return out;
}

function optionPremium(spot: number, strike: number, isCall: boolean): number {
  const intrinsic = isCall ? Math.max(0, spot - strike) : Math.max(0, strike - spot);
  const distance = Math.abs(spot - strike);
  const timeValue = Math.max(1.5, spot * 0.018 * Math.exp(-distance / (spot * 0.045)));
  return Math.round((intrinsic + timeValue) * 100) / 100;
}

function formatOi(n: number): string {
  if (n >= 100000) return `${(n / 100000).toFixed(1)}L`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return String(Math.round(n));
}

function formatRupees(n: number) {
  return `₹${n.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`;
}

type Props = NativeStackScreenProps<HomeStackParamList, 'OptionsChain'>;

export default function OptionsChainScreen({ navigation }: Props) {
  const colors = useThemeColors();
  const styles = makeStyles(colors);
  const [underlyingSymbol, setUnderlyingSymbol] = useState(OPTIONABLE[0].symbol);
  const underlying = OPTIONABLE.find((i) => i.symbol === underlyingSymbol)!;
  const expiries = useMemo(() => nextExpiries(3), []);
  const [expiry, setExpiry] = useState(expiries[0]);

  const spotRef = useRef(underlying.base);
  const [, bump] = useState(0);
  const liveDot = useRef(new Animated.Value(0.3)).current;

  const [selected, setSelected] = useState<{ strike: number; side: 'CE' | 'PE' } | null>(null);
  const [lots, setLots] = useState(1);

  useEffect(() => {
    spotRef.current = underlying.base;
  }, [underlyingSymbol]);

  // Live spot drift — every strike's premium is derived from this, so the
  // whole chain moves together the way a real one does.
  useEffect(() => {
    const id = setInterval(() => {
      const base = underlying.base;
      const drift = (Math.random() - 0.5) * base * 0.0025;
      spotRef.current = Math.max(base * 0.85, Math.min(base * 1.15, spotRef.current + drift));
      bump((n) => n + 1);
    }, TICK_MS);
    return () => clearInterval(id);
  }, [underlyingSymbol]);

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

  const spot = spotRef.current;
  const step = underlying.optionStep ?? 50;
  const atm = Math.round(spot / step) * step;

  const strikes: StrikeRow[] = useMemo(() => {
    const rows: StrikeRow[] = [];
    for (let i = -6; i <= 6; i++) {
      const strike = atm + i * step;
      rows.push({
        strike,
        isAtm: strike === atm,
        ceLtp: optionPremium(spot, strike, true),
        ceOi: formatOi(2000 + Math.random() * 60000 * (1 / (1 + Math.abs(i) * 0.3))),
        ceChange: (Math.random() - 0.5) * 18,
        peLtp: optionPremium(spot, strike, false),
        peOi: formatOi(2000 + Math.random() * 60000 * (1 / (1 + Math.abs(i) * 0.3))),
        peChange: (Math.random() - 0.5) * 18,
      });
    }
    return rows;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [atm, step, Math.round(spot)]);

  const lotSize = underlying.lotSize ?? 50;

  const buyOption = async () => {
    if (!selected) return;
    const row = strikes.find((r) => r.strike === selected.strike);
    if (!row) return;
    const ltp = selected.side === 'CE' ? row.ceLtp : row.peLtp;
    const cost = ltp * lotSize * lots;

    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEYS.paperTrading);
      const sim = raw ? JSON.parse(raw) : { cash: STARTING_CASH, holdings: [], orders: [] };
      const cash = typeof sim.cash === 'number' ? sim.cash : STARTING_CASH;
      if (cost > cash) {
        Alert.alert('Not enough cash', `You need ${formatRupees(cost)} but only have ${formatRupees(cash)} in your Paper Trading account.`);
        return;
      }
      const optionSymbol = `${underlying.symbol} ${row.strike} ${selected.side} ${expiry}`;
      const holdings = Array.isArray(sim.holdings) ? sim.holdings : [];
      const existing = holdings.find((h: any) => h.symbol === optionSymbol);
      const qty = lotSize * lots;
      if (existing) {
        const newQty = existing.qty + qty;
        existing.avgPrice = (existing.avgPrice * existing.qty + cost) / newQty;
        existing.qty = newQty;
      } else {
        holdings.push({ symbol: optionSymbol, qty, avgPrice: ltp, stopLoss: null, target: null, trailingPercent: null, trailingHigh: null });
      }
      const orders = Array.isArray(sim.orders) ? sim.orders : [];
      orders.unshift({
        id: `${Date.now()}-opt-buy`,
        symbol: optionSymbol,
        side: 'BUY',
        qty,
        price: ltp,
        reason: 'Manual',
        timestamp: new Date().toISOString(),
      });
      const next = { cash: cash - cost, holdings, orders };
      await AsyncStorage.setItem(STORAGE_KEYS.paperTrading, JSON.stringify(next));
      Alert.alert('Order placed', `Bought ${qty} qty of ${optionSymbol} @ ${formatRupees(ltp)}. Check Paper Trading → Portfolio.`);
      setSelected(null);
      setLots(1);
    } catch {
      Alert.alert('Something went wrong', 'Could not place this order — please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
        <View style={styles.headerTopRow}>
          <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={18} color="#fff" />
          </Pressable>
          <Text style={styles.headerTitle}>Options Chain</Text>
          <View style={styles.liveBadge}>
            <Animated.View style={[styles.liveDot, { opacity: liveDot }]} />
            <Text style={styles.liveBadgeText}>LIVE</Text>
          </View>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.underlyingRow}>
          {OPTIONABLE.map((i) => (
            <Pressable
              key={i.symbol}
              style={[styles.underlyingChip, underlyingSymbol === i.symbol && styles.underlyingChipActive]}
              onPress={() => {
                setUnderlyingSymbol(i.symbol);
                setSelected(null);
              }}
            >
              <Text style={[styles.underlyingChipText, underlyingSymbol === i.symbol && styles.underlyingChipTextActive]}>
                {i.symbol}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        <View style={styles.spotRow}>
          <Text style={styles.spotLabel}>Spot</Text>
          <Text style={styles.spotValue}>{formatRupees(spot)}</Text>
        </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.expiryRow}>
        {expiries.map((e) => (
          <Pressable key={e} style={[styles.expiryChip, expiry === e && styles.expiryChipActive]} onPress={() => setExpiry(e)}>
            <Text style={[styles.expiryChipText, expiry === e && styles.expiryChipTextActive]}>{e}</Text>
          </Pressable>
        ))}
      </ScrollView>

      <View style={styles.tableHeader}>
        <Text style={[styles.tableHeaderText, { flex: 1.2, textAlign: 'left' }]}>OI</Text>
        <Text style={[styles.tableHeaderText, { flex: 1 }]}>CALLS</Text>
        <Text style={[styles.tableHeaderText, { flex: 0.9 }]}>STRIKE</Text>
        <Text style={[styles.tableHeaderText, { flex: 1 }]}>PUTS</Text>
        <Text style={[styles.tableHeaderText, { flex: 1.2, textAlign: 'right' }]}>OI</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: spacing.xl }}>
        {strikes.map((row) => {
          const ceSelected = selected?.strike === row.strike && selected.side === 'CE';
          const peSelected = selected?.strike === row.strike && selected.side === 'PE';
          return (
            <View key={row.strike}>
              <View style={[styles.row, row.isAtm && styles.rowAtm]}>
                <Text style={[styles.oiText, { flex: 1.2, textAlign: 'left' }]}>{row.ceOi}</Text>
                <Pressable style={{ flex: 1 }} onPress={() => setSelected(ceSelected ? null : { strike: row.strike, side: 'CE' })}>
                  <Text style={[styles.ltpText, ceSelected && styles.ltpTextSelected]}>{row.ceLtp.toFixed(1)}</Text>
                  <Text style={[styles.chngText, { color: row.ceChange >= 0 ? colors.success : colors.danger }]}>
                    {row.ceChange >= 0 ? '+' : ''}
                    {row.ceChange.toFixed(1)}%
                  </Text>
                </Pressable>
                <Text style={[styles.strikeText, { flex: 0.9 }, row.isAtm && styles.strikeTextAtm]}>{row.strike}</Text>
                <Pressable style={{ flex: 1 }} onPress={() => setSelected(peSelected ? null : { strike: row.strike, side: 'PE' })}>
                  <Text style={[styles.ltpText, peSelected && styles.ltpTextSelected, { textAlign: 'right' }]}>{row.peLtp.toFixed(1)}</Text>
                  <Text style={[styles.chngText, { color: row.peChange >= 0 ? colors.success : colors.danger, textAlign: 'right' }]}>
                    {row.peChange >= 0 ? '+' : ''}
                    {row.peChange.toFixed(1)}%
                  </Text>
                </Pressable>
                <Text style={[styles.oiText, { flex: 1.2, textAlign: 'right' }]}>{row.peOi}</Text>
              </View>

              {(ceSelected || peSelected) && (
                <View style={styles.buyPanel}>
                  <Text style={styles.buyPanelTitle}>
                    {underlying.symbol} {row.strike} {selected!.side} · {expiry}
                  </Text>
                  <Text style={styles.buyPanelPrice}>
                    LTP {formatRupees(ceSelected ? row.ceLtp : row.peLtp)} · Lot size {lotSize}
                  </Text>
                  <View style={styles.qtyRow}>
                    <Text style={styles.qtyLabel}>Lots</Text>
                    <View style={styles.stepper}>
                      <Pressable style={styles.stepperBtn} onPress={() => setLots((q) => Math.max(1, q - 1))}>
                        <Ionicons name="remove" size={16} color={colors.primary} />
                      </Pressable>
                      <Text style={styles.stepperValue}>{lots}</Text>
                      <Pressable style={styles.stepperBtn} onPress={() => setLots((q) => q + 1)}>
                        <Ionicons name="add" size={16} color={colors.primary} />
                      </Pressable>
                    </View>
                  </View>
                  <Text style={styles.estCost}>
                    Est. cost: {formatRupees((ceSelected ? row.ceLtp : row.peLtp) * lotSize * lots)}
                  </Text>
                  <Pressable style={styles.buyButton} onPress={buyOption}>
                    <Text style={styles.buyButtonText}>Buy {selected!.side}</Text>
                  </Pressable>
                </View>
              )}
            </View>
          );
        })}

        <View style={styles.demoBanner}>
          <Ionicons name="information-circle-outline" size={16} color={colors.primary} />
          <Text style={styles.demoBannerText}>
            Simulated premiums & open interest for practice. Bought options are added to your Paper Trading
            portfolio — this demo doesn't auto-expire them.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const makeStyles = (colors: ThemeColors) => StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  header: { backgroundColor: colors.primary, paddingHorizontal: spacing.lg, paddingTop: spacing.lg, paddingBottom: spacing.md },
  headerTopRow: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.md, gap: spacing.sm },
  backButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: { flex: 1, fontFamily: fonts.semiBold, fontSize: 15, color: '#fff' },
  liveBadge: { flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: 'rgba(255,255,255,0.18)', borderRadius: radius.pill, paddingHorizontal: spacing.sm, paddingVertical: 4 },
  liveDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#5CF08A' },
  liveBadgeText: { fontFamily: fonts.bold, fontSize: 10, color: '#fff', letterSpacing: 0.5 },
  underlyingRow: { gap: spacing.sm, paddingBottom: spacing.sm },
  underlyingChip: { paddingHorizontal: spacing.md, paddingVertical: 7, borderRadius: radius.pill, backgroundColor: 'rgba(255,255,255,0.12)' },
  underlyingChipActive: { backgroundColor: '#fff' },
  underlyingChipText: { fontFamily: fonts.semiBold, fontSize: 12.5, color: 'rgba(255,255,255,0.85)' },
  underlyingChipTextActive: { color: colors.primary },
  spotRow: { flexDirection: 'row', alignItems: 'baseline', gap: spacing.sm, marginTop: spacing.xs },
  spotLabel: { fontFamily: fonts.regular, fontSize: 12, color: 'rgba(255,255,255,0.75)' },
  spotValue: { fontFamily: fonts.displayBold, fontSize: 20, color: '#fff' },
  expiryRow: { gap: spacing.sm, paddingHorizontal: spacing.lg, paddingVertical: spacing.sm, backgroundColor: colors.surface },
  expiryChip: { paddingHorizontal: spacing.md, paddingVertical: 6, borderRadius: radius.pill, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.background },
  expiryChipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  expiryChipText: { fontFamily: fonts.semiBold, fontSize: 12, color: colors.textMuted },
  expiryChipTextActive: { color: '#fff' },
  tableHeader: {
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  tableHeaderText: { fontFamily: fonts.semiBold, fontSize: 10, color: colors.textMuted, textAlign: 'center', letterSpacing: 0.4 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  rowAtm: { backgroundColor: colors.primaryLight },
  oiText: { fontFamily: fonts.regular, fontSize: 10.5, color: colors.textMuted },
  ltpText: { fontFamily: fonts.semiBold, fontSize: 12.5, color: colors.text, textAlign: 'left' },
  ltpTextSelected: { color: colors.primary },
  chngText: { fontFamily: fonts.regular, fontSize: 9.5, marginTop: 1 },
  strikeText: { fontFamily: fonts.bold, fontSize: 12.5, color: colors.text, textAlign: 'center' },
  strikeTextAtm: { color: colors.primary },
  buyPanel: {
    backgroundColor: colors.surface,
    marginHorizontal: spacing.md,
    marginBottom: spacing.sm,
    borderRadius: radius.md,
    padding: spacing.md,
  },
  buyPanelTitle: { fontFamily: fonts.semiBold, fontSize: 12.5, color: colors.text },
  buyPanelPrice: { fontFamily: fonts.regular, fontSize: 11.5, color: colors.textMuted, marginTop: 2, marginBottom: spacing.sm },
  qtyRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  qtyLabel: { fontFamily: fonts.medium, fontSize: 13, color: colors.text },
  stepper: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  stepperBtn: { width: 28, height: 28, borderRadius: 14, backgroundColor: colors.primaryLight, alignItems: 'center', justifyContent: 'center' },
  stepperValue: { fontFamily: fonts.semiBold, fontSize: 14, color: colors.text, minWidth: 20, textAlign: 'center' },
  estCost: { fontFamily: fonts.regular, fontSize: 12, color: colors.textMuted, marginTop: spacing.sm },
  buyButton: { backgroundColor: colors.primary, borderRadius: radius.md, alignItems: 'center', paddingVertical: 11, marginTop: spacing.md },
  buyButtonText: { fontFamily: fonts.semiBold, fontSize: 13.5, color: '#fff' },
  demoBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.primaryLight,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginHorizontal: spacing.md,
    marginTop: spacing.sm,
  },
  demoBannerText: { flex: 1, fontFamily: fonts.regular, fontSize: 11.5, color: colors.primary, lineHeight: 16 },
});
