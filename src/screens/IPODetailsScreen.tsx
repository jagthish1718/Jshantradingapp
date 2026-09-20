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
import { fetchIPOs, IPOListing, IPOStatus, ApiKeyMissingError, PlanRestrictedError, RateLimitedError } from '../services/ipoApi';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { HomeStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<HomeStackParamList, 'IPOs'>;

const TABS: { key: IPOStatus; label: string }[] = [
  { key: 'open', label: 'Open' },
  { key: 'upcoming', label: 'Upcoming' },
  { key: 'listed', label: 'Listed' },
];

function getStatusColor(colors: ThemeColors): Record<IPOStatus, string> {
  return {
    open: colors.success,
    upcoming: colors.gold,
    listed: colors.primary,
    closed: colors.textLight,
    unknown: colors.textLight,
  };
}

export default function IPODetailsScreen({ navigation }: Props) {
  const colors = useThemeColors();
  const styles = makeStyles(colors);
  const statusColor = getStatusColor(colors);
  const [tab, setTab] = useState<IPOStatus>('open');
  const [ipos, setIpos] = useState<IPOListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [keyMissing, setKeyMissing] = useState(false);
  const [planRestricted, setPlanRestricted] = useState<string | null>(null);
  const [rateLimited, setRateLimited] = useState(false);

  const load = useCallback(async (status: IPOStatus) => {
    setError(null);
    setKeyMissing(false);
    setPlanRestricted(null);
    setRateLimited(false);
    try {
      const data = await fetchIPOs(status);
      setIpos(data);
    } catch (e) {
      if (e instanceof ApiKeyMissingError) {
        setKeyMissing(true);
      } else if (e instanceof PlanRestrictedError) {
        setPlanRestricted(
          `"${status[0].toUpperCase()}${status.slice(1)}" IPOs need a paid ipoalerts.in plan. The Open tab is free.`
        );
      } else if (e instanceof RateLimitedError) {
        setRateLimited(true);
      } else {
        setError(e instanceof Error ? e.message : 'Could not load IPOs');
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    load(tab);
  }, [tab, load]);

  const onRefresh = () => {
    setRefreshing(true);
    load(tab);
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={18} color="#fff" />
        </Pressable>
        <View style={{ flex: 1, marginLeft: spacing.sm }}>
          <Text style={styles.headerTitle}>IPOs</Text>
          <Text style={styles.headerSubtitle}>NSE & BSE, live</Text>
        </View>
      </View>

      <View style={styles.tabRow}>
        {TABS.map((t) => (
          <Pressable
            key={t.key}
            style={[styles.tab, tab === t.key && styles.tabActive]}
            onPress={() => setTab(t.key)}
          >
            <Text style={[styles.tabText, tab === t.key && styles.tabTextActive]}>{t.label}</Text>
          </Pressable>
        ))}
      </View>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator color={colors.primary} />
        </View>
      ) : keyMissing ? (
        <View style={styles.center}>
          <Ionicons name="key-outline" size={28} color={colors.textLight} />
          <Text style={styles.emptyTitle}>Add your free IPO API key</Text>
          <Text style={styles.emptyBody}>
            Get a free key (no card needed) at ipoalerts.in and paste it into{'\n'}
            src/config/apiKeys.ts as IPOALERTS_API_KEY.
          </Text>
        </View>
      ) : planRestricted ? (
        <View style={styles.center}>
          <Ionicons name="lock-closed-outline" size={28} color={colors.textLight} />
          <Text style={styles.emptyTitle}>Needs a paid plan</Text>
          <Text style={styles.emptyBody}>{planRestricted}</Text>
          <Pressable style={styles.retryButton} onPress={() => setTab('open')}>
            <Text style={styles.retryButtonText}>Go to Open IPOs</Text>
          </Pressable>
        </View>
      ) : rateLimited ? (
        <View style={styles.center}>
          <Ionicons name="time-outline" size={28} color={colors.textLight} />
          <Text style={styles.emptyTitle}>Too many requests</Text>
          <Text style={styles.emptyBody}>
            IPO data is loading too fast — please wait a minute and try again.
          </Text>
          <Pressable style={styles.retryButton} onPress={() => load(tab)}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </Pressable>
        </View>
      ) : error ? (
        <View style={styles.center}>
          <Ionicons name="cloud-offline-outline" size={28} color={colors.textLight} />
          <Text style={styles.emptyTitle}>Couldn't load IPOs</Text>
          <Text style={styles.emptyBody}>{error}</Text>
          <Pressable style={styles.retryButton} onPress={() => load(tab)}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </Pressable>
        </View>
      ) : ipos.length === 0 ? (
        <View style={styles.center}>
          <Ionicons name="file-tray-outline" size={28} color={colors.textLight} />
          <Text style={styles.emptyTitle}>No {tab} IPOs right now</Text>
        </View>
      ) : (
        <FlatList
          data={ipos}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: spacing.lg }}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.cardTopRow}>
                <Text style={styles.cardTitle} numberOfLines={1}>
                  {item.companyName}
                </Text>
                <View style={[styles.statusPill, { backgroundColor: statusColor[item.status] + '22' }]}>
                  <Text style={[styles.statusPillText, { color: statusColor[item.status] }]}>
                    {item.status}
                  </Text>
                </View>
              </View>

              <View style={styles.detailGrid}>
                {item.priceRangeLabel && (
                  <View style={styles.detailCell}>
                    <Text style={styles.detailLabel}>Price band</Text>
                    <Text style={styles.detailValue}>{item.priceRangeLabel}</Text>
                  </View>
                )}
                {item.gmpLabel && (
                  <View style={styles.detailCell}>
                    <Text style={styles.detailLabel}>GMP</Text>
                    <Text style={styles.detailValue}>{item.gmpLabel}</Text>
                  </View>
                )}
                {item.lotSize != null && (
                  <View style={styles.detailCell}>
                    <Text style={styles.detailLabel}>Lot size</Text>
                    <Text style={styles.detailValue}>{item.lotSize}</Text>
                  </View>
                )}
                {item.issueSizeLabel && (
                  <View style={styles.detailCell}>
                    <Text style={styles.detailLabel}>Issue size</Text>
                    <Text style={styles.detailValue}>{item.issueSizeLabel}</Text>
                  </View>
                )}
              </View>

              {(item.openDate || item.closeDate || item.listingDate) && (
                <Text style={styles.dateLine}>
                  {item.openDate ? `Opens ${item.openDate}` : ''}
                  {item.closeDate ? `  ·  Closes ${item.closeDate}` : ''}
                  {item.listingDate ? `  ·  Lists ${item.listingDate}` : ''}
                </Text>
              )}
            </View>
          )}
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
    paddingBottom: spacing.md,
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
  tabRow: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
    gap: spacing.sm,
  },
  tab: {
    paddingHorizontal: spacing.md,
    paddingVertical: 7,
    borderRadius: radius.pill,
    backgroundColor: 'rgba(255,255,255,0.14)',
  },
  tabActive: { backgroundColor: '#fff' },
  tabText: { fontFamily: fonts.medium, fontSize: 12.5, color: '#fff' },
  tabTextActive: { color: colors.primary },
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
    backgroundColor: colors.background,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardTopRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  cardTitle: { fontFamily: fonts.semiBold, fontSize: 14.5, color: colors.text, flex: 1, marginRight: spacing.sm },
  statusPill: { paddingHorizontal: 9, paddingVertical: 3, borderRadius: radius.pill },
  statusPillText: { fontFamily: fonts.semiBold, fontSize: 10.5, textTransform: 'capitalize' },
  detailGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md, marginTop: spacing.sm },
  detailCell: { minWidth: 90 },
  detailLabel: { fontFamily: fonts.regular, fontSize: 10.5, color: colors.textMuted },
  detailValue: { fontFamily: fonts.semiBold, fontSize: 13, color: colors.text, marginTop: 2 },
  dateLine: { fontFamily: fonts.regular, fontSize: 11, color: colors.textMuted, marginTop: spacing.sm },
});
