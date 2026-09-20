import { useEffect, useMemo, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView,
  SafeAreaView,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColors } from '../context/ThemeContext';
import type { ThemeColors } from '../theme/colors';
import { spacing, radius, fonts } from '../theme/spacing';
import { STORAGE_KEYS } from '../utils/storage';
import PriceChart from '../components/PriceChart';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { HomeStackParamList } from '../navigation/types';
import { useEntitlements } from '../context/EntitlementsContext';
import SubscriptionGate from '../components/SubscriptionGate';

type Direction = 'Buy' | 'Sell';

type JournalEntry = {
  id: string;
  symbol: string;
  direction: Direction;
  entryPrice: number;
  exitPrice: number | null;
  notes: string;
  date: string;
};

type Props = NativeStackScreenProps<HomeStackParamList, 'TradingJournal'>;

export default function TradingJournalScreen({ navigation }: Props) {
  const colors = useThemeColors();
  const styles = makeStyles(colors);
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loaded, setLoaded] = useState(false);
  const { isSubscribed } = useEntitlements();
  const [showForm, setShowForm] = useState(false);
  const [direction, setDirection] = useState<Direction>('Buy');
  const [symbol, setSymbol] = useState('');
  const [entryPrice, setEntryPrice] = useState('');
  const [exitPrice, setExitPrice] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEYS.journal);
        if (raw) setEntries(JSON.parse(raw));
      } catch {
        // ignore
      } finally {
        setLoaded(true);
      }
    })();
  }, []);

  const persist = (next: JournalEntry[]) => {
    setEntries(next);
    AsyncStorage.setItem(STORAGE_KEYS.journal, JSON.stringify(next)).catch(() => {});
  };

  const resetForm = () => {
    setDirection('Buy');
    setSymbol('');
    setEntryPrice('');
    setExitPrice('');
    setNotes('');
    setShowForm(false);
  };

  const addEntry = () => {
    const price = parseFloat(entryPrice);
    if (!symbol.trim() || isNaN(price)) {
      Alert.alert('Missing details', 'Please enter at least a symbol and a valid entry price.');
      return;
    }
    const exit = exitPrice.trim() ? parseFloat(exitPrice) : null;
    const entry: JournalEntry = {
      id: `${Date.now()}`,
      symbol: symbol.trim().toUpperCase(),
      direction,
      entryPrice: price,
      exitPrice: exit !== null && !isNaN(exit) ? exit : null,
      notes: notes.trim(),
      date: new Date().toISOString(),
    };
    persist([entry, ...entries]);
    resetForm();
  };

  const deleteEntry = (id: string) => {
    Alert.alert('Delete entry', 'Remove this journal entry?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => persist(entries.filter((e) => e.id !== id)) },
    ]);
  };

  const closedEntries = entries.filter((e) => e.exitPrice !== null);
  const openEntries = entries.filter((e) => e.exitPrice === null);
  const wins = closedEntries.filter((e) => pnlPercent(e) > 0).length;
  const losses = closedEntries.filter((e) => pnlPercent(e) < 0).length;
  const winRate = closedEntries.length > 0 ? Math.round((wins / closedEntries.length) * 100) : null;
  const totalPnlPct = closedEntries.reduce((sum, e) => sum + pnlPercent(e), 0);

  // Cumulative P&L trend across closed trades, oldest first — the "equity
  // curve" of this journal so far.
  const cumulativeSeries = useMemo(() => {
    const chrono = [...closedEntries].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    let running = 0;
    return chrono.map((e) => (running += pnlPercent(e)));
  }, [closedEntries]);

  if (!loaded) return <SafeAreaView style={styles.root} />;

  if (!isSubscribed) {
    return (
      <SubscriptionGate
        icon="journal"
        title="Trading Journal is a membership feature"
        message="Log your trades and track your win rate over time. Subscribe to unlock the Trading Journal, Paper Trading and all lessons."
        onSubscribe={() => (navigation.getParent() as any)?.navigate('ProfileTab', { screen: 'Subscription' })}
        onBack={() => navigation.goBack()}
      />
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={80}
    >
      <SafeAreaView style={styles.root}>
        <View style={styles.header}>
          <View style={styles.headerTopRow}>
            <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={18} color="#fff" />
            </Pressable>
            <View style={{ flex: 1, marginLeft: spacing.sm }}>
              <Text style={styles.headerTitle}>Trading Journal</Text>
              <Text style={styles.headerSubtitle}>
                {entries.length} {entries.length === 1 ? 'entry' : 'entries'}
                {winRate !== null ? `  ·  ${winRate}% win rate` : ''}
              </Text>
            </View>
            <Pressable style={styles.addButton} onPress={() => setShowForm((s) => !s)}>
              <Ionicons name={showForm ? 'close' : 'add'} size={20} color="#fff" />
            </Pressable>
          </View>
        </View>

        <ScrollView contentContainerStyle={{ padding: spacing.lg }} keyboardShouldPersistTaps="handled">
          {showForm && (
            <View style={styles.form}>
              <View style={styles.directionRow}>
                {(['Buy', 'Sell'] as Direction[]).map((d) => (
                  <Pressable
                    key={d}
                    style={[styles.directionChip, direction === d && styles.directionChipActive]}
                    onPress={() => setDirection(d)}
                  >
                    <Text style={[styles.directionChipText, direction === d && styles.directionChipTextActive]}>
                      {d}
                    </Text>
                  </Pressable>
                ))}
              </View>
              <TextInput
                style={styles.input}
                placeholder="Symbol (e.g. RELIANCE)"
                placeholderTextColor={colors.textLight}
                value={symbol}
                onChangeText={setSymbol}
                autoCapitalize="characters"
              />
              <View style={styles.rowGap}>
                <TextInput
                  style={[styles.input, { flex: 1 }]}
                  placeholder="Entry price"
                  placeholderTextColor={colors.textLight}
                  value={entryPrice}
                  onChangeText={setEntryPrice}
                  keyboardType="decimal-pad"
                />
                <TextInput
                  style={[styles.input, { flex: 1 }]}
                  placeholder="Exit price (optional)"
                  placeholderTextColor={colors.textLight}
                  value={exitPrice}
                  onChangeText={setExitPrice}
                  keyboardType="decimal-pad"
                />
              </View>
              <TextInput
                style={[styles.input, styles.notesInput]}
                placeholder="What was your reasoning? Any lesson learned?"
                placeholderTextColor={colors.textLight}
                value={notes}
                onChangeText={setNotes}
                multiline
              />
              <Pressable style={styles.saveButton} onPress={addEntry}>
                <Text style={styles.saveButtonText}>Save entry</Text>
              </Pressable>
            </View>
          )}

          {entries.length === 0 && !showForm && (
            <View style={styles.emptyState}>
              <Ionicons name="journal-outline" size={32} color={colors.textLight} />
              <Text style={styles.emptyTitle}>No entries yet</Text>
              <Text style={styles.emptySubtitle}>Log your trades here to spot your own patterns over time.</Text>
            </View>
          )}

          {entries.length > 0 && (
            <>
              <View style={styles.statsCard}>
                <View style={styles.statCell}>
                  <Text
                    style={[
                      styles.statValue,
                      totalPnlPct >= 0 ? styles.pnlPositive : styles.pnlNegative,
                    ]}
                  >
                    {totalPnlPct >= 0 ? '+' : ''}
                    {totalPnlPct.toFixed(1)}%
                  </Text>
                  <Text style={styles.statLabel}>Total P&L</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statCell}>
                  <Text style={styles.statValue}>
                    {wins}W · {losses}L
                  </Text>
                  <Text style={styles.statLabel}>Closed trades</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statCell}>
                  <Text style={styles.statValue}>{openEntries.length}</Text>
                  <Text style={styles.statLabel}>Open positions</Text>
                </View>
              </View>

              {cumulativeSeries.length >= 2 && (
                <View style={styles.chartCard}>
                  <Text style={styles.chartCardTitle}>Equity curve (closed trades)</Text>
                  <View style={styles.chartWrap}>
                    <PriceChart
                      data={cumulativeSeries}
                      width={264}
                      height={100}
                      color={
                        cumulativeSeries[cumulativeSeries.length - 1] >= 0 ? colors.success : colors.danger
                      }
                      baseline={0}
                      gradientId="journal-equity-curve"
                    />
                  </View>
                </View>
              )}
            </>
          )}

          {entries.map((entry) => {
            const pnl = entry.exitPrice !== null ? pnlPercent(entry) : null;
            return (
              <View key={entry.id} style={styles.entryCard}>
                <View style={styles.entryTopRow}>
                  <View style={styles.entryTitleRow}>
                    <View
                      style={[
                        styles.directionBadge,
                        { backgroundColor: entry.direction === 'Buy' ? colors.successBg : colors.dangerBg },
                      ]}
                    >
                      <Text
                        style={[
                          styles.directionBadgeText,
                          { color: entry.direction === 'Buy' ? colors.success : colors.danger },
                        ]}
                      >
                        {entry.direction}
                      </Text>
                    </View>
                    <Text style={styles.entrySymbol}>{entry.symbol}</Text>
                  </View>
                  <Pressable onPress={() => deleteEntry(entry.id)}>
                    <Ionicons name="trash-outline" size={16} color={colors.textLight} />
                  </Pressable>
                </View>

                <Text style={styles.entryPrices}>
                  Entry ₹{entry.entryPrice}
                  {entry.exitPrice !== null ? `  →  Exit ₹${entry.exitPrice}` : '  ·  Open position'}
                </Text>

                {entry.notes ? <Text style={styles.entryNotes}>{entry.notes}</Text> : null}

                <View style={styles.entryBottomRow}>
                  <Text style={styles.entryDate}>
                    {new Date(entry.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                  </Text>
                  {pnl !== null && (
                    <Text style={[styles.entryPnl, pnl >= 0 ? styles.pnlPositive : styles.pnlNegative]}>
                      {pnl >= 0 ? '+' : ''}
                      {pnl.toFixed(1)}%
                    </Text>
                  )}
                </View>
              </View>
            );
          })}

          {entries.length > 0 && (
            <View style={styles.insightBox}>
              <Ionicons name="sparkles-outline" size={16} color={colors.purple} />
              <Text style={styles.insightText}>
                AI-generated insights on your journal patterns are coming soon — for now, use this space to review
                your own trades honestly.
              </Text>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

function pnlPercent(entry: JournalEntry): number {
  if (entry.exitPrice === null) return 0;
  const raw = ((entry.exitPrice - entry.entryPrice) / entry.entryPrice) * 100;
  return entry.direction === 'Buy' ? raw : -raw;
}

const makeStyles = (colors: ThemeColors) => StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  header: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.lg,
  },
  headerTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  backButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: { fontFamily: fonts.bold, fontSize: 19, color: '#fff' },
  headerSubtitle: { fontFamily: fonts.regular, fontSize: 12, color: 'rgba(255,255,255,0.8)', marginTop: 3 },
  addButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  directionRow: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.sm },
  directionChip: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 9,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
  },
  directionChipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  directionChipText: { fontFamily: fonts.semiBold, fontSize: 13, color: colors.text },
  directionChipTextActive: { color: '#fff' },
  input: {
    fontFamily: fonts.regular,
    fontSize: 13.5,
    color: colors.text,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
    marginBottom: spacing.sm,
  },
  rowGap: { flexDirection: 'row', gap: spacing.sm },
  notesInput: { minHeight: 60, textAlignVertical: 'top' },
  saveButton: {
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    alignItems: 'center',
    paddingVertical: 12,
    marginTop: spacing.xs,
  },
  saveButtonText: { fontFamily: fonts.semiBold, fontSize: 14, color: '#fff' },
  emptyState: { alignItems: 'center', paddingVertical: spacing.xxl, gap: spacing.sm },
  emptyTitle: { fontFamily: fonts.semiBold, fontSize: 15, color: colors.text },
  emptySubtitle: {
    fontFamily: fonts.regular,
    fontSize: 12.5,
    color: colors.textMuted,
    textAlign: 'center',
    paddingHorizontal: spacing.xl,
  },
  statsCard: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    paddingVertical: spacing.md,
    marginBottom: spacing.md,
  },
  statCell: { flex: 1, alignItems: 'center' },
  statDivider: { width: 1, backgroundColor: colors.divider },
  statValue: { fontFamily: fonts.bold, fontSize: 15, color: colors.text },
  statLabel: { fontFamily: fonts.regular, fontSize: 10.5, color: colors.textMuted, marginTop: 3 },
  chartCard: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  chartCardTitle: {
    fontFamily: fonts.semiBold,
    fontSize: 12,
    color: colors.textMuted,
    marginBottom: spacing.sm,
  },
  chartWrap: { alignItems: 'center' },
  entryCard: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  entryTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  entryTitleRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  directionBadge: { paddingHorizontal: spacing.sm, paddingVertical: 3, borderRadius: radius.sm },
  directionBadgeText: { fontFamily: fonts.bold, fontSize: 10.5 },
  entrySymbol: { fontFamily: fonts.semiBold, fontSize: 14.5, color: colors.text },
  entryPrices: { fontFamily: fonts.regular, fontSize: 13, color: colors.textMuted, marginTop: spacing.sm },
  entryNotes: { fontFamily: fonts.regular, fontSize: 12.5, color: colors.text, marginTop: spacing.xs, lineHeight: 18 },
  entryBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  entryDate: { fontFamily: fonts.regular, fontSize: 11, color: colors.textLight },
  entryPnl: { fontFamily: fonts.bold, fontSize: 13 },
  pnlPositive: { color: colors.success },
  pnlNegative: { color: colors.danger },
  insightBox: {
    flexDirection: 'row',
    gap: spacing.sm,
    backgroundColor: colors.purpleBg,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginTop: spacing.sm,
    marginBottom: spacing.xl,
  },
  insightText: { flex: 1, fontFamily: fonts.regular, fontSize: 12, color: colors.purple, lineHeight: 17 },
});
