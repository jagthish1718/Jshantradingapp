import { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColors } from '../context/ThemeContext';
import type { ThemeColors } from '../theme/colors';
import { spacing, radius, fonts } from '../theme/spacing';
import { lessons } from '../data/lessons';
import { lessonImages } from '../data/lessonImages';
import { useLanguage } from '../context/LanguageContext';
import CoachAvatar from '../components/CoachAvatar';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { LessonsStackParamList } from '../navigation/types';
import type { LangCode } from '../data/languages';

type Props = NativeStackScreenProps<LessonsStackParamList, 'LessonDetail'>;

function t(field: Partial<Record<LangCode, string>> | undefined, language: LangCode): string {
  return field?.[language] ?? field?.en ?? '';
}

export default function LessonDetailScreen({ route, navigation }: Props) {
  const colors = useThemeColors();
  const styles = makeStyles(colors);
  const { lessonId } = route.params;
  const lesson = lessons.find((l) => l.id === lessonId);
  const [done, setDone] = useState(false);
  const { language } = useLanguage();

  if (!lesson) {
    return (
      <View style={styles.container}>
        <Text>Lesson not found.</Text>
      </View>
    );
  }

  const title = t(lesson.title, language);
  const opener = t(lesson.opener, language);
  const realStorySubtitle = t(lesson.realStorySubtitle, language);
  const realStoryBody = t(lesson.realStoryBody, language);
  const body = t(lesson.body, language);
  const keyTakeaway = t(lesson.keyTakeaway, language);
  const quote = t(lesson.quote, language);
  const coachNote = t(lesson.coachNote, language);
  const chartImages = lessonImages[lesson.id] ?? [];

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: spacing.lg }}>
      <Text style={[styles.tierLabel, { color: colors.tierColors[lesson.tier] }]}>
        {lesson.tier.toUpperCase()} · LESSON {String(lesson.id).padStart(2, '0')}
      </Text>

      <Text style={styles.title}>{title}</Text>

      <View style={styles.divider} />

      {!!opener && <Text style={styles.body}>{opener}</Text>}

      {!!realStoryBody && (
        <View style={styles.storyCard}>
          <View style={styles.storyLabelRow}>
            <Ionicons name="book-outline" size={14} color={colors.primary} />
            <Text style={styles.storyLabel}>A REAL STORY</Text>
          </View>
          {!!realStorySubtitle && <Text style={styles.storySubtitle}>{realStorySubtitle}</Text>}
          <Text style={styles.storyBody}>{realStoryBody}</Text>
        </View>
      )}

      {!!body && <Text style={styles.body}>{body}</Text>}

      {chartImages.map((img, i) => (
        <View key={i} style={styles.chartCard}>
          <Image source={img.source} style={styles.chartImage} resizeMode="contain" />
          <Text style={styles.chartCaption}>{img.caption}</Text>
        </View>
      ))}

      {!!keyTakeaway && (
        <View style={styles.takeawayCard}>
          <View style={styles.storyLabelRow}>
            <Ionicons name="bulb-outline" size={14} color={colors.gold} />
            <Text style={[styles.storyLabel, { color: colors.gold }]}>KEY TAKEAWAY</Text>
          </View>
          <Text style={styles.takeawayBody}>{keyTakeaway}</Text>
        </View>
      )}

      {!!quote && (
        <View style={styles.quoteCard}>
          <Ionicons name="chatbox-ellipses-outline" size={18} color={colors.textLight} />
          <Text style={styles.quoteText}>“{quote}”</Text>
          {!!lesson.quoteAuthor && <Text style={styles.quoteAuthor}>— {lesson.quoteAuthor}</Text>}
        </View>
      )}

      {!!coachNote && (
        <View style={styles.coachNoteCard}>
          <CoachAvatar size={28} />
          <View style={{ flex: 1 }}>
            <Text style={styles.coachNoteLabel}>COACH'S NOTE</Text>
            <Text style={styles.coachNoteBody}>{coachNote}</Text>
          </View>
        </View>
      )}

      {lesson.quiz.length > 0 && (
        <Pressable
          style={styles.quizButton}
          onPress={() => navigation.navigate('LessonQuiz', { lessonId: lesson.id })}
        >
          <Ionicons name="help-circle-outline" size={20} color="#fff" />
          <View style={{ flex: 1 }}>
            <Text style={styles.quizButtonTitle}>Take this lesson's quiz</Text>
            <Text style={styles.quizButtonSubtitle}>{lesson.quiz.length} questions · test yourself</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#fff" />
        </Pressable>
      )}

      <Pressable
        style={[styles.doneButton, done && styles.doneButtonActive]}
        onPress={() => setDone((d) => !d)}
      >
        <Ionicons
          name={done ? 'checkmark-circle' : 'checkmark-circle-outline'}
          size={19}
          color={done ? '#fff' : colors.primary}
        />
        <Text style={[styles.doneButtonText, done && styles.doneButtonTextActive]}>
          {done ? 'Marked as complete' : 'Mark as complete'}
        </Text>
      </Pressable>

      <Pressable
        style={styles.coachButton}
        onPress={() => navigation.navigate('AskDoubt', { lessonId: lesson.id, lessonTitle: title })}
      >
        <CoachAvatar size={34} />
        <View style={{ flex: 1 }}>
          <Text style={styles.coachButtonTitle}>Guidance & doubts</Text>
          <Text style={styles.coachButtonSubtitle}>Ask AI Coach about this lesson</Text>
        </View>
        <Ionicons name="chevron-forward" size={18} color={colors.textLight} />
      </Pressable>
    </ScrollView>
  );
}

