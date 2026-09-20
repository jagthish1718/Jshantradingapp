import { useState } from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColors } from '../context/ThemeContext';
import type { ThemeColors } from '../theme/colors';
import { spacing, radius, fonts } from '../theme/spacing';
import { subscriptionPlans, sharedPlanFeatures, SubscriptionPlan } from '../data/subscription';
import { useEntitlements } from '../context/EntitlementsContext';
import { useAuth } from '../context/AuthContext';
import { useProfile } from '../context/ProfileContext';
import {
  createOrder,
  verifyPayment,
  OrderInfo,
  PaymentsNotConfiguredError,
  PaymentApiError,
  RazorpaySuccessPayload,
} from '../services/paymentApi';
import RazorpayCheckoutModal from '../components/RazorpayCheckoutModal';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { ProfileStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<ProfileStackParamList, 'Subscription'>;

function formatDate(iso: string | null): string {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function SubscriptionScreen({ navigation }: Props) {
  const colors = useThemeColors();
  const styles = makeStyles(colors);
  const { isSubscribed, planId, lastPaymentId, currentPeriodEnd, applyOptimisticSubscription } =
    useEntitlements();
  const { user, isEmailVerified, resendVerification } = useAuth();
  const { name } = useProfile();

  // A genuine first-time-member price — this account's own payment history,
  // confirmed server-side, decides eligibility. Not a fake "was more
  // expensive" discount: it's the real price for the first purchase, and
  // the regular price is what the same plan costs on every renewal.
  const isNewUser = !isSubscribed && lastPaymentId === null;

  const [payingPlan, setPayingPlan] = useState<SubscriptionPlan['id'] | null>(null);
  const [order, setOrder] = useState<OrderInfo | null>(null);
  const [checkoutVisible, setCheckoutVisible] = useState(false);
  const [resending, setResending] = useState(false);

  const startCheckout = async (plan: SubscriptionPlan) => {
    if (!user) {
      navigation.navigate('Auth', { mode: 'signup' });
      return;
    }
    if (!isEmailVerified) {
      Alert.alert(
        'Verify your email first',
        "We've sent a verification link to your email — tap it, then come back here.",
        [
          { text: 'OK', style: 'cancel' },
          {
            text: 'Resend email',
            onPress: async () => {
              setResending(true);
              await resendVerification(user.email ?? '');
              setResending(false);
              Alert.alert('Sent', 'Check your inbox for the verification link.');
            },
          },
        ]
      );
      return;
    }

    setPayingPlan(plan.id);
    try {
      const newOrder = await createOrder(plan.id);
      setOrder(newOrder);
      setCheckoutVisible(true);
    } catch (err) {
      if (err instanceof PaymentsNotConfiguredError) {
        Alert.alert(
          'Payments not set up yet',
          'The payments backend URL is still empty in src/config/apiKeys.ts.'
        );
      } else if (err instanceof PaymentApiError) {
        Alert.alert('Could not start payment', err.message);
      } else {
        Alert.alert('Something went wrong', 'Please try again.');
      }
    } finally {
      setPayingPlan(null);
    }
  };

  const handleCheckoutSuccess = async (payload: RazorpaySuccessPayload) => {
    if (!order) return;
    setCheckoutVisible(false);
    try {
      const result = await verifyPayment(payload, order.planId);
      if (result.verified) {
        applyOptimisticSubscription(order.planId, result.paymentId ?? '', result.currentPeriodEnd);
        Alert.alert('Payment successful', `You're now on the ${order.label}. Enjoy Niveshaa!`);
      } else {
        Alert.alert(
          'Payment could not be verified',
          "Your payment went through on Razorpay's side but we couldn't confirm it. Please contact support with your payment id."
        );
      }
    } catch {
      Alert.alert(
        'Payment could not be verified',
        "Your payment went through on Razorpay's side but we couldn't confirm it. Please contact support."
      );
    } finally {
      setOrder(null);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: spacing.lg }}>
      <Text style={styles.intro}>
        One membership unlocks everything below — pick whichever duration suits you.
      </Text>

      <Text style={styles.includedHeading}>What's included in every plan</Text>
      <View style={styles.featuresGrid}>
        {sharedPlanFeatures.map((f) => (
          <View key={f} style={styles.featureChip}>
            <Ionicons name="checkmark-circle" size={14} color={colors.success} />
            <Text style={styles.featureChipText}>{f}</Text>
          </View>
        ))}
      </View>

      {!user && (
        <Pressable style={styles.accountBanner} onPress={() => navigation.navigate('Auth', { mode: 'signup' })}>
          <Ionicons name="person-circle-outline" size={18} color={colors.primary} />
          <Text style={styles.accountBannerText}>Sign up or log in to subscribe — takes a minute.</Text>
          <Ionicons name="chevron-forward" size={16} color={colors.primary} />
        </Pressable>
      )}
      {user && !isEmailVerified && (
        <View style={styles.accountBanner}>
          <Ionicons name="mail-unread-outline" size={18} color={colors.primary} />
          <Text style={styles.accountBannerText}>Verify your email to activate payments.</Text>
          <Pressable
            disabled={resending}
            onPress={async () => {
              setResending(true);
              await resendVerification(user.email ?? '');
              setResending(false);
              Alert.alert('Sent', 'Check your inbox for the verification link.');
            }}
          >
            <Text style={styles.accountBannerAction}>{resending ? 'Sending…' : 'Resend'}</Text>
          </Pressable>
        </View>
      )}

      {isNewUser && (
        <View style={styles.newUserBanner}>
          <Ionicons name="gift-outline" size={16} color={colors.gold} />
          <Text style={styles.newUserBannerText}>
            First-time member price — 5% off, applied automatically below. Regular price applies
            from your next renewal.
          </Text>
        </View>
      )}

      {subscriptionPlans.map((plan) => {
        const active = isSubscribed && planId === plan.id;
        const paying = payingPlan === plan.id;
        return (
          <View key={plan.id} style={[styles.card, active && styles.cardActive]}>
            {plan.badge && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{plan.badge.toUpperCase()}</Text>
              </View>
            )}
            <Text style={styles.planLabel}>{plan.label}</Text>
            <Text style={styles.bestFor}>{plan.durationLabel}</Text>

            <View style={styles.priceRow}>
              {isNewUser && <Text style={styles.priceStrike}>{plan.price}</Text>}
              <Text style={styles.price}>{isNewUser ? plan.newUserPrice : plan.price}</Text>
              <Text style={styles.priceNote}>
                {isNewUser ? plan.newUserPriceNote : plan.priceNote}
              </Text>
            </View>
            <Text style={styles.perMonth}>{plan.perMonth}</Text>
            {plan.savingsBadge && <Text style={styles.savingsBadge}>{plan.savingsBadge}</Text>}

            {active ? (
              <View style={styles.activeRow}>
                <Ionicons name="checkmark-circle" size={16} color={colors.success} />
                <Text style={styles.activeText}>Active until {formatDate(currentPeriodEnd)}</Text>
              </View>
            ) : (
              <Pressable style={styles.ctaButton} disabled={paying} onPress={() => startCheckout(plan)}>
                {paying ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.ctaButtonText}>Subscribe</Text>
                )}
              </Pressable>
            )}
          </View>
        );
      })}

      <Text style={styles.footNote}>
        Payments are processed securely by Razorpay. Niveshaa never sees or stores your card,
        UPI or bank details.
      </Text>

      <RazorpayCheckoutModal
        visible={checkoutVisible}
        order={order}
        userName={name}
        onSuccess={handleCheckoutSuccess}
        onDismiss={() => {
          setCheckoutVisible(false);
          setOrder(null);
        }}
        onDebug={(msg) => {
          console.log('[Razorpay]', msg);
          if (msg.startsWith('[error]') || msg.startsWith('[failed]') || msg.startsWith('[webview error]') || msg.startsWith('[http error]')) {
            Alert.alert('Payment debug', msg);
          }
        }}
      />
    </ScrollView>
  );
}

