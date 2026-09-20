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
}

// unlockedTiers/purchasedBooks are still a local, per-device demo (Books
// isn't wired to real payment yet — see BooksScreen). Real membership
// status (isSubscribed/planId/lastPaymentId/currentPeriodEnd) now lives in
// Supabase, tied to the signed-in account, and is only ever read here —
// never written from the client — so reinstalling the app can't reset it.
interface LocalEntitlementsState {
  unlockedTiers: string[];
  purchasedBooks: string[];
}

interface EntitlementsContextValue extends ServerEntitlementsState, LocalEntitlementsState {
  loaded: boolean;
  refreshEntitlements: () => Promise<void>;
  applyOptimisticSubscription: (planId: PlanId, paymentId: string, currentPeriodEnd?: string | null) => void;
  unlockTier: (tier: string) => void;
  buyBook: (bookId: string) => void;
  resetEntitlements: () => void;
}

const defaultServerState: ServerEntitlementsState = {
  isSubscribed: false,
  planId: null,
  lastPaymentId: null,
  currentPeriodEnd: null,
};
const defaultLocalState: LocalEntitlementsState = {
  unlockedTiers: [],
  purchasedBooks: [],
};

const EntitlementsContext = createContext<EntitlementsContextValue>({
  ...defaultServerState,
  ...defaultLocalState,
  loaded: false,
  refreshEntitlements: async () => {},
  applyOptimisticSubscription: () => {},
  unlockTier: () => {},
  buyBook: () => {},
  resetEntitlements: () => {},
});

export function EntitlementsProvider({ children }: { children: ReactNode }) {
  const { session } = useAuth();
  const [serverState, setServerState] = useState<ServerEntitlementsState>(defaultServerState);
  const [localState, setLocalState] = useState<LocalEntitlementsState>(defaultLocalState);
  const [loaded, setLoaded] = useState(false);

  // Local demo-only fields (Books) — unchanged persistence.
  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEYS.entitlements);
        if (raw) {
          const parsed = JSON.parse(raw);
          setLocalState({
            unlockedTiers: parsed.unlockedTiers ?? [],
            purchasedBooks: parsed.purchasedBooks ?? [],
          });
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
      setServerState(data);
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
      isSubscribed: true,
      planId,
      lastPaymentId: paymentId,
      currentPeriodEnd: currentPeriodEnd ?? prev.currentPeriodEnd,
    }));
    refreshEntitlements();
  };

  const unlockTier = (tier: string) =>
    persistLocal({ ...localState, unlockedTiers: Array.from(new Set([...localState.unlockedTiers, tier])) });
  const buyBook = (bookId: string) =>
    persistLocal({ ...localState, purchasedBooks: Array.from(new Set([...localState.purchasedBooks, bookId])) });

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
        unlockTier,
        buyBook,
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
