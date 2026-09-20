import { useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView, SafeAreaView, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColors } from '../context/ThemeContext';
import type { ThemeColors } from '../theme/colors';
import { spacing, radius, fonts } from '../theme/spacing';
import { INSTRUMENTS } from '../data/instruments';
import { ensureStarted, subscribe, getPrice, optionPremium, optionGreeks } from '../data/marketSim';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { HomeStackParamList } from '../navigation/types';

const OPTIONABLE = INSTRUMENTS.filter((i) => i.hasOptions);

type StrikeRow = {
  strike: number;
  isAtm: boolean;
  ceLtp: number;
  ceOiRaw: number;
  ceChange: number;
  ceDelta: number;
  ceIv: number;
  peLtp: number;
  peOiRaw: number;
  peChange: number;
  peDelta: number;
  peIv: number;
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

function formatOi(n: number): string {
  if (n >= 100000) return `${(n / 100000).toFixed(1)}L`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return String(Math.round(n));
}

function formatRupees(n: number) {
  return `₹${n.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`;
}

type ChainMode = 'OI' | 'Greeks';

type Props = NativeStackScreenProps<HomeStackParamList, 'OptionsChain'>;

export default function OptionsChainScreen({ navigation }: Props) {
  const colors = useThemeColors();
  const styles = makeStyles(colors);
  const [underlyingSymbol, setUnderlyingSymbol] = useState(OPTIONABLE[0].symbol);
  const underlying = OPTIONABLE.find((i) => i.symbol === underlyingSymbol)!;
  const expiries = useMemo(() => nextExpiries(3), []);
  const [expiry, setExpiry] = useState(expiries[0]);
  const [mode, setMode] = useState<ChainMode>('OI');

  const [, bump] = useState(0);
  const liveDot = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    ensureStarted();
    const unsub = subscribe(() => bump((n) => n + 1));
    return unsub;
  }, []);

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

  const spot = getPrice(underlying.symbol);
  const step = underlying.optionStep ?? 50;
  const atm = Math.round(spot / step) * step;

  const strikes: StrikeRow[] = useMemo(() => {
    const rows: StrikeRow[] = [];
    for (let i = -6; i <= 6; i++) {
      const strike = atm + i * step;
      const ceGreeks = optionGreeks(spot, strike, true);
      const peGreeks = optionGreeks(spot, strike, false);
      rows.push({
        strike,
        isAtm: strike === atm,
        ceLtp: optionPremium(spot, strike, true),
        ceOiRaw: 2000 + Math.random() * 60000 * (1 / (1 + Math.abs(i) * 0.3)),
        ceChange: (Math.random() - 0.5) * 18,
        ceDelta: ceGreeks.delta,
        ceIv: ceGreeks.iv,
        peLtp: optionPremium(spot, strike, false),
        peOiRaw: 2000 + Math.random() * 60000 * (1 / (1 + Math.abs(i) * 0.3)),
        peChange: (Math.random() - 0.5) * 18,
        peDelta: peGreeks.delta,
        peIv: peGreeks.iv,
      });
    }
    return rows;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [atm, step, Math.round(spot)]);

  const lotSize = underlying.lotSize ?? 50;

  // PCR (Put-Call Ratio), Max Pain and ATM IV — the three headline stats a
  // real options chain leads with.
  const { pcr, maxPain, atmIv } = useMemo(() => {
    const totalCeOi = strikes.reduce((s, r) => s + r.ceOiRaw, 0);
    const totalPeOi = strikes.reduce((s, r) => s + r.peOiRaw, 0);
    const pcrVal = totalCeOi > 0 ? totalPeOi / totalCeOi : 0;

    let bestStrike = atm;
    let bestPain = Infinity;
    for (const candidate of strikes) {
      let pain = 0;
      for (const row of strikes) {
        pain += row.ceOiRaw * Math.max(0, candidate.strike - row.strike);
        pain += row.peOiRaw * Math.max(0, row.strike - candidate.strike);
      }
      if (pain < bestPain) {
        bestPain = pain;
        bestStrike = candidate.strike;
      }
    }

    const atmRow = strikes.find((r) => r.isAtm);
    const ivVal = atmRow ? (atmRow.ceIv + atmRow.peIv) / 2 : 0;

    return { pcr: pcrVal, maxPain: bestStrike, atmIv: ivVal };
  }, [strikes, atm]);

  const goToOrder = (strike: number, optType: 'CE' | 'PE', side: 'BUY' | 'SELL') => {
    navigation.navigate('OptionOrder', {
      underlying: underlying.symbol,
      strike,
      optType,
      expiry,
      lotSize,
      side,
    });
  };

  const goToChart = (strike: number, optType: 'CE' | 'PE') => {
    navigation.navigate('ChartView', {
      symbol: underlying.symbol,
      option: { strike, optType, expiry, lotSize },
    });
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
              onPress={() => setUnderlyingSymbol(i.symbol)}
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

      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>PCR</Text>
          <Text style={styles.statValue}>{pcr.toFixed(2)}</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Max Pain</Text>
          <Text style={styles.statValue}>{maxPain}</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>ATM IV</Text>
          <Text style={styles.statValue}>{atmIv.toFixed(1)}%</Text>
        </View>
      </View>

      <View style={styles.subRow}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.expiryRow}>
          {expiries.map((e) => (
            <Pressable key={e} style={[styles.expiryChip, expiry === e && styles.expiryChipActive]} onPress={() => setExpiry(e)}>
              <Text style={[styles.expiryChipText, expiry === e && styles.expiryChipTextActive]}>{e}</Text>
            </Pressable>
          ))}
        </ScrollView>
        <View style={styles.modeToggle}>
          {(['OI', 'Greeks'] as ChainMode[]).map((m) => (
            <Pressable key={m} style={[styles.modeChip, mode === m && styles.modeChipActive]} onPress={() => setMode(m)}>
              <Text style={[styles.modeChipText, mode === m && styles.modeChipTextActive]}>{m}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={styles.tableHeader}>
        <Text style={[styles.tableHeaderText, { flex: 1.3, textAlign: 'left' }]}>{mode === 'OI' ? 'OI' : 'IV / Δ'}</Text>
        <Text style={[styles.tableHeaderText, { flex: 1 }]}>CALLS</Text>
        <Text style={[styles.tableHeaderText, { flex: 0.9 }]}>STRIKE</Text>
        <Text style={[styles.tableHeaderText, { flex: 1 }]}>PUTS</Text>
        <Text style={[styles.tableHeaderText, { flex: 1.3, textAlign: 'right' }]}>{mode === 'OI' ? 'OI' : 'IV / Δ'}</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: spacing.xl }}>
        {strikes.map((row) => (
          <View key={row.strike} style={[styles.row, row.isAtm && styles.rowAtm]}>
            {mode === 'OI' ? (
              <Text style={[styles.oiText, { flex: 1.3, textAlign: 'left' }]}>{formatOi(row.ceOiRaw)}</Text>
            ) : (
              <View style={{ flex: 1.3 }}>
                <Text style={styles.greekText}>IV {row.ceIv.toFixed(1)}</Text>
                <Text style={styles.greekText}>Δ {row.ceDelta.toFixed(2)}</Text>
              </View>
            )}
            <Pressable style={{ flex: 1 }} onPress={() => goToOrder(row.strike, 'CE', 'BUY')} onLongPress={() => goToOrder(row.strike, 'CE', 'SELL')}>
              <Text style={styles.ltpText}>{row.ceLtp.toFixed(1)}</Text>
              <Text style={[styles.chngText, { color: row.ceChange >= 0 ? colors.success : colors.danger }]}>
                {row.ceChange >= 0 ? '+' : ''}
                {row.ceChange.toFixed(1)}%
              </Text>
            </Pressable>
            <View style={{ flex: 0.9, alignItems: 'center' }}>
              <Text style={[styles.strikeText, row.isAtm && styles.strikeTextAtm]}>{row.strike}</Text>
              <Pressable
                style={styles.chartIconBtn}
                onPress={() => goToChart(row.strike, 'CE')}
                onLongPress={() => goToChart(row.strike, 'PE')}
                hitSlop={6}
              >
                <Ionicons name="stats-chart-outline" size={11} color={colors.textMuted} />
              </Pressable>
            </View>
            <Pressable style={{ flex: 1 }} onPress={() => goToOrder(row.strike, 'PE', 'BUY')} onLongPress={() => goToOrder(row.strike, 'PE', 'SELL')}>
              <Text style={[styles.ltpText, { textAlign: 'right' }]}>{row.peLtp.toFixed(1)}</Text>
              <Text style={[styles.chngText, { color: row.peChange >= 0 ? colors.success : colors.danger, textAlign: 'right' }]}>
                {row.peChange >= 0 ? '+' : ''}
                {row.peChange.toFixed(1)}%
              </Text>
            </Pressable>
            {mode === 'OI' ? (
              <Text style={[styles.oiText, { flex: 1.3, textAlign: 'right' }]}>{formatOi(row.peOiRaw)}</Text>
            ) : (
              <View style={{ flex: 1.3, alignItems: 'flex-end' }}>
                <Text style={styles.greekText}>IV {row.peIv.toFixed(1)}</Text>
                <Text style={styles.greekText}>Δ {row.peDelta.toFixed(2)}</Text>
              </View>
            )}
          </View>
        ))}

        <View style={styles.demoBanner}>
          <Ionicons name="information-circle-outline" size={16} color={colors.primary} />
          <Text style={styles.demoBannerText}>
            Tap a price to Buy, long-press to Sell/Write. Tap the chart icon under a strike for its Call chart,
            long-press it for the Put chart. Simulated premiums, OI & Greeks for practice — the full order screen has
            Stoploss, GTT, Iceberg, Market Protection and Validity, just like a real broker.
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
  statsRow: { flexDirection: 'row', backgroundColor: colors.surface, paddingVertical: spacing.sm },
  statBox: { flex: 1, alignItems: 'center' },
  statLabel: { fontFamily: fonts.regular, fontSize: 10.5, color: colors.textMuted, letterSpacing: 0.3 },
  statValue: { fontFamily: fonts.bold, fontSize: 14, color: colors.text, marginTop: 2 },
  subRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    backgroundColor: colors.surface,
    gap: spacing.sm,
  },
  expiryRow: { gap: spacing.sm, flexGrow: 1 },
  expiryChip: { paddingHorizontal: spacing.md, paddingVertical: 6, borderRadius: radius.pill, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.background },
  expiryChipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  expiryChipText: { fontFamily: fonts.semiBold, fontSize: 12, color: colors.textMuted },
  expiryChipTextActive: { color: '#fff' },
  modeToggle: { flexDirection: 'row', backgroundColor: colors.background, borderRadius: radius.pill, borderWidth: 1, borderColor: colors.border, padding: 2 },
  modeChip: { paddingHorizontal: spacing.sm, paddingVertical: 5, borderRadius: radius.pill },
  modeChipActive: { backgroundColor: colors.primary },
  modeChipText: { fontFamily: fonts.semiBold, fontSize: 11, color: colors.textMuted },
  modeChipTextActive: { color: '#fff' },
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
  greekText: { fontFamily: fonts.regular, fontSize: 9.5, color: colors.textMuted },
  ltpText: { fontFamily: fonts.semiBold, fontSize: 12.5, color: colors.text, textAlign: 'left' },
  chngText: { fontFamily: fonts.regular, fontSize: 9.5, marginTop: 1 },
  strikeText: { fontFamily: fonts.bold, fontSize: 12.5, color: colors.text, textAlign: 'center' },
  strikeTextAtm: { color: colors.primary },
  chartIconBtn: { marginTop: 2, padding: 2 },
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