const makeStyles = (colors: ThemeColors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  intro: { fontFamily: fonts.regular, fontSize: 13.5, color: colors.textMuted, lineHeight: 20, marginBottom: spacing.md },
  includedHeading: {
    fontFamily: fonts.semiBold,
    fontSize: 12,
    color: colors.textMuted,
    marginBottom: spacing.sm,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  featureChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: 8,
  },
  featureChipText: { fontFamily: fonts.medium, fontSize: 12, color: colors.text, letterSpacing: 0.1 },
  accountBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  accountBannerText: { flex: 1, fontFamily: fonts.medium, fontSize: 12.5, color: colors.text },
  accountBannerAction: { fontFamily: fonts.semiBold, fontSize: 12.5, color: colors.primary },
  newUserBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.goldBg,
    borderWidth: 1,
    borderColor: colors.gold,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.lg,
    shadowColor: colors.gold,
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  newUserBannerText: { flex: 1, fontFamily: fonts.medium, fontSize: 12.5, color: colors.text, lineHeight: 18 },
  card: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  cardActive: { borderColor: colors.primary, backgroundColor: colors.primaryLight },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.gold,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    marginBottom: spacing.sm,
  },
  badgeText: { fontFamily: fonts.bold, fontSize: 10, color: '#fff', letterSpacing: 0.8 },
  planLabel: { fontFamily: fonts.bold, fontSize: 17, color: colors.text, marginBottom: 2, letterSpacing: -0.2 },
  bestFor: { fontFamily: fonts.medium, fontSize: 12, color: colors.textMuted, marginBottom: spacing.sm, letterSpacing: 0.1 },
  priceRow: { flexDirection: 'row', alignItems: 'baseline', gap: 6 },
  priceStrike: {
    fontFamily: fonts.medium,
    fontSize: 15,
    color: colors.textLight,
    textDecorationLine: 'line-through',
  },
  price: { fontFamily: fonts.bold, fontSize: 30, color: colors.text, letterSpacing: -0.6 },
  priceNote: { fontFamily: fonts.medium, fontSize: 12, color: colors.textMuted },
  perMonth: { fontFamily: fonts.medium, fontSize: 12, color: colors.textMuted, marginTop: 2 },
  savingsBadge: { fontFamily: fonts.semiBold, fontSize: 11.5, color: colors.success, marginTop: 4, letterSpacing: 0.1 },
  activeRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: spacing.md },
  activeText: { fontFamily: fonts.semiBold, fontSize: 13, color: colors.success },
  ctaButton: {
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    paddingVertical: 13,
    alignItems: 'center',
    marginTop: spacing.md,
    minHeight: 46,
    justifyContent: 'center',
  },
  ctaButtonText: { fontFamily: fonts.semiBold, fontSize: 15, color: '#fff', letterSpacing: 0.2 },
  footNote: { fontFamily: fonts.regular, fontSize: 11.5, color: colors.textLight, textAlign: 'center', marginTop: spacing.sm, lineHeight: 17 },
});
