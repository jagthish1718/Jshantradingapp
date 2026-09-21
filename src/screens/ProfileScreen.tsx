import { useState } from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView, TextInput, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { File, Paths } from 'expo-file-system';
import { useThemeColors } from '../context/ThemeContext';
import type { ThemeColors } from '../theme/colors';
import { spacing, radius, fonts } from '../theme/spacing';
import { useEntitlements } from '../context/EntitlementsContext';
import { useAuth } from '../context/AuthContext';
import { useProfile, TradingExperience, Gender } from '../context/ProfileContext';
import NiveshaLogo from '../components/NiveshaLogo';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { ProfileStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<ProfileStackParamList, 'ProfileMain'>;

const EXPERIENCE_LEVELS: { key: TradingExperience; label: string; icon: keyof typeof Ionicons.glyphMap }[] = [
  { key: 'Beginner', label: 'Beginner', icon: 'leaf-outline' },
  { key: 'Intermediate', label: 'Intermediate', icon: 'trending-up-outline' },
  { key: 'Experienced', label: 'Experienced', icon: 'ribbon-outline' },
];

const GENDERS: { key: Gender; label: string; icon: keyof typeof Ionicons.glyphMap }[] = [
  { key: 'Male', label: 'Male', icon: 'male-outline' },
  { key: 'Female', label: 'Female', icon: 'female-outline' },
  { key: 'Other', label: 'Other', icon: 'person-outline' },
];

export default function ProfileScreen({ navigation }: Props) {
  const colors = useThemeColors();
  const styles = makeStyles(colors);
  const { isSubscribed, planId } = useEntitlements();
  const { user, isEmailVerified, signOut } = useAuth();
  const {
    name,
    tradingExperience,
    gender,
    age,
    city,
    occupation,
    photoUri,
    setName,
    setPhotoUri,
    setTradingExperience,
    setGender,
    updateBiodata,
  } = useProfile();

  const [editingName, setEditingName] = useState(false);
  const [draftName, setDraftName] = useState(name);
  const [draftAge, setDraftAge] = useState(age);
  const [draftCity, setDraftCity] = useState(city);
  const [draftOccupation, setDraftOccupation] = useState(occupation);

  const startEdit = () => {
    setDraftName(name);
    setEditingName(true);
  };

  const commitEdit = () => {
    setName(draftName);
    setEditingName(false);
  };

  const pickPhoto = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Photo access needed', 'Allow gallery access to set a profile photo.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (result.canceled || !result.assets?.[0]?.uri) return;

    try {
      const source = new File(result.assets[0].uri);
      const dest = new File(Paths.document, `profile-photo-${Date.now()}.jpg`);
      await source.copy(dest);
      if (photoUri) {
        try {
          new File(photoUri).delete();
        } catch {
          // old photo already gone — ignore
        }
      }
      setPhotoUri(dest.uri);
    } catch {
      Alert.alert('Could not save photo', 'Please try again.');
    }
  };

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <View style={styles.header}>
        <Pressable style={styles.photoWrap} onPress={pickPhoto}>
          {photoUri ? (
            <Image source={{ uri: photoUri }} style={styles.photo} />
          ) : (
            <View style={styles.photoFallback}>
              <NiveshaLogo size={56} />
            </View>
          )}
          <View style={styles.photoEditBadge}>
            <Ionicons name="camera" size={13} color="#fff" />
          </View>
        </Pressable>

        {editingName ? (
          <TextInput
            style={styles.nameInput}
            value={draftName}
            onChangeText={setDraftName}
            onSubmitEditing={commitEdit}
            onBlur={commitEdit}
            autoFocus
            returnKeyType="done"
            placeholder="Your name"
            placeholderTextColor={colors.textLight}
            maxLength={30}
          />
        ) : (
          <Pressable style={styles.nameRow} onPress={startEdit}>
            <Text style={styles.name}>{name}</Text>
            <Ionicons name="pencil" size={14} color={colors.textLight} />
          </Pressable>
        )}

        <Text style={styles.email}>
          {tradingExperience ? `${tradingExperience} trader` : 'Learning with Niveshaa'}
        </Text>

        <View style={styles.statusRow}>
          <View style={[styles.statusPill, isSubscribed && styles.statusPillActive]}>
            <Ionicons
              name={isSubscribed ? 'star' : 'star-outline'}
              size={13}
              color={isSubscribed ? '#fff' : colors.textMuted}
            />
            <Text style={[styles.statusPillText, isSubscribed && styles.statusPillTextActive]}>
              {isSubscribed ? `${({ monthly: 'Monthly', quarterly: '3-Month', half_yearly: '6-Month', annual: 'Annual' } as Record<string, string>)[planId ?? ''] ?? 'Member'} Member` : 'Free plan'}
            </Text>
          </View>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Trading Experience</Text>
      <View style={styles.experienceRow}>
        {EXPERIENCE_LEVELS.map((level) => {
          const selected = tradingExperience === level.key;
          return (
            <Pressable
              key={level.key}
              style={[styles.experienceChip, selected && styles.experienceChipActive]}
              onPress={() => setTradingExperience(level.key)}
            >
              <Ionicons name={level.icon} size={18} color={selected ? '#fff' : colors.primary} />
              <Text style={[styles.experienceChipText, selected && styles.experienceChipTextActive]}>
                {level.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <Text style={styles.sectionTitle}>Personal Details</Text>
      <View style={styles.biodataCard}>
        <Text style={styles.biodataLabel}>Gender</Text>
        <View style={styles.genderRow}>
          {GENDERS.map((g) => {
            const selected = gender === g.key;
            return (
              <Pressable
                key={g.key}
                style={[styles.genderChip, selected && styles.genderChipActive]}
                onPress={() => setGender(g.key)}
              >
                <Ionicons name={g.icon} size={16} color={selected ? '#fff' : colors.primary} />
                <Text style={[styles.genderChipText, selected && styles.genderChipTextActive]}>{g.label}</Text>
              </Pressable>
            );
          })}
        </View>

        <View style={styles.biodataRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.biodataLabel}>Age</Text>
            <TextInput
              style={styles.biodataInput}
              value={draftAge}
              onChangeText={setDraftAge}
              onBlur={() => updateBiodata({ age: draftAge })}
              placeholder="e.g. 24"
              placeholderTextColor={colors.textLight}
              keyboardType="number-pad"
              maxLength={3}
            />
          </View>
          <View style={{ flex: 1.4 }}>
            <Text style={styles.biodataLabel}>City</Text>
            <TextInput
              style={styles.biodataInput}
              value={draftCity}
              onChangeText={setDraftCity}
              onBlur={() => updateBiodata({ city: draftCity })}
              placeholder="e.g. Chennai"
              placeholderTextColor={colors.textLight}
              maxLength={30}
            />
          </View>
        </View>

        <Text style={styles.biodataLabel}>Occupation</Text>
        <TextInput
          style={styles.biodataInput}
          value={draftOccupation}
          onChangeText={setDraftOccupation}
          onBlur={() => updateBiodata({ occupation: draftOccupation })}
          placeholder="e.g. Student, Software Engineer"
          placeholderTextColor={colors.textLight}
          maxLength={40}
        />
      </View>

      <Text style={styles.sectionTitle}>Account</Text>
      <View style={styles.list}>
        {user ? (
          <Row
            styles={styles}
            colors={colors}
            icon="person-circle-outline"
            iconBg={colors.primaryLight}
            iconColor={colors.primary}
            title={user.email ?? 'Signed in'}
            subtitle={isEmailVerified ? 'Signed in — tap to log out' : 'Email not verified yet'}
            onPress={() => {
              Alert.alert('Log out?', 'You can log back in anytime.', [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Log out', style: 'destructive', onPress: signOut },
              ]);
            }}
          />
        ) : (
          <Row
            styles={styles}
            colors={colors}
            icon="person-circle-outline"
            iconBg={colors.primaryLight}
            iconColor={colors.primary}
            title="Sign up / Log in"
            subtitle="Create an account to subscribe"
            onPress={() => navigation.navigate('Auth', { mode: 'signup' })}
          />
        )}
      </View>

      <Text style={styles.sectionTitle}>Membership & Content</Text>
      <View style={styles.list}>
        <Row
          styles={styles}
          colors={colors}
          icon="star-outline"
          iconBg={colors.goldBg}
          iconColor={colors.gold}
          title="Subscription"
          subtitle={isSubscribed ? 'Manage your membership' : 'Unlock simulator, journal & more'}
          onPress={() => navigation.navigate('Subscription')}
        />
        <Divider styles={styles} />
        <Row
          styles={styles}
          colors={colors}
          icon="lock-open-outline"
          iconBg={colors.primaryLight}
          iconColor={colors.primary}
          title="Premium Lessons"
          subtitle={isSubscribed ? 'All tiers included' : 'Included with membership'}
          onPress={() => navigation.navigate('Premium')}
        />
        <Divider styles={styles} />
        <Row
          styles={styles}
          colors={colors}
          icon="book-outline"
          iconBg={colors.tealBg}
          iconColor={colors.teal}
          title="Books"
          subtitle="Lesson content as downloadable PDFs"
          onPress={() => navigation.navigate('Books')}
        />
      </View>

      <Text style={styles.sectionTitle}>General</Text>
      <View style={styles.list}>
        <Row
          styles={styles}
          colors={colors}
          icon="settings-outline"
          iconBg={colors.surface}
          iconColor={colors.textMuted}
          title="Settings"
          subtitle="Language, notifications, theme & more"
          onPress={() => navigation.navigate('Settings')}
        />
      </View>

      <View style={{ height: spacing.xxl }} />
    </ScrollView>
  );
}

function Row({
  icon,
  iconBg,
  iconColor,
  title,
  subtitle,
  onPress,
  styles,
  colors,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  iconBg: string;
  iconColor: string;
  title: string;
  subtitle: string;
  onPress: () => void;
  styles: ReturnType<typeof makeStyles>;
  colors: ThemeColors;
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

const makeStyles = (colors: ThemeColors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { alignItems: 'center', paddingVertical: spacing.xl, paddingHorizontal: spacing.lg },
  photoWrap: { width: 84, height: 84 },
  photo: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: colors.surface,
  },
  photoFallback: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  photoEditBadge: {
    position: 'absolute',
    right: -2,
    bottom: -2,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.background,
  },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: spacing.md },
  name: { fontFamily: fonts.displayBold, fontSize: 20, color: colors.text },
  nameInput: {
    fontFamily: fonts.displayBold,
    fontSize: 20,
    color: colors.text,
    marginTop: spacing.md,
    textAlign: 'center',
    minWidth: 160,
    borderBottomWidth: 1,
    borderBottomColor: colors.primary,
    paddingVertical: 2,
  },
  email: { fontFamily: fonts.regular, fontSize: 12.5, color: colors.textMuted, marginTop: 2 },
  statusRow: { marginTop: spacing.md },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
  },
  statusPillActive: { backgroundColor: colors.gold, borderColor: colors.gold },
  statusPillText: { fontFamily: fonts.semiBold, fontSize: 12, color: colors.textMuted },
  statusPillTextActive: { color: '#fff' },
  sectionTitle: {
    fontFamily: fonts.semiBold,
    fontSize: 12,
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.sm,
    marginTop: spacing.sm,
  },
  experienceRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.xl,
  },
  experienceChip: {
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
  experienceChipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  experienceChipText: { fontFamily: fonts.semiBold, fontSize: 12, color: colors.primary },
  experienceChipTextActive: { color: '#fff' },
  biodataCard: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    padding: spacing.md,
  },
  biodataLabel: {
    fontFamily: fonts.medium,
    fontSize: 11.5,
    color: colors.textMuted,
    marginBottom: 6,
  },
  genderRow: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.md },
  genderChip: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingVertical: 9,
    backgroundColor: colors.background,
  },
  genderChipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  genderChipText: { fontFamily: fonts.semiBold, fontSize: 12, color: colors.primary },
  genderChipTextActive: { color: '#fff' },
  biodataRow: { flexDirection: 'row', gap: spacing.sm },
  biodataInput: {
    fontFamily: fonts.regular,
    fontSize: 13.5,
    color: colors.text,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: 9,
    marginBottom: spacing.md,
  },
  list: {
    marginHorizontal: spacing.lg,
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
});
