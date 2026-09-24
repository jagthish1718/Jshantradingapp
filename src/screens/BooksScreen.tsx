import { useState } from 'react';
import { StyleSheet, Text, View, Pressable, FlatList, ActivityIndicator, Alert, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useThemeColors } from '../context/ThemeContext';
import type { ThemeColors } from '../theme/colors';
import { spacing, radius, fonts } from '../theme/spacing';
import { books, Book } from '../data/books';
import { useEntitlements } from '../context/EntitlementsContext';
import { useAuth } from '../context/AuthContext';
import { useProfile } from '../context/ProfileContext';
import { PAYMENTS_BACKEND_URL } from '../config/apiKeys';
import {
  createBookOrder,
  verifyBookPayment,
  BookOrderInfo,
  PaymentsNotConfiguredError,
  PaymentApiError,
} from '../services/paymentApi';
import RazorpayCheckoutModal from '../components/RazorpayCheckoutModal';
import type { ProfileStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<ProfileStackParamList, 'Books'>;

function bookDownloadUrl(bookId: string): string {
  return `${PAYMENTS_BACKEND_URL}/books/${bookId}.pdf`;
}

export default function BooksScreen({ navigation }: Props) {
  const colors = useThemeColors();
  const styles = makeStyles(colors);
  const entitlements = useEntitlements();
  const { purchasedBooks, isSubscribed } = entitlements;
  const { user } = useAuth();
  const { name } = useProfile();
  const hasFullLessonAccess = isSubscribed;

  const [buyingId, setBuyingId] = useState<string | null>(null);
  const [order, setOrder] = useState<BookOrderInfo | null>(null);
  const [checkoutVisible, setCheckoutVisible] = useState(false);

  const startPurchase = async (book: Book) => {
    if (!user) {
      Alert.alert('Sign in required', 'Please sign in first — book purchases are tied to your account.', [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Sign in', onPress: () => navigation.navigate('Auth', { mode: 'login' }) },
      ]);
      return;
    }
    setBuyingId(book.id);
    try {
      const o = await createBookOrder(book.id);
      setOrder(o);
      setCheckoutVisible(true);
    } catch (e) {
      // Temporary: surface the raw error too, so we can see exactly what's
      // failing instead of guessing from a generic message.
      const msg =
        e instanceof PaymentsNotConfiguredError || e instanceof PaymentApiError
          ? e.message
          : `Could not start the payment. Please try again. [${e instanceof Error ? e.name + ': ' + e.message : String(e)}]`;
      Alert.alert('Payment error', msg);
    } finally {
      setBuyingId(null);
    }
  };

  const onDownload = (bookId: string) => {
    Linking.openURL(bookDownloadUrl(bookId)).catch(() => {
      Alert.alert('Could not open', 'Try again in a moment, or check your internet connection.');
    });
  };

  return (
    <>
      <FlatList
        style={styles.container}
        data={books}
        keyExtractor={(b) => b.id}
        contentContainerStyle={{ padding: spacing.lg }}
        ItemSeparatorComponent={() => <View style={{ height: spacing.md }} />}
        ListHeaderComponent={
          <>
            <Text style={styles.intro}>Download the lesson content as PDFs for offline reading.</Text>
            {!hasFullLessonAccess && (
              <View style={styles.hintBox}>
                <Ionicons name="information-circle" size={16} color={colors.primary} />
                <Text style={styles.hintText}>
                  The English/Tamil/Hindi books are the same content as the in-app lessons — they're
                  included free with a Niveshaa membership, no need to buy separately.
                </Text>
              </View>
            )}
          </>
        }
        renderItem={({ item }) => {
          const includedFree = item.isLessonContent && hasFullLessonAccess;
          const owned = (purchasedBooks ?? []).includes(item.id) || includedFree;
          const buying = buyingId === item.id;
          return (
            <View style={styles.card}>
              <View style={styles.coverWrap}>
                <Ionicons name="book" size={24} color={colors.primary} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.title} numberOfLines={2}>
                  {item.title}
                </Text>
                <Text style={styles.meta}>
                  {item.language} · {item.pages} pages
                </Text>
                <Text style={styles.desc} numberOfLines={2}>
                  {item.description}
                </Text>
              </View>
              {owned ? (
                <Pressable style={styles.downloadButton} onPress={() => onDownload(item.id)}>
                  <Ionicons name="download-outline" size={14} color={colors.success} />
                  <Text style={styles.downloadButtonText}>{includedFree ? 'Included' : 'Owned'}</Text>
                </Pressable>
              ) : buying ? (
                <ActivityIndicator size="small" color={colors.primary} />
              ) : (
                <Pressable style={styles.buyButton} onPress={() => startPurchase(item)}>
                  <Text style={styles.buyButtonText}>{item.price}</Text>
                </Pressable>
              )}
            </View>
          );
        }}
        ListFooterComponent={
          <Text style={styles.footNote}>
            Payments are processed securely by Razorpay. Niveshaa never sees or stores your card, UPI or
            bank details.
          </Text>
        }
      />

      <RazorpayCheckoutModal
        visible={checkoutVisible}
        order={order}
        userName={name}
        userEmail={user?.email ?? undefined}
        onDebug={(msg) => {
          console.log('[Razorpay book]', msg);
          if (
            msg.startsWith('[error]') ||
            msg.startsWith('[failed]') ||
            msg.startsWith('[webview error]') ||
            msg.startsWith('[http error]')
          ) {
            Alert.alert('Payment debug', msg);
          }
        }}
        onDismiss={() => setCheckoutVisible(false)}
        onSuccess={async (payload) => {
          setCheckoutVisible(false);
          if (!order) return;
          try {
            const result = await verifyBookPayment(payload, order.bookId);
            if (result.verified) {
              entitlements.applyOptimisticBookPurchase(order.bookId, result.purchasedBooks);
              Alert.alert('Purchase complete', 'Your book is ready to download.');
            } else {
              Alert.alert(
                'Could not confirm payment',
                'Your payment may have gone through but we could not confirm it yet. Please contact support if this book does not appear as owned shortly.'
              );
            }
          } catch {
            Alert.alert(
              'Could not confirm payment',
              'Network error while confirming your payment. Please check your internet connection.'
            );
          }
        }}
      />
    </>
  );
}

