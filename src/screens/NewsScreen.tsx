import { useCallback, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  FlatList,
  SafeAreaView,
  Image,
  ActivityIndicator,
  Linking,
  RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColors } from '../context/ThemeContext';
import type { ThemeColors } from '../theme/colors';
import { spacing, radius, fonts } from '../theme/spacing';
import { fetchBusinessNews, NewsArticle, ApiKeyMissingError } from '../services/newsApi';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { HomeStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<HomeStackParamList, 'News'>;

function timeAgo(iso: string) {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return '';
  const mins = Math.max(1, Math.floor((Date.now() - then) / 60000));
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

export default function NewsScreen({ navigation }: Props) {
  const colors = useThemeColors();
  const styles = makeStyles(colors);
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [keyMissing, setKeyMissing] = useState(false);

  const load = useCallback(async () => {
    setError(null);
    setKeyMissing(false);
    try {
      const data = await fetchBusinessNews();
      setArticles(data);
    } catch (e) {
      if (e instanceof ApiKeyMissingError) {
        setKeyMissing(true);
      } else {
        setError(e instanceof Error ? e.message : 'Could not load news');
      }
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
          <Text style={styles.headerTitle}>Business News</Text>
          <Text style={styles.headerSubtitle}>Live headlines, India</Text>
        </View>
      </View>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator color={colors.primary} />
        </View>
      ) : keyMissing ? (
        <View style={styles.center}>
          <Ionicons name="key-outline" size={28} color={colors.textLight} />
          <Text style={styles.emptyTitle}>Add your free news API key</Text>
          <Text style={styles.emptyBody}>
            Get a free key (no card needed) at gnews.io/register and paste it into{'\n'}
            src/config/apiKeys.ts as GNEWS_API_KEY.
          </Text>
        </View>
      ) : error ? (
        <View style={styles.center}>
          <Ionicons name="cloud-offline-outline" size={28} color={colors.textLight} />
          <Text style={styles.emptyTitle}>Couldn't load news</Text>
          <Text style={styles.emptyBody}>{error}</Text>
          <Pressable style={styles.retryButton} onPress={load}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </Pressable>
        </View>
      ) : (
        <FlatList
          data={articles}
          keyExtractor={(item, idx) => item.url || String(idx)}
          contentContainerStyle={{ padding: spacing.lg }}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          renderItem={({ item }) => (
            <Pressable
              style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
              onPress={() => item.url && Linking.openURL(item.url)}
            >
              {item.image ? (
                <Image source={{ uri: item.image }} style={styles.thumb} />
              ) : (
                <View style={[styles.thumb, styles.thumbFallback]}>
                  <Ionicons name="newspaper-outline" size={20} color={colors.primary} />
                </View>
              )}
              <View style={styles.cardTextWrap}>
                <Text style={styles.cardTitle} numberOfLines={3}>
                  {item.title}
                </Text>
                <Text style={styles.cardMeta}>
                  {item.sourceName}
                  {item.publishedAt ? `  ·  ${timeAgo(item.publishedAt)}` : ''}
                </Text>
              </View>
            </Pressable>
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
    backgroundColor: colors.background,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardPressed: { backgroundColor: colors.surface },
  thumb: { width: 64, height: 64, borderRadius: radius.md, backgroundColor: colors.surface },
  thumbFallback: { alignItems: 'center', justifyContent: 'center' },
  cardTextWrap: { flex: 1, marginLeft: spacing.md, justifyContent: 'center' },
  cardTitle: { fontFamily: fonts.semiBold, fontSize: 13.5, color: colors.text, lineHeight: 18 },
  cardMeta: { fontFamily: fonts.regular, fontSize: 11, color: colors.textMuted, marginTop: 6 },
});
