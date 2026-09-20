import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, Pressable, SafeAreaView, ScrollView, Animated, Easing } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColors } from '../context/ThemeContext';
import type { ThemeColors } from '../theme/colors';
import { spacing, radius, fonts } from '../theme/spacing';
import { languages, LangCode } from '../data/languages';
import { useLanguage } from '../context/LanguageContext';
import CoachAvatar from '../components/CoachAvatar';
import { getGreeting } from '../utils/greeting';

interface Slide {
  icon: keyof typeof Ionicons.glyphMap;
  iconBg: string;
  iconColor: string;
  title: string;
  body: string;
}

function getSlides(colors: ThemeColors): Slide[] {
  return [
  {
    icon: 'happy',
    iconBg: 'rgba(255,255,255,0.18)',
    iconColor: '#fff',
    title: '', // filled dynamically with a time-based greeting
    body: "I'll guide you through Niveshaa — learning to trade, step by step. Let me show you around.",
  },
  {
    icon: 'book',
    iconBg: colors.primaryLight,
    iconColor: colors.primary,
    title: 'Lessons',
    body: '50 structured lessons from Beginner to Advanced. Read at your pace, in your language, and mark each one complete.',
  },
  {
    icon: 'trophy',
    iconBg: colors.goldBg,
    iconColor: colors.gold,
    title: 'Daily Quiz & Leaderboard',
    body: "Test what you've learned with 10 questions a day, and see how you rank against other learners.",
  },
  {
    icon: 'checkmark-done',
    iconBg: colors.tealBg,
    iconColor: colors.teal,
    title: 'Daily Checklist',
    body: 'A simple daily routine — lesson, quiz, news, practice — to keep your learning consistent.',
  },
  {
    icon: 'chatbubbles',
    iconBg: colors.purpleBg,
    iconColor: colors.purple,
    title: 'Ask me anytime',
    body: "Stuck on something? Open any lesson and tap 'Ask AI Coach' for guidance and doubt clearing.",
  },
  {
    icon: 'flag',
    iconBg: colors.primaryLight,
    iconColor: colors.primary,
    title: 'Start learning today',
    body: "You've got 50 lessons, daily quizzes and your AI coach — everything you need to become a confident trader. Let's begin.",
  },
  ];
}

