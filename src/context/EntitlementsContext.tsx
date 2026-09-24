import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../utils/storage';
import { useAuth } from './AuthContext';
import { getEntitlements as fetchServerEntitlements } from '../services/paymentApi';

type PlanId = 'monthly' | 'quarterly' | 'half_yearly' | 'annual';

interface ServerEntitlementsState {
  isSubscribed: boolean;
  planId: PlanId | null;
  lastPaymentId: string | null;
  currentPeriodEnd: string | null;
  purchasedBooks: string[];
}

// unlockedTiers is still a local, per-device demo — tiers are no longer
// sold separately (see PremiumScreen). Everything else — membership status
// and now purchasedBooks too — lives in Supabase, tied to the signed-in
// account, and is only ever read here — never written from the client —
// so reinstalling the app can't reset or fake it.
interface LocalEntitlementsState {
  unlockedTiers: string[];
}

interface EntitlementsContextValue extends ServerEntitlementsState, LocalEntitlementsState {
  loaded: boolean;
  refreshEntitlements: () => Promise<void>;
  applyOptimisticSubscription: (planId: PlanId, paymentId: string, currentPeriodEnd?: string | null) => void;
  applyOptimisticBookPurchase: (bookId: string, purchasedBooks?: string[]) => void;
  unlockTier: (tier: string) => void;
  resetEntitlements: () => void;
}

const defaultServerState: ServerEntitlementsState = {
  isSubscribed: false,
  planId: null,
  lastPaymentId: null,
  currentPeriodEnd: null,
  purchasedBooks: [],
};
const defaultLocalState: LocalEntitlementsState = {
  unlockedTiers: [],
};

const EntitlementsContext = createContext<EntitlementsContextValue>({
  ...defaultServerState,
  ...defaultLocalState,
  loaded: false,
  refreshEntitlements: async () => {},
  applyOptimisticSubscription: () => {},
  applyOptimisticBookPurchase: () => {},
  unlockTier: () => {},
  resetEntitlements: () => {},
});

export function EntitlementsProvider({ children }: { children: ReactNode }) {
  const { session } = useAuth();
  const [serverState, setServerState] = useState<ServerEntitlementsState>(defaultServerState);
  const [localState, setLocalState] = useState<LocalEntitlementsState>(defaultLocalState);
  const [loaded, setLoaded] = useState(false);

  // Local demo-only field (unlockedTiers) — unchanged persistence.
  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEYS.entitlements);
        if (raw) {
          const parsed = JSON.parse(raw);
          setLocalState({ unlockedTiers: parsed.unlockedTiers ?? [] });
        }
      } catch {
        // ignore
      } finally {
        setLoaded(true);
      }
    })();
  }, []);

  const persistLocal = (next: LocalEntitlementsState) => {
    setLocalState(next);
    AsyncStorage.setItem(STORAGE_KEYS.entitlements, JSON.stringify(next)).catch(() => {});
  };

  const refreshEntitlements = async () => {
    if (!session) {
      setServerState(defaultServerState);
      return;
    }
    try {
      const data = await fetchServerEntitlements();
      // Belt-and-suspenders: even though paymentApi already normalizes this,
      // never let a malformed/partial response wipe out purchasedBooks with
      // undefined — that crashes BooksScreen's .includes() check.
      setServerState({
        ...defaultServerState,
        ...data,
        purchasedBooks: Array.isArray(data.purchasedBooks) ? data.purchasedBooks : [],
      });
    } catch {
      // Transient network error — keep whatever we last knew rather than
      // flashing the user back to "not subscribed".
    }
  };

  useEffect(() => {
    refreshEntitlements();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.user?.id]);

  // Called right after a payment verifies, so the UI updates instantly
  // instead of waiting on the next network round-trip. refreshEntitlements()
  // still runs after, so the server stays the real source of truth.
  const applyOptimisticSubscription = (planId: PlanId, paymentId: string, currentPeriodEnd?: string | null) => {
    setServerState((prev) => ({
      ...prev,
      isSubscribed: true,
      planId,
      lastPaymentId: paymentId,
      currentPeriodEnd: currentPeriodEnd ?? prev.currentPeriodEnd,
    }));
    refreshEntitlements();
  };

  // Called right after a book payment verifies, so it shows as owned
  // instantly. If the server already echoed back the full updated list, use
  // that directly; otherwise just add this one book to what we last knew.
  const applyOptimisticBookPurchase = (bookId: string, purchasedBooks?: string[]) => {
    setServerState((prev) => ({
      ...prev,
      purchasedBooks: purchasedBooks ?? Array.from(new Set([...prev.purchasedBooks, bookId])),
    }));
    refreshEntitlements();
  };

  const unlockTier = (tier: string) =>
    persistLocal({ ...localState, unlockedTiers: Array.from(new Set([...localState.unlockedTiers, tier])) });

  // Only clears the local demo fields — real membership lives on the
  // account in Supabase and can't be wiped from the device.
  const resetEntitlements = () => persistLocal({ ...defaultLocalState });

  return (
    <EntitlementsContext.Provider
      value={{
        ...serverState,
        ...localState,
        loaded,
        refreshEntitlements,
        applyOptimisticSubscription,
        applyOptimisticBookPurchase,
        unlockTier,
        resetEntitlements,
      }}
    >
      {children}
    </EntitlementsContext.Provider>
  );
}

export function useEntitlements() {
  return useContext(EntitlementsContext);
}
