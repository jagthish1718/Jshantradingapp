import { useState, useRef, useMemo } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColors } from '../context/ThemeContext';
import type { ThemeColors } from '../theme/colors';
import { spacing, radius, fonts } from '../theme/spacing';
import CoachAvatar from './CoachAvatar';
import { getGreeting } from '../utils/greeting';
import { lessons } from '../data/lessons';
import { useLanguage } from '../context/LanguageContext';
import type { LangCode } from '../data/languages';
import { askCoach, ApiKeyMissingError, CoachApiError, ChatTurn } from '../services/aiCoach';

interface ChatMessage {
  id: string;
  from: 'coach' | 'you';
  text: string;
}

const QUICK_PROMPTS = [
  'Explain this in simpler terms',
  "I don't understand this term",
  'Give me a real example',
];

const MAX_CONTEXT_CHARS = 2500;

function t(field: Partial<Record<LangCode, string>> | undefined, language: LangCode): string {
  return field?.[language] ?? field?.en ?? '';
}

export interface CoachChatProps {
  lessonId?: number | null;
  lessonTitle?: string | null;
  // When provided, shows an internal header bar with a close (X) button —
  // used for the floating/modal presentation. Omit when this is hosted
  // inside a nav stack screen that already has its own header + back button.
  onClose?: () => void;
}

export default function CoachChat({ lessonId, lessonTitle: lessonTitleProp, onClose }: CoachChatProps) {
  const colors = useThemeColors();
  const styles = makeStyles(colors);
  const lessonTitle = lessonTitleProp ?? null;
  const isGeneral = !lessonId;
  const { language } = useLanguage();

  const lesson = useMemo(() => (lessonId ? lessons.find((l) => l.id === lessonId) : undefined), [lessonId]);

  const lessonContext = useMemo(() => {
    if (!lesson) return null;
    const parts = [t(lesson.title, language), t(lesson.opener, language), t(lesson.body, language), t(lesson.keyTakeaway, language)]
      .filter(Boolean)
      .join('\n\n');
    return parts.slice(0, MAX_CONTEXT_CHARS);
  }, [lesson, language]);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      from: 'coach',
      text: isGeneral
        ? `${getGreeting()}! I'm your AI Coach. Ask me anything about trading, or pick a quick prompt below.`
        : `${getGreeting()}! I'm here to help with "${lessonTitle}". Ask me anything, or pick a quick prompt below.`,
    },
  ]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const listRef = useRef<FlatList>(null);
  const historyRef = useRef<ChatTurn[]>([]);

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || sending) return;
    const userMsg: ChatMessage = { id: `${Date.now()}-you`, from: 'you', text: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setSending(true);
    requestAnimationFrame(() => listRef.current?.scrollToEnd({ animated: true }));

    historyRef.current = [...historyRef.current, { role: 'user', text: trimmed }];

    try {
      const reply = await askCoach(historyRef.current, {
        lessonTitle: isGeneral ? null : lessonTitle,
        lessonContext: isGeneral ? null : lessonContext,
        language,
      });
      historyRef.current = [...historyRef.current, { role: 'model', text: reply }];
      setMessages((prev) => [...prev, { id: `${Date.now()}-coach`, from: 'coach', text: reply }]);
    } catch (e) {
      historyRef.current = historyRef.current.slice(0, -1);
      let errText: string;
      if (e instanceof ApiKeyMissingError) {
        errText = 'AI Coach is not set up on the server yet — please try again later.';
      } else if (e instanceof CoachApiError) {
        errText = e.message;
      } else {
        errText = 'Something went wrong reaching the AI coach. Please try again.';
      }
      setMessages((prev) => [...prev, { id: `${Date.now()}-err`, from: 'coach', text: errText }]);
    } finally {
      setSending(false);
      requestAnimationFrame(() => listRef.current?.scrollToEnd({ animated: true }));
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={90}
    >
      {onClose && (
        <View style={styles.header}>
          <CoachAvatar size={30} />
          <Text style={styles.headerTitle}>{isGeneral ? 'AI Coach' : lessonTitle}</Text>
          <Pressable style={styles.closeButton} onPress={onClose} hitSlop={10}>
            <Ionicons name="close" size={20} color={colors.textMuted} />
          </Pressable>
        </View>
      )}

      <FlatList
        ref={listRef}
        data={messages}
        keyExtractor={(m) => m.id}
        contentContainerStyle={{ padding: spacing.lg }}
        renderItem={({ item }) => (
          <View style={[styles.bubbleRow, item.from === 'you' && styles.bubbleRowYou]}>
            {item.from === 'coach' && <CoachAvatar size={26} />}
            <View style={[styles.bubble, item.from === 'you' ? styles.bubbleYou : styles.bubbleCoach]}>
              <Text style={[styles.bubbleText, item.from === 'you' && styles.bubbleTextYou]}>
                {item.text}
              </Text>
            </View>
          </View>
        )}
        ListFooterComponent={
          sending ? (
            <View style={styles.bubbleRow}>
              <CoachAvatar size={26} />
              <View style={[styles.bubble, styles.bubbleCoach, styles.typingBubble]}>
                <ActivityIndicator size="small" color={colors.textMuted} />
              </View>
            </View>
          ) : null
        }
      />

      <View style={styles.quickRow}>
        {QUICK_PROMPTS.map((p) => (
          <Pressable key={p} style={styles.quickChip} onPress={() => send(p)} disabled={sending}>
            <Text style={styles.quickChipText}>{p}</Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Type your doubt..."
          placeholderTextColor={colors.textLight}
          value={input}
          onChangeText={setInput}
          onSubmitEditing={() => send(input)}
          returnKeyType="send"
          editable={!sending}
        />
        <Pressable style={styles.sendButton} onPress={() => send(input)} disabled={sending}>
          <Ionicons name="send" size={17} color="#fff" />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const makeStyles = (colors: ThemeColors) => StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: { flex: 1, fontFamily: fonts.semiBold, fontSize: 15, color: colors.text },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bubbleRow: { flexDirection: 'row', alignItems: 'flex-end', marginBottom: spacing.md, gap: spacing.sm },
  bubbleRowYou: { justifyContent: 'flex-end' },
  bubble: { maxWidth: '78%', borderRadius: radius.lg, paddingVertical: spacing.sm + 2, paddingHorizontal: spacing.md },
  bubbleCoach: { backgroundColor: colors.surface, borderTopLeftRadius: 4 },
  bubbleYou: { backgroundColor: colors.primary, borderTopRightRadius: 4 },
  bubbleText: { fontFamily: fonts.regular, fontSize: 14, color: colors.text, lineHeight: 20 },
  bubbleTextYou: { color: '#fff' },
  typingBubble: { paddingVertical: spacing.sm + 4, paddingHorizontal: spacing.lg },
  quickRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.sm,
  },
  quickChip: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
  },
  quickChipText: { fontFamily: fonts.medium, fontSize: 12, color: colors.textMuted },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    padding: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  input: {
    flex: 1,
    fontFamily: fonts.regular,
    fontSize: 14.5,
    backgroundColor: colors.surface,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.lg,
    paddingVertical: 11,
    color: colors.text,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
