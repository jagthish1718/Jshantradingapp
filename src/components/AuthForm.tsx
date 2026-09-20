import { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Defs, LinearGradient as SvgLinearGradient, Stop, Rect, Circle } from 'react-native-svg';
import { useThemeColors } from '../context/ThemeContext';
import type { ThemeColors } from '../theme/colors';
import { spacing, radius, fonts } from '../theme/spacing';
import { useAuth } from '../context/AuthContext';
import NiveshaLogo from './NiveshaLogo';
import FadeInView from './FadeInView';

export type AuthMode = 'signup' | 'login';
type Step = 'form' | 'checkEmail';

interface Props {
  initialMode?: AuthMode;
  // Called right after a successful login (not after signup — that shows
  // the "check your email" step first). Useful when this form is reached
  // mid-flow (e.g. from the Subscribe button) and should return the person
  // to where they came from.
  onLoggedIn?: () => void;
  // Full gradient hero + brand lockup, used only for the app-launch gate.
  // The mid-flow version (reached from "Subscribe") sits under a screen
  // header already, so it stays plain.
  showIntro?: boolean;
}

function Wallpaper({ colors }: { colors: ThemeColors }) {
  return (
    <Svg style={StyleSheet.absoluteFill} width="100%" height="100%">
      <Defs>
        <SvgLinearGradient id="authWallpaper" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor={colors.primary} stopOpacity={1} />
          <Stop offset="1" stopColor={colors.primaryDark} stopOpacity={1} />
        </SvgLinearGradient>
      </Defs>
      <Rect x={0} y={0} width="100%" height="100%" fill="url(#authWallpaper)" />
      <Circle cx="88%" cy="6%" r={90} fill="#fff" fillOpacity={0.06} />
      <Circle cx="-6%" cy="30%" r={130} fill="#fff" fillOpacity={0.05} />
    </Svg>
  );
}

function Shell({
  showIntro,
  colors,
  styles,
  children,
}: {
  showIntro?: boolean;
  colors: ThemeColors;
  styles: ReturnType<typeof makeStyles>;
  children: React.ReactNode;
}) {
  return (
    <View style={{ flex: 1, backgroundColor: showIntro ? colors.primary : colors.background }}>
      {showIntro && <Wallpaper colors={colors} />}
      <SafeAreaView style={{ flex: 1 }}>
        {showIntro && (
          <View style={styles.hero}>
            <NiveshaLogo size={72} />
            <Text style={styles.heroBrand}>Niveshaa</Text>
            <Text style={styles.heroTagline}>Learn. Practice. Trade smarter.</Text>
          </View>
        )}
        <View style={showIntro ? styles.sheet : styles.plainSheet}>{children}</View>
      </SafeAreaView>
    </View>
  );
}

