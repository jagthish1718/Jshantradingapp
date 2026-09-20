// Shared paper-trading types — used by PaperTradingScreen, OptionsChainScreen
// and OptionOrderScreen so a position/order looks the same everywhere.
import type { OptionMeta } from '../data/marketSim';

export type { OptionMeta };

export type Holding = {
  symbol: string;
  // Negative qty = a written/short option position (see OptionOrderScreen).
  qty: number;
  avgPrice: number;
  stopLoss: number | null;
  target: number | null;
  trailingPercent: number | null;
  trailingHigh: number | null;
  // Present only for option positions.
  option?: OptionMeta;
  // Intraday (MIS) vs Overnight (NRML) — options-only, cosmetic + shown in UI.
  product?: 'MIS' | 'NRML';
  // Cash blocked as margin against this specific position — only set for a
  // written/short option position (qty < 0). Released back to available
  // cash when the position is closed/covered.
  marginBlocked?: number;
};

export type OrderReason = 'Manual' | 'Stop-Loss' | 'Target' | 'Trailing SL';

export type OrderRecord = {
  id: string;
  symbol: string;
  side: 'BUY' | 'SELL';
  qty: number;
  price: number;
  reason: OrderReason;
  timestamp: string;
  // Order-entry realism fields (options orders only — undefined for plain
  // equity trades placed from the Market tab).
  orderKind?: 'Regular' | 'Iceberg';
  product?: 'MIS' | 'NRML';
  priceType?: 'Market' | 'Limit';
  validity?: 'DAY' | 'IOC' | 'MIN';
  validityMinutes?: number;
  disclosedQty?: number;
  triggerPrice?: number;
  marketProtection?: boolean;
};

export type SimState = {
  cash: number;
  holdings: Holding[];
  orders: OrderRecord[];
};

export const STARTING_SIM: SimState = { cash: 0, holdings: [], orders: [] };

// Total cash tied up as margin against short/written option positions —
// not spendable, but not lost either. Always derived from holdings, never
// stored separately, so it can never drift out of sync.
export function totalBlockedMargin(holdings: Holding[]): number {
  return holdings.reduce((sum, h) => sum + (h.marginBlocked ?? 0), 0);
}