const makeStyles = (colors: ThemeColors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  intro: { fontFamily: fonts.regular, fontSize: 13.5, color: colors.textMuted, lineHeight: 20, marginBottom: spacing.md },
  hintBox: {
    flexDirection: 'row',
    gap: spacing.sm,
    backgroundColor: colors.primaryLight,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  hintText: { flex: 1, fontFamily: fonts.regular, fontSize: 12, color: colors.primaryDark, lineHeight: 17 },
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    padding: spacing.md,
  },
  coverWrap: {
    width: 44,
    height: 56,
    borderRadius: radius.sm,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { fontFamily: fonts.semiBold, fontSize: 14.5, color: colors.text },
  meta: { fontFamily: fonts.medium, fontSize: 11.5, color: colors.textMuted, marginTop: 2 },
  desc: { fontFamily: fonts.regular, fontSize: 12, color: colors.textMuted, marginTop: 4, lineHeight: 17 },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: colors.success,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
  },
  downloadButtonText: { fontFamily: fonts.semiBold, fontSize: 12, color: colors.success },
  buyButton: {
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: 8,
    alignSelf: 'center',
  },
  buyButtonText: { fontFamily: fonts.semiBold, fontSize: 13, color: colors.primary },
  footNote: { fontFamily: fonts.regular, fontSize: 11.5, color: colors.textLight, textAlign: 'center', marginTop: spacing.lg, lineHeight: 17 },
});
