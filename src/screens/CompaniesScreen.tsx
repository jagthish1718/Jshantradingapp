import { useCallback, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColors } from '../context/ThemeContext';
import type { ThemeColors } from '../theme/colors';
import { spacing, radius, fonts } from '../theme/spacing';
import { COMPANIES } from '../data/companies';
import { fetchCompanyQuotes, CompanyQuote } from '../services/stocksApi';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { HomeStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<HomeStackParamList, 'Companies'>;

function formatRupees(n: number) {
  return `₹${n.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`;
}

export default function CompaniesScreen({ navigation }: Props) {
  const colors = useThemeColors();
  const styles = makeStyles(colors);
  const [quotes, setQuotes] = useState<Record<string, CompanyQuote>>({});
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setError(null);
    try {
      const data = await fetchCompanyQuotes(COMPANIES.map((c) => c.symbol));
      if (data.length === 0) {
        setError('No live prices came back. Please try again.');
        return;
      }
      const map: Record<string, CompanyQuote> = {};
      data.forEach((q) => {
        map[q.symbol] = q;
      });
      setQuotes(map);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not load prices');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const onRefresh = () => {
    setRefreshing(true);
    load();
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={18} color="#fff" />
        </Pressable>
        <View style={{ flex: 1, marginLeft: spacing.sm }}>
          <Text style={styles.headerTitle}>Companies</Text>
          <Text style={styles.headerSubtitle}>Live NSE prices</Text>
        </View>
      </View>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator color={colors.primary} />
        </View>
      ) : error ? (
        <View style={styles.center}>
          <Ionicons name="cloud-offline-outline" size={28} color={colors.textLight} />
          <Text style={styles.emptyTitle}>Couldn't load prices</Text>
          <Text style={styles.emptyBody}>{error}</Text>
          <Pressable style={styles.retryButton} onPress={load}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </Pressable>
        </View>
      ) : (
        <FlatList
          data={COMPANIES}
          keyExtractor={(item) => item.symbol}
          contentContainerStyle={{ padding: spacing.lg }}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          renderItem={({ item }) => {
            const q = quotes[item.symbol];
            const up = (q?.change ?? 0) >= 0;
            return (
              <View style={styles.card}>
                <View style={styles.cardTextWrap}>
                  <Text style={styles.cardTitle}>{item.name}</Text>
                  <Text style={styles.cardMeta}>
                    {item.symbol} · {item.sector}
                  </Text>
                </View>
                {q ? (
                  <View style={styles.priceWrap}>
                    <Text style={styles.price}>{formatRupees(q.close)}</Text>
                    <View style={styles.changeRow}>
                      <Ionicons
                        name={up ? 'caret-up' : 'caret-down'}
                        size={11}
                        color={up ? colors.success : colors.danger}
                      />
                      <Text style={[styles.changeText, { color: up ? colors.success : colors.danger }]}>
                        {Math.abs(q.percentChange).toFixed(2)}%
                      </Text>
                    </View>
                  </View>
                ) : (
                  <Text style={styles.priceMissing}>—</Text>
                )}
              </View>
            );
          }}
        />
      )}
    </SafeAreaView>
  );
}

const makeStyles = (colors: ThemeColors) => StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  header: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
  },
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
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: spacing.xl },
  emptyTitle: { fontFamily: fonts.semiBold, fontSize: 15, color: colors.text, marginTop: spacing.md, textAlign: 'center' },
  emptyBody: { fontFamily: fonts.regular, fontSize: 12.5, color: colors.textMuted, marginTop: spacing.xs, textAlign: 'center', lineHeight: 18 },
  retryButton: {
    marginTop: spacing.md,
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
  },
  retryButtonText: { fontFamily: fonts.semiBold, fontSize: 13, color: '#fff' },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardTextWrap: { flex: 1 },
  cardTitle: { fontFamily: fonts.semiBold, fontSize: 14, color: colors.text },
  cardMeta: { fontFamily: fonts.regular, fontSize: 11.5, color: colors.textMuted, marginTop: 3 },
  priceWrap: { alignItems: 'flex-end' },
  price: { fontFamily: fonts.bold, fontSize: 14, color: colors.text },
  changeRow: { flexDirection: 'row', alignItems: 'center', gap: 2, marginTop: 3 },
  changeText: { fontFamily: fonts.semiBold, fontSize: 11.5 },
  priceMissing: { fontFamily: fonts.regular, fontSize: 13, color: colors.textLight },
});
