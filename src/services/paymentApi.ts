import { PAYMENTS_BACKEND_URL } from '../config/apiKeys';
import { supabase } from '../lib/supabaseClient';
import type { SubscriptionPlan } from '../data/subscription';
import type { PremiumTier } from '../data/premiumTiers';
import type { Book } from '../data/books';

export class PaymentsNotConfiguredError extends Error {}
export class PaymentApiError extends Error {}

// Shared shape consumed by RazorpayCheckoutModal — both a subscription
// order and a one-time tier-purchase order carry these same fields.
export interface CheckoutOrder {
  orderId: string;
  amount: number; // paise
  currency: string;
  keyId: string;
  label: string;
}

export interface OrderInfo extends CheckoutOrder {
  planId: SubscriptionPlan['id'];
}

export interface TierOrderInfo extends CheckoutOrder {
  tier: PremiumTier['tier'];
}

export interface BookOrderInfo extends CheckoutOrder {
  bookId: Book['id'];
}

function requireBackendUrl(): string {
  if (!PAYMENTS_BACKEND_URL) {
    throw new PaymentsNotConfiguredError(
      'Payments backend is not set up yet — add PAYMENTS_BACKEND_URL in src/config/apiKeys.ts once the backend is deployed.'
    );
  }
  return PAYMENTS_BACKEND_URL.replace(/\/$/, '');
}

// Attaches the signed-in user's Supabase access token so the backend can
// verify who's actually asking — never trust a user id sent from the app.
async function authHeaders(): Promise<Record<string, string>> {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export interface RazorpaySuccessPayload {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

// ---- Subscription plans ----

export async function createOrder(planId: SubscriptionPlan['id']): Promise<OrderInfo> {
  const base = requireBackendUrl();
  let res: Response;
  try {
    res = await fetch(`${base}/api/create-order`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...(await authHeaders()) },
      body: JSON.stringify({ planId }),
    });
  } catch {
    throw new PaymentApiError('Could not reach the payments server. Check your internet connection.');
  }
  if (res.status === 401) {
    throw new PaymentApiError('Please sign in to subscribe.');
  }
  if (!res.ok) {
    throw new PaymentApiError('Could not start the payment. Please try again in a moment.');
  }
  return (await res.json()) as OrderInfo;
}

