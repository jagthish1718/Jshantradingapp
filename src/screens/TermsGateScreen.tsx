import { useState } from 'react';
import { StyleSheet, Text, View, Pressable, Linking, SafeAreaView, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColors } from '../context/ThemeContext';
import type { ThemeColors } from '../theme/colors';
import { spacing, radius, fonts } from '../theme/spacing';
import { PAYMENTS_BACKEND_URL } from '../config/apiKeys';
import NiveshaLogo from '../components/NiveshaLogo';

interface Props {
  onAccept: () => void;
}

// Shown once, before sign-up/login, the very first time the app is opened
// (gated in App.tsx by STORAGE_KEYS.termsAccepted). Required for Play Store
// and to make sure every user has actually seen the "Paper Trading is
// simulated, not real investment advice" disclaimer before using the app.
export default function TermsGateScreen({ onAccept }: Props) {
  const colors = useThemeColors();
  const styles = makeStyles(colors);
  const [checked, setChecked] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.logoWrap}>
          <NiveshaLogo size={64} />
        </View>
        <Text style={styles.title}>Welcome to Niveshaa</Text>
        <Text style={styles.body}>
          Niveshaa is an educational app for learning the stock market — lessons, quizzes, and a
          Paper Trading simulator.
        </Text>
        <Text style={styles.body}>
          Paper Trading uses virtual play money only. No real trade is ever placed, and nothing in
          the app is investment or trading advice.
        </Text>
        <Text style={styles.body}>
          Please read and accept the following before you continue:
        </Text>
      </ScrollView>

      <View style={styles.footer}>
        <Pressable style={styles.checkRow} onPress={() => setChecked((c) => !c)} hitSlop={8}>
          <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
            {checked && <Ionicons name="checkmark" size={14} color="#fff" />}
          </View>
          <Text style={styles.checkLabel}>
            I agree to the{' '}
            <Text style={styles.link} onPress={() => Linking.openURL(`${PAYMENTS_BACKEND_URL}/terms.html`)}>
              Terms of Service
            </Text>{' '}
            and{' '}
            <Text style={styles.link} onPress={() => Linking.openURL(`${PAYMENTS_BACKEND_URL}/privacy.html`)}>
              Privacy Policy
            </Text>
          </Text>
        </Pressable>

        <Pressable
          style={[styles.button, !checked && styles.buttonDisabled]}
          disabled={!checked}
          onPress={onAccept}
        >
          <Text style={styles.buttonText}>Agree & Continue</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

function makeStyles(colors: ThemeColors) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    scroll: { paddingHorizontal: spacing.xl, paddingTop: spacing.xxl, paddingBottom: spacing.lg },
    logoWrap: { alignItems: 'center', marginBottom: spacing.lg },
    title: {
      fontFamily: fonts.displayBold,
      fontSize: 24,
      color: colors.text,
      textAlign: 'center',
      marginBottom: spacing.lg,
    },
    body: {
      fontFamily: fonts.regular,
      fontSize: 14.5,
      lineHeight: 21,
      color: colors.textMuted,
      marginBottom: spacing.md,
    },
    footer: {
      paddingHorizontal: spacing.xl,
      paddingTop: spacing.md,
      paddingBottom: spacing.lg,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    checkRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: spacing.sm,
      marginBottom: spacing.lg,
    },
    checkbox: {
      width: 22,
      height: 22,
      borderRadius: radius.sm,
      borderWidth: 1.5,
      borderColor: colors.border,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 1,
    },
    checkboxChecked: { backgroundColor: colors.primary, borderColor: colors.primary },
    checkLabel: { flex: 1, fontFamily: fonts.regular, fontSize: 14, lineHeight: 20, color: colors.text },
    link: { fontFamily: fonts.semiBold, color: colors.primary },
    button: {
      backgroundColor: colors.primary,
      borderRadius: radius.lg,
      paddingVertical: spacing.md,
      alignItems: 'center',
    },
    buttonDisabled: { backgroundColor: colors.border },
    buttonText: { fontFamily: fonts.semiBold, fontSize: 15.5, color: '#fff' },
  });
}