const makeStyles = (colors: ThemeColors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  tierLabel: {
    fontFamily: fonts.semiBold,
    fontSize: 11.5,
    letterSpacing: 0.6,
    marginBottom: spacing.sm,
  },
  title: { fontFamily: fonts.bold, fontSize: 22, color: colors.text, lineHeight: 29 },
  divider: { height: 1, backgroundColor: colors.divider, marginVertical: spacing.lg },
  body: { fontFamily: fonts.regular, fontSize: 15.5, lineHeight: 25, color: colors.text, marginBottom: spacing.lg },
  storyLabelRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: spacing.sm },
  storyLabel: {
    fontFamily: fonts.semiBold,
    fontSize: 11,
    letterSpacing: 0.6,
    color: colors.primary,
  },
  storyCard: {
    backgroundColor: colors.primaryLight,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  storySubtitle: {
    fontFamily: fonts.semiBold,
    fontSize: 14.5,
    color: colors.text,
    marginBottom: spacing.xs,
    lineHeight: 20,
  },
  storyBody: { fontFamily: fonts.regular, fontSize: 14.5, lineHeight: 22, color: colors.text },
  chartCard: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  chartImage: { width: '100%', height: 190 },
  chartCaption: {
    fontFamily: fonts.medium,
    fontSize: 12,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
  takeawayCard: {
    backgroundColor: colors.goldBg,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  takeawayBody: { fontFamily: fonts.medium, fontSize: 14.5, lineHeight: 22, color: colors.text },
  quoteCard: {
    borderLeftWidth: 3,
    borderLeftColor: colors.border,
    paddingLeft: spacing.md,
    marginBottom: spacing.lg,
  },
  quoteText: {
    fontFamily: fonts.regular,
    fontSize: 15,
    fontStyle: 'italic',
    color: colors.textMuted,
    lineHeight: 22,
    marginTop: spacing.xs,
  },
  quoteAuthor: {
    fontFamily: fonts.medium,
    fontSize: 12.5,
    color: colors.textLight,
    marginTop: spacing.xs,
  },
  coachNoteCard: {
    flexDirection: 'row',
    gap: spacing.sm,
    backgroundColor: colors.tealBg,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  coachNoteLabel: {
    fontFamily: fonts.semiBold,
    fontSize: 11,
    letterSpacing: 0.6,
    color: colors.teal,
    marginBottom: 4,
  },
  coachNoteBody: { fontFamily: fonts.regular, fontSize: 14, lineHeight: 21, color: colors.text },
  quizButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.primary,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  quizButtonTitle: { fontFamily: fonts.semiBold, fontSize: 14.5, color: '#fff' },
  quizButtonSubtitle: { fontFamily: fonts.regular, fontSize: 12, color: 'rgba(255,255,255,0.85)', marginTop: 1 },
  doneButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingVertical: 13,
    marginBottom: spacing.md,
  },
  doneButtonActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  doneButtonText: { fontFamily: fonts.semiBold, fontSize: 14.5, color: colors.primary },
  doneButtonTextActive: { color: '#fff' },
  coachButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.purpleBg,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.xxl,
  },
  coachButtonTitle: { fontFamily: fonts.semiBold, fontSize: 14, color: colors.text },
  coachButtonSubtitle: { fontFamily: fonts.regular, fontSize: 12, color: colors.textMuted, marginTop: 1 },
});