// Gentle continuous bob so the coach avatar feels alive, like a tutor
// standing there waiting to talk to you.
function useFloat() {
  const float = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(float, { toValue: 1, duration: 1400, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(float, { toValue: 0, duration: 1400, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [float]);
  return float.interpolate({ inputRange: [0, 1], outputRange: [0, -8] });
}


export default function OnboardingScreen({ onDone }: { onDone: () => void }) {
  const colors = useThemeColors();
  const styles = makeStyles(colors);
  const slides = getSlides(colors);
  const [step, setStep] = useState(0);
  const { language, setLanguage } = useLanguage();
  const isLast = step === slides.length;

  const floatY = useFloat();
  const slide = slides[Math.min(step, slides.length - 1)];

  // Entrance animation for each slide's icon + text.
  const iconAnim = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const textY = useRef(new Animated.Value(14)).current;

  useEffect(() => {
    iconAnim.setValue(0);
    textOpacity.setValue(0);
    textY.setValue(14);
    Animated.sequence([
      Animated.spring(iconAnim, { toValue: 1, friction: 5, tension: 60, useNativeDriver: true }),
      Animated.parallel([
        Animated.timing(textOpacity, { toValue: 1, duration: 320, useNativeDriver: true }),
        Animated.timing(textY, { toValue: 0, duration: 320, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      ]),
    ]).start();
  }, [step]);

  const next = () => {
    if (step < slides.length) setStep(step + 1);
  };

  if (isLast) {
    return (
      <SafeAreaView style={styles.root}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.langScrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View>
            <Text style={styles.langTitle}>Choose your language</Text>
            <Text style={styles.langSubtitle}>You can change this anytime from the Lessons tab.</Text>

            <View style={styles.langGrid}>
              {languages.map((l) => {
                const active = l.code === language;
                return (
                  <Pressable
                    key={l.code}
                    disabled={!l.available}
                    onPress={() => setLanguage(l.code as LangCode)}
                    style={[
                      styles.langOption,
                      active && styles.langOptionActive,
                      !l.available && styles.langOptionDisabled,
                    ]}
                  >
                    <Text style={[styles.langOptionText, active && styles.langOptionTextActive]}>
                      {l.nativeLabel}
                    </Text>
                    {!l.available && <Text style={styles.soonTag}>Soon</Text>}
                    {active && <Ionicons name="checkmark-circle" size={16} color={colors.primary} />}
                  </Pressable>
                );
              })}
            </View>
          </View>
        </ScrollView>

        <Pressable style={styles.ctaButton} onPress={onDone}>
          <Text style={styles.ctaButtonText}>Get Started</Text>
          <Ionicons name="arrow-forward" size={18} color="#fff" />
        </Pressable>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.rootColor}>
      <SafeAreaView style={{ flex: 1 }}>
        <Pressable style={styles.skip} onPress={() => setStep(slides.length)}>
          <Text style={styles.skipText}>Skip</Text>
        </Pressable>

        <View style={styles.slideBody}>
          <Animated.View
            style={[
              step === 0 ? styles.logoWrap : styles.iconWrap,
              step !== 0 && { backgroundColor: slide.iconBg },
              {
                transform: [
                  { translateY: floatY },
                  { scale: iconAnim },
                ],
              },
            ]}
          >
            {step === 0 ? (
              <CoachAvatar size={198} />
            ) : (
              <Ionicons name={slide.icon} size={36} color={slide.iconColor} />
            )}
          </Animated.View>

          <Animated.View style={{ opacity: textOpacity, transform: [{ translateY: textY }] }}>
            <Text style={styles.slideTitle}>{step === 0 ? `${getGreeting()}, I'm your AI Coach` : slide.title}</Text>
            <Text style={styles.slideBodyText}>{slide.body}</Text>
          </Animated.View>
        </View>

        <View style={styles.dots}>
          {slides.map((_, i) => (
            <View key={i} style={[styles.dot, i === step && styles.dotActive]} />
          ))}
        </View>

        <Pressable style={styles.nextButton} onPress={next}>
          <Text style={styles.nextButtonText}>{step === slides.length - 1 ? "Let's go" : 'Next'}</Text>
          <Ionicons name="arrow-forward" size={18} color={colors.primary} />
        </Pressable>
      </SafeAreaView>
    </View>
  );
}

const makeStyles = (colors: ThemeColors) => StyleSheet.create({
  rootColor: { flex: 1, backgroundColor: colors.primary },
  root: { flex: 1, backgroundColor: colors.background, padding: spacing.xl },
  skip: { alignSelf: 'flex-end', paddingHorizontal: spacing.lg, paddingTop: spacing.sm },
  skipText: { fontFamily: fonts.medium, fontSize: 13, color: 'rgba(255,255,255,0.75)' },
  slideBody: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: spacing.xxl },
  iconWrap: {
    width: 88,
    height: 88,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
  },
  logoWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
  },
  slideTitle: { fontFamily: fonts.displayBold, fontSize: 24, color: '#fff', textAlign: 'center', marginBottom: spacing.sm },
  slideBodyText: {
    fontFamily: fonts.regular,
    fontSize: 14.5,
    color: 'rgba(255,255,255,0.85)',
    textAlign: 'center',
    lineHeight: 22,
  },
  dots: { flexDirection: 'row', justifyContent: 'center', gap: 6, marginBottom: spacing.xl },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.3)' },
  dotActive: { backgroundColor: '#fff', width: 18 },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    backgroundColor: '#fff',
    marginHorizontal: spacing.xl,
    marginBottom: spacing.xl,
    borderRadius: radius.md,
    paddingVertical: 14,
  },
  nextButtonText: { fontFamily: fonts.semiBold, fontSize: 15, color: colors.primary },

  langScrollContent: { flexGrow: 1, justifyContent: 'center' },
  langTitle: { fontFamily: fonts.displayBold, fontSize: 23, color: colors.text, marginBottom: spacing.xs },
  langSubtitle: { fontFamily: fonts.regular, fontSize: 13, color: colors.textMuted, marginBottom: spacing.xl },
  langGrid: { gap: spacing.sm },
  langOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingVertical: 14,
    paddingHorizontal: spacing.lg,
  },
  langOptionActive: { borderColor: colors.primary, backgroundColor: colors.primaryLight },
  langOptionDisabled: { opacity: 0.5 },
  langOptionText: { fontFamily: fonts.medium, fontSize: 15, color: colors.text, flex: 1 },
  langOptionTextActive: { fontFamily: fonts.semiBold, color: colors.primary },
  soonTag: { fontFamily: fonts.regular, fontSize: 11, color: colors.textLight },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    paddingVertical: 15,
    marginTop: spacing.xl,
  },
  ctaButtonText: { fontFamily: fonts.semiBold, fontSize: 15, color: '#fff' },
});
