import { useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, Platform, Text, View, PanResponder, Dimensions } from 'react-native';
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

const FAB_SIZE = 58;
const EDGE_MARGIN = 10;
// Same clearance the old fixed bottom:76 gave it above the tab bar -- kept
// as the starting spot so it opens in the familiar place on first launch.
const DEFAULT_BOTTOM_GAP = 76;

function defaultPosition() {
  const { width, height } = Dimensions.get('window');
  return { x: width - FAB_SIZE - 16, y: height - FAB_SIZE - DEFAULT_BOTTOM_GAP };
}

function clampPosition(pos: { x: number; y: number }) {
  const { width, height } = Dimensions.get('window');
  return {
    x: Math.min(Math.max(EDGE_MARGIN, pos.x), width - FAB_SIZE - EDGE_MARGIN),
    y: Math.min(Math.max(40, pos.y), height - FAB_SIZE - EDGE_MARGIN),
  };
}

// A persistent floating chat bubble, reachable from every tab, that opens
// the general AI Coach chat. Draggable -- some screens (like a full-screen
// chart with its own toolbar) have their own busy bottom area, so the
// bubble can be dragged out of the way anywhere on screen; its position is
// remembered (AsyncStorage) across app opens. A real drag is distinguished
// from a tap by movement distance, so tapping it without moving still
// opens the coach normally. Until the user has ever interacted with it, it
// also shows a small red dot + a speech-bubble self-introduction (in the
// user's chosen app language) -- no auto-hide timer, so it can't be missed
// by testing/navigating slowly. It disappears for good the first time the
// user taps the bubble or the FAB.
export default function CoachFAB() {
  const colors = useThemeColors();
  const styles = makeStyles(colors);
  const { openCoach } = useCoachModal();
  const { language } = useLanguage();
  const [introSeen, setIntroSeen] = useState<boolean | null>(null); // null = not loaded yet
  const [pos, setPos] = useState(defaultPosition);
  const dragStartRef = useRef(pos);
  const draggedRef = useRef(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEYS.coachIntroSeen)
      .then((seen) => setIntroSeen(seen === 'true'))
      .catch(() => setIntroSeen(false));
    AsyncStorage.getItem(STORAGE_KEYS.coachFabPosition)
      .then((raw) => {
        if (!raw) return;
        try {
          const saved = JSON.parse(raw);
          if (typeof saved?.x === 'number' && typeof saved?.y === 'number') {
            setPos(clampPosition(saved));
          }
        } catch {
          // ignore corrupt saved position, keep the default
        }
      })
      .catch(() => {});
  }, []);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      // Only claim the gesture once the finger has actually moved -- a
      // plain tap never gets claimed here, so Pressable's own onPress
      // still fires normally for a tap.
      onMoveShouldSetPanResponder: (_evt, gesture) => Math.abs(gesture.dx) > 4 || Math.abs(gesture.dy) > 4,
      onPanResponderGrant: () => {
        dragStartRef.current = pos;
        draggedRef.current = false;
      },
      onPanResponderMove: (_evt, gesture) => {
        if (Math.abs(gesture.dx) > 4 || Math.abs(gesture.dy) > 4) draggedRef.current = true;
        setPos(clampPosition({ x: dragStartRef.current.x + gesture.dx, y: dragStartRef.current.y + gesture.dy }));
      },
      onPanResponderRelease: () => {
        setPos((p) => {
          const final = clampPosition(p);
          AsyncStorage.setItem(STORAGE_KEYS.coachFabPosition, JSON.stringify(final)).catch(() => {});
          return final;
        });
      },
    })
  ).current;

  const showIntro = introSeen === false;

  const dismissIntro = () => {
    if (introSeen === false) {
      AsyncStorage.setItem(STORAGE_KEYS.coachIntroSeen, 'true').catch(() => {});
      setIntroSeen(true);
    }
  };

  const handlePress = () => {
    // A drag's release also fires a synthetic press in some cases -- swallow
    // it once so a reposition never accidentally opens the coach too.
    if (draggedRef.current) {
      draggedRef.current = false;
      return;
    }
    dismissIntro();
    openCoach();
  };

  const introText = INTRO_TEXT[language] ?? INTRO_TEXT.en;
  const screenWidth = Dimensions.get('window').width;

  return (
    <>
      {showIntro && (
        <Pressable
          style={[
            styles.speech,
            { left: Math.max(12, Math.min(pos.x - 80, screenWidth - 232)), top: Math.max(40, pos.y - 72) },
          ]}
          onPress={handlePress}
        >
          <Text style={styles.speechText}>{introText}</Text>
        </Pressable>
      )}
      <View style={[styles.fabWrap, { left: pos.x, top: pos.y }]} {...panResponder.panHandlers}>
        <Pressable style={({ pressed }) => [styles.fab, pressed && styles.fabPressed]} onPress={handlePress} hitSlop={6}>
          <CoachAvatar size={40} />
          {showIntro && <View style={styles.badge} />}
        </Pressable>
      </View>
    </>
  );
}

const makeStyles = (colors: ThemeColors) => StyleSheet.create({
  fabWrap: {
    position: 'absolute',
    width: FAB_SIZE,
    height: FAB_SIZE,
  },
  fab: {
    width: FAB_SIZE,
    height: FAB_SIZE,
    borderRadius: FAB_SIZE / 2,
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
