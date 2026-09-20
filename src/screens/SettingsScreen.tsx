import { useState } from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView, Switch, Modal, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { spacing, radius, fonts } from '../theme/spacing';
import { useThemeColors, useTheme, ThemeMode } from '../context/ThemeContext';
import type { ThemeColors } from '../theme/colors';
import { useLanguage } from '../context/LanguageContext';
import { languages } from '../data/languages';
import { useAppFlow } from '../context/AppFlowContext';
import { useProfile } from '../context/ProfileContext';
import { useEntitlements } from '../context/EntitlementsContext';
import { useAuth } from '../context/AuthContext';
import { STORAGE_KEYS } from '../utils/storage';
import { useNotifications } from '../hooks/useNotifications';

const THEME_OPTIONS: { key: ThemeMode; label: string; icon: keyof typeof Ionicons.glyphMap }[] = [
  { key: 'light', label: 'Light', icon: 'sunny-outline' },
  { key: 'dark', label: 'Dark', icon: 'moon-outline' },
  { key: 'system', label: 'System', icon: 'phone-portrait-outline' },
];

export default function SettingsScreen() {
  const colors = useThemeColors();
  const styles = makeStyles(colors);
  const { mode, setMode } = useTheme();
  const { language, setLanguage } = useLanguage();
  const { replayOnboarding } = useAppFlow();
  const { resetProfile } = useProfile();
  const { resetEntitlements } = useEntitlements();
  const { user, signOut } = useAuth();
  const { enabled: notificationsEnabled, setEnabled: setNotificationsEnabled, supported: notificationsSupported } =
    useNotifications();

  const [langPickerOpen, setLangPickerOpen] = useState(false);
  const [safetyOpen, setSafetyOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);

  const currentLanguage = languages.find((l) => l.code === language);

  const confirmReset = () => {
    Alert.alert(
      'Reset all data?',
      user
        ? 'This clears your profile, progress, journal, paper trading history and preferences on this device, and logs you out. Your membership itself is tied to your account and stays safe — log back in to get it back. This cannot be undone.'
        : 'This clears your profile, progress, journal, paper trading history and preferences on this device. This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.multiRemove(Object.values(STORAGE_KEYS));
            } catch {
              // best-effort — proceed with in-memory reset regardless
            }
            resetProfile();
            resetEntitlements();
            setLanguage('en');
            setMode('system');
            if (user) await signOut();
            replayOnboarding();
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: spacing.xxl }}>
      <Text style={styles.sectionTitle}>Appearance</Text>
      <View style={styles.themeRow}>
        {THEME_OPTIONS.map((opt) => {
          const active = mode === opt.key;
          return (
            <Pressable
              key={opt.key}
              style={[styles.themeChip, active && styles.themeChipActive]}
              onPress={() => setMode(opt.key)}
            >
              <Ionicons name={opt.icon} size={18} color={active ? '#fff' : colors.primary} />
              <Text style={[styles.themeChipText, active && styles.themeChipTextActive]}>{opt.label}</Text>
            </Pressable>
          );
        })}
      </View>

      <Text style={styles.sectionTitle}>Preferences</Text>
      <View style={styles.list}>
        <Row
          colors={colors}
          styles={styles}
          icon="language-outline"
          iconBg={colors.tealBg}
          iconColor={colors.teal}
          title="Language"
          subtitle={currentLanguage?.nativeLabel ?? 'English'}
          onPress={() => setLangPickerOpen(true)}
        />
        <Divider styles={styles} />
        <View style={styles.row}>
          <View style={[styles.rowIcon, { backgroundColor: colors.goldBg }]}>
            <Ionicons name="notifications-outline" size={18} color={colors.gold} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.rowTitle}>Daily reminder</Text>
            <Text style={styles.rowSubtitle}>
              {notificationsSupported
                ? 'A nudge to keep your learning streak going'
                : 'Not set up yet — see chat for setup step'}
            </Text>
          </View>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            disabled={!notificationsSupported}
            trackColor={{ true: colors.primary, false: colors.border }}
          />
        </View>
      </View>

      <Text style={styles.sectionTitle}>Account & Data</Text>
      <View style={styles.list}>
        <Row
          colors={colors}
          styles={styles}
          icon="refresh-outline"
          iconBg={colors.purpleBg}
          iconColor={colors.purple}
          title="Replay Intro"
          subtitle="Watch the AI Coach welcome again"
          onPress={replayOnboarding}
        />
        <Divider styles={styles} />
        <Row
          colors={colors}
          styles={styles}
          icon="trash-outline"
          iconBg={colors.dangerBg}
          iconColor={colors.danger}
          title="Reset my data"
          subtitle="Clear profile, progress & preferences"
          onPress={confirmReset}
        />
      </View>

      <Text style={styles.sectionTitle}>About</Text>
      <View style={styles.list}>
        <Row
          colors={colors}
          styles={styles}
          icon="shield-checkmark-outline"
          iconBg={colors.tealBg}
          iconColor={colors.teal}
          title="Safety & Security"
          subtitle="How your data is handled"
          onPress={() => setSafetyOpen(true)}
        />
        <Divider styles={styles} />
        <Row
          colors={colors}
          styles={styles}
          icon="help-circle-outline"
          iconBg={colors.surface}
          iconColor={colors.textMuted}
          title="Help & About"
          subtitle="Niveshaa v1.0"
          onPress={() => setHelpOpen(true)}
        />
      </View>

      {/* Language picker */}
      <Modal visible={langPickerOpen} animationType="slide" transparent onRequestClose={() => setLangPickerOpen(false)}>
        <Pressable style={styles.sheetOverlay} onPress={() => setLangPickerOpen(false)}>
          <View style={styles.sheet} onStartShouldSetResponder={() => true}>
            <Text style={styles.sheetTitle}>Choose language</Text>
            {languages.map((l) => {
              const selected = l.code === language;
              return (
                <Pressable
                  key={l.code}
                  style={[styles.sheetOption, !l.available && styles.sheetOptionDisabled]}
                  disabled={!l.available}
                  onPress={() => {
                    setLanguage(l.code);
                    setLangPickerOpen(false);
                  }}
                >
                  <Text style={styles.sheetOptionNative}>{l.nativeLabel}</Text>
                  <Text style={styles.sheetOptionLabel}>{l.label}</Text>
                  <View style={{ flex: 1 }} />
                  {!l.available ? (
                    <Text style={styles.comingSoon}>Coming soon</Text>
                  ) : selected ? (
                    <Ionicons name="checkmark-circle" size={20} color={colors.primary} />
                  ) : null}
                </Pressable>
              );
            })}
          </View>
        </Pressable>
      </Modal>

      {/* Safety & Security */}
      <Modal visible={safetyOpen} animationType="slide" transparent onRequestClose={() => setSafetyOpen(false)}>
        <Pressable style={styles.sheetOverlay} onPress={() => setSafetyOpen(false)}>
          <View style={styles.sheet} onStartShouldSetResponder={() => true}>
            <Text style={styles.sheetTitle}>Safety & Security</Text>
            <Text style={styles.sheetBody}>
              Niveshaa is a learning app — nothing shown here is real trading or investment advice, and the AI
              Coach can make mistakes, so always double-check important facts yourself.{'\n\n'}
              Paper Trading uses simulated money only — no real bank account, broker or payment method is ever
              connected.{'\n\n'}
              Your profile, progress, journal and preferences are stored only on this device. Your membership
              status is tied to your signed-in account, not the device, so it survives a reinstall. We
              don't upload or share your device data anywhere. You can clear everything (except your
              membership) anytime from Account & Data → Reset my data.
            </Text>
            <Pressable style={styles.sheetCloseButton} onPress={() => setSafetyOpen(false)}>
              <Text style={styles.sheetCloseButtonText}>Got it</Text>
            </Pressable>
          </View>
        </Pressable>
      </Modal>

      {/* Help & About */}
      <Modal visible={helpOpen} animationType="slide" transparent onRequestClose={() => setHelpOpen(false)}>
        <Pressable style={styles.sheetOverlay} onPress={() => setHelpOpen(false)}>
          <View style={styles.sheet} onStartShouldSetResponder={() => true}>
            <Text style={styles.sheetTitle}>Help & About</Text>
            <Text style={styles.sheetBody}>
              Niveshaa v1.0 — an AI-guided trading course for beginners, in English, Tamil and Hindi.{'\n\n'}
              How do I change my language? Settings → Language.{'\n\n'}
              How do I reset my progress? Settings → Account & Data → Reset my data.{'\n\n'}
              Stuck on a lesson? Tap the floating coach bubble on any screen and ask.
            </Text>
            <Pressable style={styles.sheetCloseButton} onPress={() => setHelpOpen(false)}>
              <Text style={styles.sheetCloseButtonText}>Got it</Text>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </ScrollView>
  );
}

