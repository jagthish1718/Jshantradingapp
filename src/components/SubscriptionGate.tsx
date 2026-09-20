import { StyleSheet, Text, View, Pressable, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColors } from '../context/ThemeContext';
import type { ThemeColors } from '../theme/colors';
import { spacing, radius, fonts } from '../theme/spacing';

interface Props {
  icon?: keyof typeof Ionicons.glyphMap;
  title: string;
  message: string;
  onSubscribe: () => void;
  onBack?: () => void;
}

// Reusable paywall shown in place of a members-only screen when the user
// isn't subscribed yet. Callers are responsible for placing this AFTER all
// of their own hooks (rules-of-hooks safe early-return pattern).
export default function SubscriptionGate({ icon = 'lock-closed', title, message, onSubscribe, onBack }: Props) {
  const colors = useThemeColors();
  const styles = makeStyles(colors);
  return (
    <SafeAreaView style={styles.root}>
      {onBack ? (
        <Pressable style={styles.backButton} onPress={onBack}>
          <Ionicons name="arrow-back" size={18} color={colors.text} />
        </Pressable>
      ) : null}
      <View style={styles.center}>
        <View style={styles.iconWrap}>
          <Ionicons name={icon} size={28} color={colors.primary} />
        </View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{message}</Text>
        <Pressable style={styles.button} onPress={onSubscribe}>
          <Text style={styles.buttonText}>See membership plans</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const makeStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    root: { flex: 1, backgroundColor: colors.background },
    backButton: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: colors.surface,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: spacing.md,
      marginLeft: spacing.lg,
    },
    center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: spacing.xl },
    iconWrap: {
      width: 64,
      height: 64,
      borderRadius: 32,
      backgroundColor: colors.primaryLight,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: spacing.lg,
    },
    title: { fontFamily: fonts.bold, fontSize: 18, color: colors.text, textAlign: 'center', marginBottom: spacing.sm },
    message: {
      fontFamily: fonts.regular,
      fontSize: 13.5,
      color: colors.textMuted,
      textAlign: 'center',
      lineHeight: 20,
      marginBottom: spacing.xl,
    },
    button: {
      backgroundColor: colors.primary,
      borderRadius: radius.lg,
      paddingVertical: 13,
      paddingHorizontal: spacing.xl,
    },
    buttonText: { fontFamily: fonts.semiBold, fontSize: 14.5, color: '#fff' },
  });
