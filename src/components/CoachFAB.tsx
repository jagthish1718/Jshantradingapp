import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Platform, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CoachAvatar from './CoachAvatar';
import { useCoachModal } from '../context/CoachModalContext';
import { useLanguage } from '../context/LanguageContext';
import { useThemeColors } from '../context/ThemeContext';
import type { ThemeColors } from '../theme/colors';
import { fonts, radius, spacing } from '../theme/spacing';
import { STORAGE_KEYS } from '../utils/storage';
import type { LangCode } from '../data/languages';

const INTRO_TEXT: Partial<Record<LangCode, string>> = {
  en: "Hi! I'm your AI Coach 👋 Tap me anytime you have a doubt.",
  ta: 'வணக்கம்! நான் உங்க AI கோச் 👋 சந்தேகம் இருந்தா என்னை tap பண்ணுங்க.',
  hi: 'नमस्ते! मैं आपका AI कोच हूँ 👋 कोई भी doubt हो तो मुझे टैप करें।',
};

// A persistent floating chat bubble, reachable from every tab, that opens
// the general AI Coach chat. Sits just above the bottom tab bar. Until the
// user has ever interacted with it, it also shows a small red dot + a
// speech-bubble self-introduction (in the user's chosen app language) —
// no auto-hide timer, so it can't be missed by testing/navigating slowly.
// It disappears for good the first time the user taps the bubble or the FAB.
export default function CoachFAB() {
  const colors = useThemeColors();
  const styles = makeStyles(colors);
  const { openCoach } = useCoachModal();
  const { language } = useLanguage();
  const [introSeen, setIntroSeen] = useState<boolean | null>(null); // null = not loaded yet

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEYS.coachIntroSeen)
      .then((seen) => setIntroSeen(seen === 'true'))
      .catch(() => setIntroSeen(false));
  }, []);

  const showIntro = introSeen === false;

  const dismissIntro = () => {
    if (introSeen === false) {
      AsyncStorage.setItem(STORAGE_KEYS.coachIntroSeen, 'true').catch(() => {});
      setIntroSeen(true);
    }
  };

  const introText = INTRO_TEXT[language] ?? INTRO_TEXT.en;

  return (
    <>
      {showIntro && (
        <Pressable
          style={styles.speech}
          onPress={() => {
            dismissIntro();
            openCoach();
          }}
        >
          <Text style={styles.speechText}>{introText}</Text>
        </Pressable>
      )}
      <Pressable
        style={({ pressed }) => [styles.fab, pressed && styles.fabPressed]}
        onPress={() => {
          dismissIntro();
          openCoach();
        }}
        hitSlop={6}
      >
        <CoachAvatar size={40} />
        {showIntro && <View style={styles.badge} />}
      </Pressable>
    </>
  );
}

const makeStyles = (colors: ThemeColors) => StyleSheet.create({
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 76,
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.18,
        shadowRadius: 8,
      },
      android: { elevation: 6 },
    }),
  },
  fabPressed: { opacity: 0.85 },
  badge: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: colors.danger,
    borderWidth: 2,
    borderColor: colors.background,
  },
  speech: {
    position: 'absolute',
    right: 12,
    bottom: 142,
    maxWidth: 220,
    backgroundColor: colors.text,
    borderRadius: radius.lg,
    paddingVertical: spacing.sm + 2,
    paddingHorizontal: spacing.md,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
      },
      android: { elevation: 6 },
    }),
  },
  speechText: { color: '#fff', fontFamily: fonts.medium, fontSize: 12.5, lineHeight: 18 },
});
