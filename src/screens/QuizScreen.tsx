import { useState, useEffect, useMemo } from 'react';
import { StyleSheet, Text, View, Pressable, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColors } from '../context/ThemeContext';
import type { ThemeColors } from '../theme/colors';
import { spacing, radius, fonts } from '../theme/spacing';
import { getDailyQuiz } from '../data/quiz';
import { useLanguage } from '../context/LanguageContext';
import QuizPlayer from '../components/QuizPlayer';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { QuizStackParamList } from '../navigation/types';

const BEST_SCORE_KEY = 'nivesha:quiz:best_score';

type Props = NativeStackScreenProps<QuizStackParamList, 'QuizMain'>;

export default function QuizScreen({ navigation }: Props) {
  const colors = useThemeColors();
  const styles = makeStyles(colors);
  const { language } = useLanguage();
  // Same 10 questions for everyone today, a different 10 tomorrow — a real
  // "daily quiz" drawn from the full 258-question pool across all 50 lessons.
  const dailyQuiz = useMemo(() => getDailyQuiz(), []);
  const [result, setResult] = useState<{ score: number; total: number } | null>(null);
  const [playKey, setPlayKey] = useState(0);

  useEffect(() => {
    if (!result) return;
    (async () => {
      try {
        // Scaled to leaderboard's ~500-point range so a 10-Q session
        // contributes proportionally until real per-day scoring is wired up.
        const points = result.score * 10;
        const raw = await AsyncStorage.getItem(BEST_SCORE_KEY);
        const prevBest = raw ? parseInt(raw, 10) : 0;
        if (points > prevBest) {
          await AsyncStorage.setItem(BEST_SCORE_KEY, String(points));
        }
      } catch {
        // ignore
      }
    })();
  }, [result]);

  const restart = () => {
    setResult(null);
    setPlayKey((k) => k + 1);
  };

  if (result) {
    const pct = Math.round((result.score / result.total) * 100);
    return (
      <SafeAreaView style={styles.resultRoot}>
        <View style={styles.resultBadge}>
          <Ionicons name="trophy-outline" size={34} color={colors.text} />
        </View>
        <Text style={styles.resultTitle}>Quiz complete</Text>
        <Text style={styles.resultScore}>
          {result.score} / {result.total} correct  ·  {pct}%
        </Text>
        <Pressable style={styles.restartButton} onPress={restart}>
          <Text style={styles.restartButtonText}>Try again</Text>
        </Pressable>
        <Pressable style={styles.leaderboardLink} onPress={() => navigation.navigate('Leaderboard')}>
          <Ionicons name="podium-outline" size={16} color={colors.primary} />
          <Text style={styles.leaderboardLinkText}>View Leaderboard</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
        <View style={styles.headerTopRow}>
          <Text style={styles.headerTitle}>Daily Quiz</Text>
          <Pressable style={styles.leaderboardButton} onPress={() => navigation.navigate('Leaderboard')}>
            <Ionicons name="podium-outline" size={18} color="#fff" />
          </Pressable>
        </View>
        <Text style={styles.headerSubtitle}>10 fresh questions from the TradeWise course, every day</Text>
      </View>

      <View style={{ flex: 1, paddingHorizontal: spacing.lg }}>
        <QuizPlayer
          key={playKey}
          questions={dailyQuiz}
          language={language}
          onFinish={(score, total) => setResult({ score, total })}
        />
      </View>
    </SafeAreaView>
  );
}

const makeStyles = (colors: ThemeColors) => StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  header: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingTop: 54,
    paddingBottom: spacing.lg,
  },
  headerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: { fontFamily: fonts.bold, fontSize: 20, color: '#fff' },
  headerSubtitle: { fontFamily: fonts.regular, fontSize: 12.5, color: 'rgba(255,255,255,0.85)', marginTop: spacing.xs },
  leaderboardButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultRoot: { flex: 1, backgroundColor: colors.background, alignItems: 'center', justifyContent: 'center', padding: spacing.xl },
  resultBadge: {
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  resultTitle: { fontFamily: fonts.bold, fontSize: 21, color: colors.text, marginBottom: spacing.sm },
  resultScore: { fontFamily: fonts.regular, fontSize: 14.5, color: colors.textMuted, marginBottom: spacing.xl },
  restartButton: {
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    paddingVertical: 13,
    paddingHorizontal: spacing.xxl,
  },
  restartButtonText: { fontFamily: fonts.semiBold, color: '#fff', fontSize: 14.5 },
  leaderboardLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginTop: spacing.lg,
  },
  leaderboardLinkText: { fontFamily: fonts.semiBold, fontSize: 13.5, color: colors.primary },
});