function Row({
  colors,
  styles,
  icon,
  iconBg,
  iconColor,
  title,
  subtitle,
  onPress,
}: {
  colors: ThemeColors;
  styles: ReturnType<typeof makeStyles>;
  icon: keyof typeof Ionicons.glyphMap;
  iconBg: string;
  iconColor: string;
  title: string;
  subtitle: string;
  onPress: () => void;
}) {
  return (
    <Pressable style={({ pressed }) => [styles.row, pressed && styles.rowPressed]} onPress={onPress}>
      <View style={[styles.rowIcon, { backgroundColor: iconBg }]}>
        <Ionicons name={icon} size={18} color={iconColor} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.rowTitle}>{title}</Text>
        <Text style={styles.rowSubtitle}>{subtitle}</Text>
      </View>
      <Ionicons name="chevron-forward" size={18} color={colors.textLight} />
    </Pressable>
  );
}

function Divider({ styles }: { styles: ReturnType<typeof makeStyles> }) {
  return <View style={styles.divider} />;
}

const makeStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background, paddingHorizontal: spacing.lg, paddingTop: spacing.lg },
    sectionTitle: {
      fontFamily: fonts.semiBold,
      fontSize: 12,
      color: colors.textMuted,
      textTransform: 'uppercase',
      letterSpacing: 0.6,
      marginBottom: spacing.sm,
      marginTop: spacing.sm,
    },
    themeRow: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.xl },
    themeChip: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: radius.lg,
      paddingVertical: spacing.md,
      backgroundColor: colors.background,
    },
    themeChipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
    themeChipText: { fontFamily: fonts.semiBold, fontSize: 12, color: colors.primary },
    themeChipTextActive: { color: '#fff' },
    list: {
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: radius.lg,
      marginBottom: spacing.xl,
      overflow: 'hidden',
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.md,
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.md,
      backgroundColor: colors.background,
    },
    rowPressed: { backgroundColor: colors.surface },
    rowIcon: {
      width: 36,
      height: 36,
      borderRadius: radius.md,
      alignItems: 'center',
      justifyContent: 'center',
    },
    rowTitle: { fontFamily: fonts.semiBold, fontSize: 14.5, color: colors.text },
    rowSubtitle: { fontFamily: fonts.regular, fontSize: 12, color: colors.textMuted, marginTop: 2 },
    divider: { height: 1, backgroundColor: colors.divider, marginLeft: 52 },
    sheetOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.35)', justifyContent: 'flex-end' },
    sheet: {
      backgroundColor: colors.background,
      borderTopLeftRadius: radius.xl,
      borderTopRightRadius: radius.xl,
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.lg,
      paddingBottom: spacing.xxl,
      maxHeight: '80%',
    },
    sheetTitle: { fontFamily: fonts.semiBold, fontSize: 15, color: colors.text, marginBottom: spacing.md },
    sheetBody: { fontFamily: fonts.regular, fontSize: 13.5, color: colors.textMuted, lineHeight: 20 },
    sheetCloseButton: {
      marginTop: spacing.lg,
      backgroundColor: colors.primary,
      borderRadius: radius.pill,
      paddingVertical: spacing.md,
      alignItems: 'center',
    },
    sheetCloseButtonText: { fontFamily: fonts.semiBold, fontSize: 14, color: '#fff' },
    sheetOption: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
      paddingVertical: spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: colors.divider,
    },
    sheetOptionDisabled: { opacity: 0.45 },
    sheetOptionNative: { fontFamily: fonts.semiBold, fontSize: 15, color: colors.text },
    sheetOptionLabel: { fontFamily: fonts.regular, fontSize: 12.5, color: colors.textMuted },
    comingSoon: { fontFamily: fonts.medium, fontSize: 11, color: colors.textLight },
  });
