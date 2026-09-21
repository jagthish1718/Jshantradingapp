import { useEffect, useState, useCallback } from 'react';
import { StyleSheet, Text, View, FlatList, RefreshControl, Pressable } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColors } from '../context/ThemeContext';
import type { ThemeColors } from '../theme/colors';
import { spacing, radius, fonts } from '../theme/spacing';
import { sampleLeaderboard } from '../data/leaderboard';
import { useAuth } from '../context/AuthContext';
import { fetchTopScores, fetchMyRow, LeaderboardRow } from '../services/leaderboardApi';

const YOUR_BEST_KEY = 'nivesha:quiz:best_score';

const medalColors: Record<number, string> = {
  0: '#D4A537',
  1: '#9AA3B2',
  2: '#B0703A',
};

type Row = { key: string; name: string; score: number; isYou: boolean };

export default function LeaderboardScreen() {
  const colors = useThemeColors();
  const styles = makeStyles(colors);
  const navigation = useNavigation<any>();
  const { user } = useAuth();

  const [yourBest, setYourBest] = useState(0);
  const [serverRows, setServerRows] = useState<LeaderboardRow[] | null>(null);
  const [serverError, setServerError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadLocalBest = useCallback(async () => {
    try {
      const raw = await AsyncStorage.getItem(YOUR_BEST_KEY);
      setYourBest(raw ? parseInt(raw, 10) : 0);
    } catch {
      // ignore
    }
  }, []);

  // The real, shared leaderboard — only meaningful once signed in, since
  // that's what a score is tied to (see quiz_leaderboard's RLS). Signed-out
  // players still see the sample board + their own local best below, with
  // a nudge to sign in and actually appear on it.
  const loadServer = useCallback(async () => {
    if (!user) {
      setServerRows(null);
      setServerError(false);
      return;
    }
    setServerError(false);
    try {
      const [top, mine] = await Promise.all([fetchTopScores(50), fetchMyRow(user.id)]);
      // Make sure your own row is present even if you're outside the top 50.
      const merged = mine && !top.some((r) => r.user_id === mine.user_id) ? [...top, mine] : top;
      setServerRows(merged);
    } catch {
      // Most likely cause during setup: the quiz_leaderboard table/RLS
      // hasn't been created in Supabase yet. Fall back quietly rather than
      // breaking the whole screen.
      setServerError(true);
      setServerRows(null);
    }
  }, [user]);

  const loadAll = useCallback(async () => {
    await Promise.all([loadLocalBest(), loadServer()]);
    setLoading(false);
  }, [loadLocalBest, loadServer]);

  useFocusEffect(
    useCallback(() => {
      loadAll();
    }, [loadAll])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await loadAll();
    setRefreshing(false);
  };

  const usingServerData = !!user && !!serverRows;

  const rows: Row[] = usingServerData
    ? serverRows!
        .map((r) => ({
          key: r.user_id,
          name: r.user_id === user!.id ? 'You' : r.display_name || 'Trader',
          score: r.best_score,
          isYou: r.user_id === user!.id,
        }))
        .sort((a, b) => b.score - a.score)
    : [...sampleLeaderboard.map((e, i) => ({ key: `sample-${i}`, name: e.name, score: e.score, isYou: false })), { key: 'you-local', name: 'You', score: yourBest, isYou: true }].sort(
        (a, b) => b.score - a.score
      );

  return (
    <View style={styles.container}>
      <FlatList
        data={rows}
        keyExtractor={(item) => item.key}
        contentContainerStyle={{ padding: spacing.lg }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />}
        renderItem={({ item, index }) => (
          <View style={[styles.row, item.isYou && styles.rowYou]}>
            <View style={styles.rankWrap}>
              {index < 3 ? (
                <Ionicons name="medal" size={18} color={medalColors[index]} />
              ) : (
                <Text style={styles.rankText}>{index + 1}</Text>
              )}
            </View>
            <Text style={[styles.name, item.isYou && styles.nameYou]} numberOfLines={1}>
              {item.name}
            </Text>
            <Text style={[styles.score, item.isYou && styles.nameYou]}>{item.score}</Text>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={styles.divider} />}
        ListHeaderComponent={
          !loading ? (
            usingServerData ? (
              <Text style={styles.note}>Live leaderboard — synced from everyone's best daily-quiz score.</Text>
            ) : (
              <Pressable
                style={styles.signInBanner}
                onPress={() => navigation.getParent()?.navigate('ProfileTab', { screen: 'Auth', params: { mode: 'signup' } })}
              >
                <Ionicons name="log-in-outline" size={16} color={colors.primary} />
                <Text style={styles.signInBannerText}>
                  {serverError
                    ? "Couldn't load the live leaderboard right now — showing a sample. Pull to refresh to retry."
                    : 'Sample leaderboard. Sign in to sync your score and appear on the real one.'}
                </Text>
              </Pressable>
            )
          ) : null
        }
      />
    </View>
  );
}

const makeStyles = (colors: ThemeColors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  note: { fontFamily: fonts.regular, fontSize: 12, color: colors.textMuted, marginBottom: spacing.md },
  signInBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.primaryLight,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  signInBannerText: { flex: 1, fontFamily: fonts.medium, fontSize: 12, color: colors.primary, lineHeight: 17 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm + 2,
  },
  rowYou: { backgroundColor: colors.primaryLight, borderRadius: radius.md, paddingHorizontal: spacing.sm },
  rankWrap: { width: 28, alignItems: 'center' },
  rankText: { fontFamily: fonts.semiBold, fontSize: 13, color: colors.textMuted },
  name: { fontFamily: fonts.medium, fontSize: 14.5, color: colors.text, flex: 1, marginLeft: spacing.sm },
  nameYou: { color: colors.primary, fontFamily: fonts.bold },
  score: { fontFamily: fonts.semiBold, fontSize: 14.5, color: colors.text },
  divider: { height: 1, backgroundColor: colors.divider, marginLeft: 28 },
});