export default function AuthForm({ initialMode = 'signup', onLoggedIn, showIntro }: Props) {
  const colors = useThemeColors();
  const styles = makeStyles(colors);
  const { signUp, signIn, resendVerification } = useAuth();

  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [step, setStep] = useState<Step>('form');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resendMsg, setResendMsg] = useState<string | null>(null);

  const validEmail = /\S+@\S+\.\S+/.test(email.trim());

  const submit = async () => {
    setError(null);
    if (!validEmail) {
      setError('Enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (mode === 'signup' && password !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }

    setBusy(true);
    const result = mode === 'signup' ? await signUp(email, password) : await signIn(email, password);
    setBusy(false);

    if (result.error) {
      if (/already registered|already exists/i.test(result.error)) {
        setError('An account already exists for this email — try logging in instead.');
      } else if (/email not confirmed/i.test(result.error)) {
        setError('Please verify your email first — check your inbox for the link.');
      } else if (/invalid login credentials/i.test(result.error)) {
        setError('Incorrect email or password.');
      } else if (/error sending confirmation/i.test(result.error)) {
        setError('Could not send the verification email right now. Please try again in a bit.');
      } else {
        setError(result.error);
      }
      return;
    }

    if (mode === 'signup') {
      setStep('checkEmail');
    } else {
      onLoggedIn?.();
    }
  };

  const handleResend = async () => {
    setResendMsg(null);
    setBusy(true);
    const result = await resendVerification(email);
    setBusy(false);
    setResendMsg(result.error ?? 'Verification email sent again — check your inbox.');
  };

  if (step === 'checkEmail') {
    return (
      <Shell showIntro={showIntro} colors={colors} styles={styles}>
        <FadeInView key="check-email">
          <View style={styles.center}>
            <View style={styles.iconWrap}>
              <Ionicons name="mail-outline" size={30} color={colors.primary} />
            </View>
            <Text style={styles.title}>Check your email</Text>
            <Text style={styles.message}>
              We've sent a verification link to{'\n'}
              <Text style={{ fontFamily: fonts.semiBold, color: colors.text }}>{email}</Text>
              {'\n\n'}Tap it, then come back and log in.
            </Text>
            {resendMsg ? <Text style={styles.resendMsg}>{resendMsg}</Text> : null}
            <Pressable style={styles.linkButton} onPress={handleResend} disabled={busy}>
              <Text style={styles.linkButtonText}>{busy ? 'Sending…' : 'Resend email'}</Text>
            </Pressable>
            <Pressable
              style={styles.primaryButton}
              onPress={() => {
                setMode('login');
                setStep('form');
                setPassword('');
                setError(null);
              }}
            >
              <Text style={styles.primaryButtonText}>I've verified — Log in</Text>
            </Pressable>
          </View>
        </FadeInView>
      </Shell>
    );
  }

  return (
    <Shell showIntro={showIntro} colors={colors} styles={styles}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={80}
      >
        <ScrollView
          contentContainerStyle={{ padding: spacing.lg, flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>{mode === 'signup' ? 'Create your account' : 'Welcome back'}</Text>

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="you@example.com"
            placeholderTextColor={colors.textLight}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="At least 6 characters"
            placeholderTextColor={colors.textLight}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCorrect={false}
            spellCheck={false}
            autoComplete="off"
            textContentType="oneTimeCode"
          />
          <Text style={styles.hint}>At least 6 characters.</Text>

          {mode === 'signup' && (
            <>
              <Text style={styles.label}>Confirm password</Text>
              <TextInput
                style={styles.input}
                placeholder="Re-enter your password"
                placeholderTextColor={colors.textLight}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                autoCorrect={false}
                spellCheck={false}
                autoComplete="off"
                textContentType="oneTimeCode"
              />
            </>
          )}

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <Pressable style={styles.primaryButton} onPress={submit} disabled={busy}>
            {busy ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.primaryButtonText}>{mode === 'signup' ? 'Sign up' : 'Log in'}</Text>
            )}
          </Pressable>

          <Pressable
            style={styles.switchModeButton}
            onPress={() => {
              setMode(mode === 'signup' ? 'login' : 'signup');
              setError(null);
            }}
          >
            <Text style={styles.switchModeText}>
              {mode === 'signup' ? 'Already have an account? Log in' : "New here? Create an account"}
            </Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </Shell>
  );
}

const makeStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    hero: { alignItems: 'center', paddingTop: spacing.xl, paddingBottom: spacing.lg },
    heroBrand: { fontFamily: fonts.displayBold, fontSize: 22, color: '#fff', marginTop: spacing.sm },
    heroTagline: { fontFamily: fonts.medium, fontSize: 12.5, color: 'rgba(255,255,255,0.85)', marginTop: 4 },
    sheet: {
      flex: 1,
      backgroundColor: colors.background,
      borderTopLeftRadius: 28,
      borderTopRightRadius: 28,
      overflow: 'hidden',
    },
    plainSheet: { flex: 1 },
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
    title: { fontFamily: fonts.bold, fontSize: 20, color: colors.text, marginBottom: spacing.lg, textAlign: 'center' },
    message: { fontFamily: fonts.regular, fontSize: 13.5, color: colors.textMuted, lineHeight: 20, textAlign: 'center', marginBottom: spacing.lg },
    resendMsg: { fontFamily: fonts.medium, fontSize: 12.5, color: colors.success, textAlign: 'center', marginBottom: spacing.md },
    label: { fontFamily: fonts.semiBold, fontSize: 12.5, color: colors.textMuted, marginBottom: 6, marginTop: spacing.sm },
    hint: { fontFamily: fonts.regular, fontSize: 11.5, color: colors.textLight, marginTop: 4 },
    input: {
      fontFamily: fonts.regular,
      fontSize: 14,
      color: colors.text,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: radius.md,
      paddingHorizontal: spacing.md,
      paddingVertical: 12,
    },
    errorText: { fontFamily: fonts.medium, fontSize: 12.5, color: colors.danger, marginTop: spacing.md },
    primaryButton: {
      backgroundColor: colors.primary,
      borderRadius: radius.md,
      paddingVertical: 14,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: spacing.lg,
      minHeight: 48,
    },
    primaryButtonText: { fontFamily: fonts.semiBold, fontSize: 15, color: '#fff' },
    switchModeButton: { alignItems: 'center', marginTop: spacing.lg, paddingVertical: spacing.sm },
    switchModeText: { fontFamily: fonts.medium, fontSize: 13, color: colors.primary },
    linkButton: { paddingVertical: spacing.sm, marginBottom: spacing.sm },
    linkButtonText: { fontFamily: fonts.semiBold, fontSize: 13.5, color: colors.primary },
  });
