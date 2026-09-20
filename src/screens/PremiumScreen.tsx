import { StyleSheet, Text, View, Pressable, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColors } from '../context/ThemeContext';
import type { ThemeColors } from '../theme/colors';
import { spacing, radius, fonts } from '../theme/spacing';
import { premiumTiers } from '../data/premiumTiers';
import { useEntitlements } from '../context/EntitlementsContext';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { ProfileStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<ProfileStackParamList, 'Premium'>;

// Lesson tiers are no longer sold separately — one Niveshaa membership
// unlocks all of them. This screen is now informational: it shows what
// each tier covers and points to Subscription for the single CTA.
export default function PremiumScreen({ navigation }: Props) {
  const colors = useThemeColors();
  const styles = makeStyles(colors);
  const { isSubscribed } = useEntitlements();

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: spacing.lg }}>
      <Text style={styles.intro}>
        All lesson tiers below are included with a Niveshaa membership — no separate purchase.
        First 5 Beginner lessons are always free, even without a membership.
      </Text>

      <View style={styles.perkBanner}>
        <Ionicons name="sparkles" size={15} color={colors.purple} />
        <Text style={styles.perkBannerText}>
          Every tier — including the free preview lessons — includes unlimited Ask AI Coach
          doubt-clearing.
        </Text>
      </View>

      {premiumTiers.map((t) => (
        <View key={t.tier} style={[styles.card, isSubscribed && styles.cardUnlocked]}>
          <View style={[styles.tierIcon, { backgroundColor: colors.tierBg[t.tier] }]}>
            <Ionicons
              name={isSubscribed ? 'lock-open' : 'lock-closed'}
              size={20}
              color={colors.tierColors[t.tier]}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.tierTitle}>{t.tier}</Text>
            <Text style={styles.tierLessonRange}>{t.lessonRange}</Text>
            <Text style={styles.tierDesc}>{t.description}</Text>
          </View>
          {isSubscribed ? (
            <View style={styles.unlockedTag}>
              <Ionicons name="checkmark" size={14} color={colors.success} />
              <Text style={styles.unlockedText}>Included</Text>
            </View>
          ) : (
            <View style={styles.lockedTag}>
              <Text style={styles.lockedText}>With membership</Text>
            </View>
          )}
        </View>
      ))}

      {!isSubscribed && (
        <Pressable
          style={styles.subscribeButton}
          onPress={() => navigation.navigate('Subscription')}
        >
          <Text style={styles.subscribeButtonText}>See membership plans</Text>
        </Pressable>
      )}

      <Text style={styles.footNote}>
        Payments are processed securely by Razorpay. Niveshaa never sees or stores your card,
        UPI or bank details.
      </Text>
    </ScrollView>
  );
}

const makeStyles = (colors: ThemeColors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  intro: { fontFamily: fonts.regular, fontSize: 13.5, color: colors.textMuted, lineHeight: 20, marginBottom: spacing.md },
  perkBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.purpleBg,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  perkBannerText: { flex: 1, fontFamily: fonts.regular, fontSize: 12, color: colors.purple, lineHeight: 17 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  cardUnlocked: { borderColor: colors.success, backgroundColor: colors.successBg },
  tierIcon: {
    width: 42,
    height: 42,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tierTitle: { fontFamily: fonts.semiBold, fontSize: 15, color: colors.text },
  tierLessonRange: { fontFamily: fonts.semiBold, fontSize: 11, color: colors.textLight, marginTop: 1 },
  tierDesc: { fontFamily: fonts.regular, fontSize: 12, color: colors.textMuted, marginTop: 2 },
  unlockedTag: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  unlockedText: { fontFamily: fonts.semiBold, fontSize: 12.5, color: colors.success },
  lockedTag: {},
  lockedText: { fontFamily: fonts.regular, fontSize: 11.5, color: colors.textLight },
  subscribeButton: {
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    paddingVertical: 13,
    alignItems: 'center',
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
  },
  subscribeButtonText: { fontFamily: fonts.semiBold, fontSize: 14.5, color: '#fff' },
  footNote: { fontFamily: fonts.regular, fontSize: 11.5, color: colors.textLight, textAlign: 'center', marginTop: spacing.sm, lineHeight: 17 },
});
