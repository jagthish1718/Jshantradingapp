import { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
} from '@expo-google-fonts/inter';
import {
  PlayfairDisplay_600SemiBold,
  PlayfairDisplay_700Bold,
} from '@expo-google-fonts/playfair-display';
import AppNavigator from './src/navigation/AppNavigator';
import OnboardingScreen from './src/screens/OnboardingScreen';
import TermsGateScreen from './src/screens/TermsGateScreen';
import { LanguageProvider } from './src/context/LanguageContext';
import { AppFlowProvider } from './src/context/AppFlowContext';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import { EntitlementsProvider } from './src/context/EntitlementsContext';
import { ProfileProvider } from './src/context/ProfileContext';
import { CoachModalProvider } from './src/context/CoachModalContext';
import { ThemeProvider } from './src/context/ThemeContext';
import { colors } from './src/theme/colors';
import { STORAGE_KEYS } from './src/utils/storage';
import NiveshaLogo from './src/components/NiveshaLogo';
import AuthForm from './src/components/AuthForm';
import FadeInView from './src/components/FadeInView';

SplashScreen.preventAutoHideAsync().catch(() => {});

function Root() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    PlayfairDisplay_600SemiBold,
    PlayfairDisplay_700Bold,
  });
  const [onboardingDone, setOnboardingDone] = useState<boolean | null>(null);
  const [termsAccepted, setTermsAccepted] = useState<boolean | null>(null);
  const { session, authLoading } = useAuth();

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEYS.onboardingDone)
      .then((v) => setOnboardingDone(v === 'true'))
      .catch(() => setOnboardingDone(false));
    AsyncStorage.getItem(STORAGE_KEYS.termsAccepted)
      .then((v) => setTermsAccepted(v === 'true'))
      .catch(() => setTermsAccepted(false));
  }, []);

  const ready = fontsLoaded && onboardingDone !== null && termsAccepted !== null && !authLoading;

  const onLayout = useCallback(async () => {
    if (ready) {
      await SplashScreen.hideAsync().catch(() => {});
    }
  }, [ready]);

  if (!ready) {
    return (
      <View style={styles.loading}>
        <NiveshaLogo size={84} />
        <Text style={styles.loadingBrand}>Niveshaa</Text>
      </View>
    );
  }

  // Terms & Privacy acceptance comes before anything else, even signup —
  // required for Play Store and so every user has seen the "Paper Trading
  // is simulated, not real advice" disclaimer before using the app.
  if (!termsAccepted) {
    return (
      <SafeAreaProvider onLayout={onLayout} style={{ flex: 1 }}>
        <StatusBar style="dark" />
        <FadeInView key="terms-gate">
          <TermsGateScreen
            onAccept={() => {
              AsyncStorage.setItem(STORAGE_KEYS.termsAccepted, 'true').catch(() => {});
              setTermsAccepted(true);
            }}
          />
        </FadeInView>
      </SafeAreaProvider>
    );
  }

  // Account comes first, before even onboarding — this is what keeps
  // membership pricing (like the first-time-member discount) honest.
  if (!session) {
    return (
      <SafeAreaProvider onLayout={onLayout} style={{ flex: 1 }}>
        <StatusBar style="dark" />
        <FadeInView key="auth-gate">
          <AuthForm initialMode="signup" showIntro />
        </FadeInView>
      </SafeAreaProvider>
    );
  }

  if (!onboardingDone) {
    return (
      <View style={{ flex: 1 }} onLayout={onLayout}>
        <StatusBar style="light" />
        <OnboardingScreen
          onDone={() => {
            AsyncStorage.setItem(STORAGE_KEYS.onboardingDone, 'true').catch(() => {});
            setOnboardingDone(true);
          }}
        />
      </View>
    );
  }

  return (
    <AppFlowProvider
      value={{
        replayOnboarding: () => {
          AsyncStorage.removeItem(STORAGE_KEYS.onboardingDone).catch(() => {});
          setOnboardingDone(false);
        },
      }}
    >
      <SafeAreaProvider onLayout={onLayout} style={{ flex: 1 }}>
        <StatusBar style="light" />
        <FadeInView key="main-app">
          <CoachModalProvider>
            <AppNavigator />
          </CoachModalProvider>
        </FadeInView>
      </SafeAreaProvider>
    </AppFlowProvider>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <EntitlementsProvider>
            <ProfileProvider>
              <Root />
            </ProfileProvider>
          </EntitlementsProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingBadge: {
    width: 64,
    height: 64,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  loadingBadgeText: { color: '#fff', fontSize: 30, fontWeight: '800' },
  loadingBrand: { color: '#fff', fontSize: 22, fontFamily: 'PlayfairDisplay_700Bold', letterSpacing: 0.3 },
});
