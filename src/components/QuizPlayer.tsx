import { useState } from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColors } from '../context/ThemeContext';
import type { ThemeColors } from '../theme/colors';
import { spacing, radius, fonts } from '../theme/spacing';
import { resolveQuizText, resolveQuizOptions } from '../data/quiz';
import type { QuizQuestion } from '../data/quiz';
import type { LangCode } from '../data/languages';

const LETTERS = ['A', 'B', 'C', 'D'];

interface Props {
  questions: QuizQuestion[];
  language: LangCode;
  onFinish: (score: number, total: number) => void;
}

// Shared interactive question-by-question quiz UI. Used by the Daily Quiz
// (a rotating 10-question pick from the full pool) and by each lesson's own
// end-of-lesson quiz — same look, different question sets.
export default function QuizPlayer({ questions, language, onFinish }: Props) {
  const colors = useThemeColors();
  const styles = makeStyles(colors);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);

  const question = questions[index];
  const options = resolveQuizOptions(question.options, language);

  const onSelect = (optionIndex: number) => {
    if (selected !== null) return;
    setSelected(optionIndex);
    if (optionIndex === question.correctIndex) setScore((s) => s + 1);
  };

  const onNext = () => {
    if (index + 1 < questions.length) {
      setIndex(index + 1);
      setSelected(null);
    } else {
      onFinish(score, questions.length);
    }
  };

  return (
    <View style={styles.root}>
      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${(index / questions.length) * 100}%` }]} />
      </View>
      <Text style={styles.progressLabel}>
        Question {index + 1} of {questions.length}
      </Text>

      <ScrollView contentContainerStyle={{ paddingTop: spacing.md, paddingBottom: spacing.xl }}>
        <Text style={styles.question}>{resolveQuizText(question.question, language)}</Text>

        {options.map((option, i) => {
          const isCorrect = i === question.correctIndex;
          const isSelected = i === selected;
          let border = colors.border;
          let bg = colors.background;
          if (selected !== null) {
            if (isCorrect) {
              border = colors.success;
              bg = colors.successBg;
            } else if (isSelected) {
              border = colors.danger;
              bg = colors.dangerBg;
            }
          }
          return (
            <Pressable
              key={i}
              style={[styles.option, { backgroundColor: bg, borderColor: border }]}
              onPress={() => onSelect(i)}
            >
              <Text
                style={[
                  styles.optionLetter,
                  selected !== null && isCorrect && { color: colors.success },
                  selected !== null && isSelected && !isCorrect && { color: colors.danger },
                ]}
              >
                {LETTERS[i]}
              </Text>
              <Text style={styles.optionText}>{option}</Text>
              {selected !== null && isCorrect && (
                <Ionicons name="checkmark-circle" size={18} color={colors.success} />
              )}
              {selected !== null && isSelected && !isCorrect && (
                <Ionicons name="close-circle" size={18} color={colors.danger} />
              )}
            </Pressable>
          );
        })}

        {selected !== null && (
          <View style={styles.explanationBox}>
            <Text style={styles.explanationLabel}>EXPLANATION</Text>
            <Text style={styles.explanationText}>
              {resolveQuizText(question.explanation, language)}
            </Text>
            <Pressable style={styles.nextButton} onPress={onNext}>
              <Text style={styles.nextButtonText}>
                {index + 1 < questions.length ? 'Next question' : 'See result'}
              </Text>
              <Ionicons name="arrow-forward" size={16} color="#fff" />
            </Pressable>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const makeStyles = (colors: ThemeColors) => StyleSheet.create({
  root: { flex: 1 },
  progressTrack: { height: 4, backgroundColor: colors.divider, borderRadius: radius.pill, overflow: 'hidden' },
  progressFill: { height: 4, backgroundColor: colors.primary, borderRadius: radius.pill },
  progressLabel: { fontFamily: fonts.regular, fontSize: 12, color: colors.textMuted, marginTop: spacing.sm },
  question: { fontFamily: fonts.semiBold, fontSize: 17, color: colors.text, marginBottom: spacing.lg, lineHeight: 24 },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    gap: spacing.sm,
  },
  optionLetter: { fontFamily: fonts.bold, fontSize: 13, color: colors.textLight, width: 18 },
  optionText: { fontFamily: fonts.regular, fontSize: 14.5, color: colors.text, flex: 1 },
  explanationBox: {
    marginTop: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
  },
  explanationLabel: {
    fontFamily: fonts.semiBold,
    fontSize: 11,
    color: colors.textMuted,
    letterSpacing: 0.6,
    marginBottom: 6,
  },
  explanationText: { fontFamily: fonts.regular, fontSize: 14, color: colors.text, lineHeight: 21, marginBottom: spacing.md },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    paddingVertical: 13,
  },
  nextButtonText: { fontFamily: fonts.semiBold, color: '#fff', fontSize: 14.5 },
});
