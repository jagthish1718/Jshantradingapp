import { useState } from 'react';
import { StyleSheet, Text, View, Pressable, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColors } from '../context/ThemeContext';
import type { ThemeColors } from '../theme/colors';
import { spacing, radius, fonts } from '../theme/spacing';
import { lessons } from '../data/lessons';
import { useLanguage } from '../context/LanguageContext';
import QuizPlayer from '../components/QuizPlayer';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { LessonsStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<LessonsStackParamList, 'LessonQuiz'>;

export default function LessonQuizScreen({ route, navigation }: Props) {
  const colors = useThemeColors();
  const styles = makeStyles(colors);
  const { lessonId } = route.params;
  const lesson = lessons.find((l) => l.id === lessonId);
  const { language } = useLanguage();
  const [result, setResult] = useState<{ score: number; total: number } | null>(null);

  if (!lesson) {
    return (
      <View style={styles.container}>
        <Text>Lesson not found.</Text>
      </View>
    );
  }

  const questions = lesson.quiz.map((q) => ({ ...q, lessonId: lesson.id }));
  const title = lesson.title[language] ?? lesson.title.en ?? '';

  if (result) {
    const pct = Math.round((result.score / result.total) * 100);
    const passed = pct >= 60;
    return (
      <SafeAreaView style={styles.resultRoot}>
        <View style={[styles.resultBadge, passed && styles.resultBadgePassed]}>
          <Ionicons
            name={passed ? 'checkmark-circle' : 'refresh-circle-outline'}
            size={36}
            color={passed ? colors.success : colors.text}
          />
        </View>
        <Text style={styles.resultTitle}>{passed ? 'Nice work!' : 'Keep practising'}</Text>
        <Text style={styles.resultScore}>
          {result.score} / {result.total} correct  ·  {pct}%
        </Text>
        <Pressable style={styles.primaryButton} onPress={() => navigation.goBack()}>
          <Text style={styles.primaryButtonText}>Back to lesson</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={18} color="#fff" />
        </Pressable>
        <View style={{ flex: 1, marginLeft: spacing.sm }}>
          <Text style={styles.headerTitle} numberOfLines={1}>Lesson Quiz</Text>
          <Text style={styles.headerSubtitle} numberOfLines={1}>{title}</Text>
        </View>
      </View>
      <View style={{ flex: 1, paddingHorizontal: spacing.lg }}>
        <QuizPlayer
          questions={questions}
          language={language}
          onFinish={(score, total) => setResult({ score, total })}
        />
      </View>
    </SafeAreaView>
  );
}

const makeStyles = (colors: ThemeColors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
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
  headerTitle: { fontFamily: fonts.bold, fontSize: 17, color: '#fff' },
  headerSubtitle: { fontFamily: fonts.regular, fontSize: 12, color: 'rgba(255,255,255,0.8)', marginTop: 2 },
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
  resultBadgePassed: { borderColor: colors.success, backgroundColor: colors.successBg },
  resultTitle: { fontFamily: fonts.bold, fontSize: 21, color: colors.text, marginBottom: spacing.sm },
  resultScore: { fontFamily: fonts.regular, fontSize: 14.5, color: colors.textMuted, marginBottom: spacing.xl },
  primaryButton: {
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    paddingVertical: 13,
    paddingHorizontal: spacing.xxl,
  },
  primaryButtonText: { fontFamily: fonts.semiBold, color: '#fff', fontSize: 14.5 },
});