export async function verifyPayment(
  payload: RazorpaySuccessPayload,
  planId: SubscriptionPlan['id']
): Promise<{ verified: boolean; paymentId?: string; currentPeriodEnd?: string | null }> {
  const base = requireBackendUrl();
  let res: Response;
  try {
    res = await fetch(`${base}/api/verify-payment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...(await authHeaders()) },
      body: JSON.stringify({ ...payload, planId }),
    });
  } catch {
    throw new PaymentApiError('Could not reach the payments server to confirm your payment.');
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.verified) {
    return { verified: false };
  }
  return { verified: true, paymentId: data.paymentId, currentPeriodEnd: data.currentPeriodEnd ?? null };
}

// ---- Account membership status (source of truth lives in Supabase) ----

export interface ServerEntitlements {
  isSubscribed: boolean;
  planId: SubscriptionPlan['id'] | null;
  lastPaymentId: string | null;
  currentPeriodEnd: string | null;
  purchasedBooks: string[];
}

export async function getEntitlements(): Promise<ServerEntitlements> {
  const base = requireBackendUrl();
  const headers = await authHeaders();
  if (!headers.Authorization) {
    return { isSubscribed: false, planId: null, lastPaymentId: null, currentPeriodEnd: null, purchasedBooks: [] };
  }
  let res: Response;
  try {
    res = await fetch(`${base}/api/get-entitlements`, { method: 'GET', headers });
  } catch {
    throw new PaymentApiError('Could not reach the payments server to load your membership.');
  }
  if (!res.ok) {
    throw new PaymentApiError('Could not load your membership status.');
  }
  const data = (await res.json()) as Partial<ServerEntitlements>;
  // Defensive: never trust the network response shape blindly — an older
  // deployed backend build or a partial response could omit a field, and
  // callers like BooksScreen do purchasedBooks.includes(...) unguarded.
  return {
    isSubscribed: !!data.isSubscribed,
    planId: data.planId ?? null,
    lastPaymentId: data.lastPaymentId ?? null,
    currentPeriodEnd: data.currentPeriodEnd ?? null,
    purchasedBooks: Array.isArray(data.purchasedBooks) ? data.purchasedBooks : [],
  };
}

// ---- One-time premium lesson-tier purchases ----

export async function createTierOrder(tier: PremiumTier['tier']): Promise<TierOrderInfo> {
  const base = requireBackendUrl();
  let res: Response;
  try {
    res = await fetch(`${base}/api/create-tier-order`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tier }),
    });
  } catch {
    throw new PaymentApiError('Could not reach the payments server. Check your internet connection.');
  }
  if (!res.ok) {
    throw new PaymentApiError('Could not start the payment. Please try again in a moment.');
  }
  return (await res.json()) as TierOrderInfo;
}

// ---- Paper Trading balance refill (one-time, no login required — the
// balance itself is local/on-device, not tied to a Supabase account) ----

export interface RefillOrderInfo extends CheckoutOrder {
  virtualCash: number;
}

export async function createRefillOrder(): Promise<RefillOrderInfo> {
  const base = requireBackendUrl();
  let res: Response;
  try {
    res = await fetch(`${base}/api/create-refill-order`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
  } catch {
    throw new PaymentApiError('Could not reach the payments server. Check your internet connection.');
  }
  if (!res.ok) {
    throw new PaymentApiError('Could not start the payment. Please try again in a moment.');
  }
  return (await res.json()) as RefillOrderInfo;
}

export async function verifyRefillPayment(
  payload: RazorpaySuccessPayload
): Promise<{ verified: boolean; paymentId?: string }> {
  const base = requireBackendUrl();
  let res: Response;
  try {
    res = await fetch(`${base}/api/verify-refill-payment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new PaymentApiError('Could not reach the payments server to confirm your payment.');
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.verified) {
    return { verified: false };
  }
  return { verified: true, paymentId: data.paymentId };
}

export async function verifyTierPayment(
  payload: RazorpaySuccessPayload,
  tier: PremiumTier['tier']
): Promise<{ verified: boolean; paymentId?: string }> {
  const base = requireBackendUrl();
  let res: Response;
  try {
    res = await fetch(`${base}/api/verify-tier-payment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...payload, tier }),
    });
  } catch {
    throw new PaymentApiError('Could not reach the payments server to confirm your payment.');
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.verified) {
    return { verified: false };
  }
  return { verified: true, paymentId: data.paymentId };
}

// ---- One-time book purchases (English/Tamil/Hindi guide, quiz booklet) —
// account-tied like a subscription, so ownership survives a reinstall. ----

export async function createBookOrder(bookId: Book['id']): Promise<BookOrderInfo> {
  const base = requireBackendUrl();
  const url = `${base}/api/create-book-order`;
  let res: Response;
  try {
    res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...(await authHeaders()) },
      body: JSON.stringify({ bookId }),
    });
  } catch (e) {
    // Temporary diagnostic: include the actual network error and the URL we
    // tried, instead of a generic message, so we can see exactly what fails.
    const detail = e instanceof Error ? `${e.name}: ${e.message}` : String(e);
    throw new PaymentApiError(`Could not reach the payments server. [${url}] [${detail}]`);
  }
  if (res.status === 401) {
    throw new PaymentApiError('Please sign in to buy this book.');
  }
  if (!res.ok) {
    // Temporary diagnostic: include the real status + response body.
    let bodyText = '';
    try {
      bodyText = (await res.text()).slice(0, 200);
    } catch {
      bodyText = '(could not read body)';
    }
    throw new PaymentApiError(`Could not start the payment. [status ${res.status}] [${bodyText}]`);
  }
  return (await res.json()) as BookOrderInfo;
}

export async function verifyBookPayment(
  payload: RazorpaySuccessPayload,
  bookId: Book['id']
): Promise<{ verified: boolean; paymentId?: string; purchasedBooks?: string[] }> {
  const base = requireBackendUrl();
  let res: Response;
  try {
    res = await fetch(`${base}/api/verify-book-payment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...(await authHeaders()) },
      body: JSON.stringify({ ...payload, bookId }),
    });
  } catch {
    throw new PaymentApiError('Could not reach the payments server to confirm your payment.');
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.verified) {
    return { verified: false };
  }
  return { verified: true, paymentId: data.paymentId, purchasedBooks: data.purchasedBooks };
}
