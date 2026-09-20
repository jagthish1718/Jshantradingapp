import { useMemo, useState } from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColors } from '../context/ThemeContext';
import type { ThemeColors } from '../theme/colors';
import { spacing, radius, fonts } from '../theme/spacing';
import { INSTRUMENTS } from '../data/instruments';
import CandlestickChart, { Candle } from '../components/CandlestickChart';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { HomeStackParamList } from '../navigation/types';

type Timeframe = '1D' | '1W' | '1M' | '3M' | '1Y';

const TIMEFRAMES: { key: Timeframe; count: number; volPct: number }[] = [
  { key: '1D', count: 26, volPct: 0.003 },
  { key: '1W', count: 28, volPct: 0.007 },
  { key: '1M', count: 30, volPct: 0.014 },
  { key: '3M', count: 36, volPct: 0.024 },
  { key: '1Y', count: 52, volPct: 0.034 },
];

function genCandles(base: number, count: number, volPct: number): Candle[] {
  const candles: Candle[] = [];
  let price = base * (0.94 + Math.random() * 0.06);
  for (let i = 0; i < count; i++) {
    const o = price;
    const change = (Math.random() - 0.47) * base * volPct;
    const c = Math.max(base * 0.5, o + change);
    const wick = base * volPct * 0.7;
    const h = Math.max(o, c) + Math.random() * wick;
    const l = Math.max(base * 0.4, Math.min(o, c) - Math.random() * wick);
    candles.push({
      o: Math.round(o * 100) / 100,
      h: Math.round(h * 100) / 100,
      l: Math.round(l * 100) / 100,
      c: Math.round(c * 100) / 100,
    });
    price = c;
  }
  return candles;
}

function formatRupees(n: number) {
  return `₹${n.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`;
}

type Props = NativeStackScreenProps<HomeStackParamList, 'ChartView'>;

export default function ChartViewScreen({ navigation, route }: Props) {
  const colors = useThemeColors();
  const styles = makeStyles(colors);
  const { symbol } = route.params;
  const instrument = INSTRUMENTS.find((i) => i.symbol === symbol) ?? INSTRUMENTS[0];
  const [timeframe, setTimeframe] = useState<Timeframe>('1D');

  const tf = TIMEFRAMES.find((t) => t.key === timeframe)!;
  const candles = useMemo(
    () => genCandles(instrument.base, tf.count, tf.volPct),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [instrument.symbol, timeframe]
  );

  const last = candles[candles.length - 1];
  const first = candles[0];
  const changePct = ((last.c - first.o) / first.o) * 100;
  const trendColor = changePct >= 0 ? colors.success : colors.danger;

  const periodHigh = Math.max(...candles.map((c) => c.h));
  const periodLow = Math.min(...candles.map((c) => c.l));

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
        <View style={styles.headerTopRow}>
          <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={18} color="#fff" />
          </Pressable>
          <View style={{ flex: 1, marginLeft: spacing.sm }}>
            <Text style={styles.headerSymbol}>{instrument.symbol}</Text>
            <Text style={styles.headerName}>{instrument.name}</Text>
          </View>
        </View>
        <View style={styles.priceRow}>
          <Text style={styles.headerPrice}>{formatRupees(last.c)}</Text>
          <Text style={[styles.headerChange, { color: '#fff', backgroundColor: trendColor }]}>
            {changePct >= 0 ? '+' : ''}
            {changePct.toFixed(2)}%
          </Text>
        </View>
      </View>

      <View style={styles.tfRow}>
        {TIMEFRAMES.map((t) => (
          <Pressable
            key={t.key}
            style={[styles.tfChip, timeframe === t.key && styles.tfChipActive]}
            onPress={() => setTimeframe(t.key)}
          >
            <Text style={[styles.tfChipText, timeframe === t.key && styles.tfChipTextActive]}>{t.key}</Text>
          </Pressable>
        ))}
      </View>

      <ScrollView contentContainerStyle={{ padding: spacing.lg }}>
        <View style={styles.chartCard}>
          <CandlestickChart data={candles} width={310} height={200} />
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
            <Text style={styles.statValue}>{formatRupees(last.c)}</Text>
          </View>
        </View>

        <View style={styles.demoBanner}>
          <Ionicons name="information-circle-outline" size={16} color={colors.primary} />
          <Text style={styles.demoBannerText}>
            Simulated candlestick data for practice — regenerates each time you switch timeframe.
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
  tfRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  tfChip: { flex: 1, alignItems: 'center', paddingVertical: 7, borderRadius: radius.pill, backgroundColor: colors.background, borderWidth: 1, borderColor: colors.border },
  tfChipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  tfChipText: { fontFamily: fonts.semiBold, fontSize: 12, color: colors.textMuted },
  tfChipTextActive: { color: '#fff' },
  chartCard: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    padding: spacing.md,
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
