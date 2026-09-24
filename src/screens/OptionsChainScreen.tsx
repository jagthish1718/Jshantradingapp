import { useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView, SafeAreaView, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Polyline } from 'react-native-svg';
import { useThemeColors } from '../context/ThemeContext';
import type { ThemeColors } from '../theme/colors';
import { spacing, radius, fonts } from '../theme/spacing';
import { INSTRUMENTS } from '../data/instruments';
import { ensureStarted, subscribe, getPrice, getHistory, optionPremium, optionGreeks } from '../data/marketSim';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { HomeStackParamList } from '../navigation/types';

const OPTIONABLE = INSTRUMENTS.filter((i) => i.hasOptions);

type StrikeRow = {
  strike: number;
  isAtm: boolean;
  ceItm: boolean;
  peItm: boolean;
  ceLtp: number;
  ceOiRaw: number;
  ceChange: number;
  ceDelta: number;
  ceIv: number;
  ceHistory: number[];
  peLtp: number;
  peOiRaw: number;
  peChange: number;
  peDelta: number;
  peIv: number;
  peHistory: number[];
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

// Small in-app trend line for a strike's own premium history -- not a
// TradingView chart, since option premiums here are simulated off our own
// spot-price engine, not a real market symbol TradingView has data for.
// Cheap SVG polyline, no network/WebView needed per row.
function Sparkline({ points, color }: { points: number[]; color: string }) {
  const width = 30;
  const height = 14;
  if (points.length < 2) return <View style={{ width, height }} />;
  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;
  const step = width / (points.length - 1);
  const coords = points
    .map((p, i) => `${(i * step).toFixed(1)},${(height - ((p - min) / range) * height).toFixed(1)}`)
    .join(' ');
  return (
    <Svg width={width} height={height}>
      <Polyline points={coords} fill="none" stroke={color} strokeWidth={1.3} strokeLinejoin="round" strokeLinecap="round" />
    </Svg>
  );
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
    const spotHist = getHistory(underlying.symbol);
    const rows: StrikeRow[] = [];
    for (let i = -6; i <= 6; i++) {
      const strike = atm + i * step;
      const ceGreeks = optionGreeks(spot, strike, true);
      const peGreeks = optionGreeks(spot, strike, false);
      rows.push({
        strike,
        isAtm: strike === atm,
        ceItm: strike < spot,
        peItm: strike > spot,
        ceLtp: optionPremium(spot, strike, true),
        ceOiRaw: 2000 + Math.random() * 60000 * (1 / (1 + Math.abs(i) * 0.3)),
        ceChange: (Math.random() - 0.5) * 18,
        ceDelta: ceGreeks.delta,
        ceIv: ceGreeks.iv,
        ceHistory: spotHist.map((s) => optionPremium(s, strike, true)),
        peLtp: optionPremium(spot, strike, false),
        peOiRaw: 2000 + Math.random() * 60000 * (1 / (1 + Math.abs(i) * 0.3)),
        peChange: (Math.random() - 0.5) * 18,
        peDelta: peGreeks.delta,
        peIv: peGreeks.iv,
        peHistory: spotHist.map((s) => optionPremium(s, strike, false)),
      });
    }
    return rows;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [atm, step, Math.round(spot), underlying.symbol]);

  const maxOi = useMemo(() => Math.max(1, ...strikes.flatMap((r) => [r.ceOiRaw, r.peOiRaw])), [strikes]);

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
    // The Pro Chart is a real TradingView chart of the underlying — it
    // can't plot a synthetic option premium, so this opens the
    // underlying's real chart instead (still useful context for the
    // strike being viewed). We still pass the option details along so
    // this screen can show a Buy/Sell button for that exact strike.
    navigation.navigate('ProChart', {
      symbol: underlying.symbol,
      option: { underlying: underlying.symbol, strike, type: optType, expiry, lotSize },
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
        <View style={[styles.statBox, styles.statBoxDivider]}>
          <Text style={styles.statLabel}>Max Pain</Text>
          <Text style={styles.statValue}>{maxPain}</Text>
        </View>
        <View style={[styles.statBox, styles.statBoxDivider]}>
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
        <Text style={[styles.tableHeaderText, { flex: 1.1, textAlign: 'left' }]}>{mode === 'OI' ? 'OI' : 'IV / Δ'}</Text>
        <Text style={[styles.tableHeaderText, { flex: 1.35 }]}>CALLS</Text>
        <Text style={[styles.tableHeaderText, { flex: 0.7 }]}>STRIKE</Text>
        <Text style={[styles.tableHeaderText, { flex: 1.35 }]}>PUTS</Text>
        <Text style={[styles.tableHeaderText, { flex: 1.1, textAlign: 'right' }]}>{mode === 'OI' ? 'OI' : 'IV / Δ'}</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: spacing.xl }}>
        {strikes.map((row) => (
          <View key={row.strike} style={[styles.row, row.isAtm && styles.rowAtm]}>
            {mode === 'OI' ? (
              <View style={{ flex: 1.1 }}>
                <Text style={[styles.oiText, { textAlign: 'left' }]}>{formatOi(row.ceOiRaw)}</Text>
                <View style={styles.oiBarTrack}>
                  <View style={[styles.oiBarFill, { width: `${(row.ceOiRaw / maxOi) * 100}%`, backgroundColor: colors.success }]} />
                </View>
              </View>
            ) : (
              <View style={{ flex: 1.1 }}>
                <Text style={styles.greekText}>IV {row.ceIv.toFixed(1)}</Text>
                <Text style={styles.greekText}>Δ {row.ceDelta.toFixed(2)}</Text>
              </View>
            )}
            <View style={[{ flex: 1.35, alignItems: 'flex-start' }, row.ceItm && styles.itmCellCe]}>
              <Pressable
                style={styles.ltpRow}
                onPress={() => goToOrder(row.strike, 'CE', 'BUY')}
                onLongPress={() => goToOrder(row.strike, 'CE', 'SELL')}
              >
                <View>
                  <Text style={styles.ltpText}>{row.ceLtp.toFixed(1)}</Text>
                  <Text style={[styles.chngText, { color: row.ceChange >= 0 ? colors.success : colors.danger }]}>
                    {row.ceChange >= 0 ? '+' : ''}
                    {row.ceChange.toFixed(1)}%
                  </Text>
                </View>
                <Sparkline points={row.ceHistory} color={row.ceChange >= 0 ? colors.success : colors.danger} />
              </Pressable>
              <Pressable style={styles.chartIconBtn} onPress={() => goToChart(row.strike, 'CE')} hitSlop={6}>
                <Ionicons name="stats-chart-outline" size={10} color={colors.textMuted} />
                <Text style={styles.chartIconLabel}>Chart</Text>
              </Pressable>
            </View>
            <Text style={[styles.strikeText, { flex: 0.7 }, row.isAtm && styles.strikeTextAtm]}>{row.strike}</Text>
            <View style={[{ flex: 1.35, alignItems: 'flex-end' }, row.peItm && styles.itmCellPe]}>
              <Pressable
                style={[styles.ltpRow, { flexDirection: 'row-reverse' }]}
                onPress={() => goToOrder(row.strike, 'PE', 'BUY')}
                onLongPress={() => goToOrder(row.strike, 'PE', 'SELL')}
              >
                <View>
                  <Text style={[styles.ltpText, { textAlign: 'right' }]}>{row.peLtp.toFixed(1)}</Text>
                  <Text style={[styles.chngText, { color: row.peChange >= 0 ? colors.success : colors.danger, textAlign: 'right' }]}>
                    {row.peChange >= 0 ? '+' : ''}
                    {row.peChange.toFixed(1)}%
                  </Text>
                </View>
                <Sparkline points={row.peHistory} color={row.peChange >= 0 ? colors.success : colors.danger} />
              </Pressable>
              <Pressable style={styles.chartIconBtn} onPress={() => goToChart(row.strike, 'PE')} hitSlop={6}>
                <Text style={styles.chartIconLabel}>Chart</Text>
                <Ionicons name="stats-chart-outline" size={10} color={colors.textMuted} />
              </Pressable>
            </View>
            {mode === 'OI' ? (
              <View style={{ flex: 1.1, alignItems: 'flex-end' }}>
                <Text style={[styles.oiText, { textAlign: 'right' }]}>{formatOi(row.peOiRaw)}</Text>
                <View style={[styles.oiBarTrack, { flexDirection: 'row-reverse' }]}>
                  <View style={[styles.oiBarFill, { width: `${(row.peOiRaw / maxOi) * 100}%`, backgroundColor: colors.danger }]} />
                </View>
              </View>
            ) : (
              <View style={{ flex: 1.1, alignItems: 'flex-end' }}>
                <Text style={styles.greekText}>IV {row.peIv.toFixed(1)}</Text>
                <Text style={styles.greekText}>Δ {row.peDelta.toFixed(2)}</Text>
              </View>
            )}
          </View>
        ))}

        <View style={styles.demoBanner}>
          <Ionicons name="information-circle-outline" size={16} color={colors.primary} />
          <Text style={styles.demoBannerText}>
            Tap a price to Buy, long-press to Sell/Write. Tap "Chart" under a Call or Put premium for that
            option's own live chart. Simulated premiums, OI & Greeks for practice — the full order screen has
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
  statBoxDivider: { borderLeftWidth: 1, borderLeftColor: colors.divider },
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
  ltpRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  oiBarTrack: { height: 3, borderRadius: 2, backgroundColor: colors.divider, marginTop: 3, overflow: 'hidden' },
  oiBarFill: { height: 3, borderRadius: 2 },
  itmCellCe: { backgroundColor: 'rgba(46, 160, 90, 0.07)', borderRadius: radius.sm, marginLeft: -4, paddingLeft: 4 },
  itmCellPe: { backgroundColor: 'rgba(220, 60, 60, 0.07)', borderRadius: radius.sm, marginRight: -4, paddingRight: 4 },
  chngText: { fontFamily: fonts.regular, fontSize: 9.5, marginTop: 1 },
  strikeText: { fontFamily: fonts.bold, fontSize: 12.5, color: colors.text, textAlign: 'center' },
  strikeTextAtm: { color: colors.primary },
  chartIconBtn: { flexDirection: 'row', alignItems: 'center', gap: 2, marginTop: 2, paddingVertical: 2, paddingHorizontal: 3 },
  chartIconLabel: { fontFamily: fonts.regular, fontSize: 8.5, color: colors.textMuted },
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
