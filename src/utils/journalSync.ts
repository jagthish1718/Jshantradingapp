// Turns Paper Trading's own order history into Trading Journal entries
// automatically, so a student's actual trades (with real P&L) show up as
// journal progress instead of needing to be re-typed by hand. Manual
// entries the user adds directly in the journal are left completely
// untouched -- this only ever creates/updates entries tagged with a
// `tradeKey`, which is how a manual entry is told apart from an
// auto-generated one.
import type { OrderRecord } from '../types/trading';

export type Direction = 'Buy' | 'Sell';

export type JournalEntry = {
  id: string;
  symbol: string;
  direction: Direction;
  entryPrice: number;
  exitPrice: number | null;
  notes: string;
  date: string;
  // Present only on entries generated from Paper Trading's order history.
  source?: 'paper-trading';
  // Stable id for the round-trip (open -> close) this entry represents,
  // so re-syncing updates the same entry instead of duplicating it, and a
  // user-deleted auto entry can be recognised and left deleted.
  tradeKey?: string;
};

// Replays one symbol's own orders (oldest first) into a sequence of
// round-trip journal entries, using the exact same running-average-cost
// math the rest of the app uses for its own holdings (PaperTradingScreen /
// OptionOrderScreen) — so a journal entry's numbers always agree with what
// Paper Trading itself showed while that position was live. Tracked with
// plain primitives (not a reassigned object) since the position's shape
// never changes, only its numbers.
function replaySymbol(symbol: string, orders: OrderRecord[]): JournalEntry[] {
  const out: JournalEntry[] = [];
  let qty = 0; // signed — positive = long, negative = short/written
  let avgPrice = 0;
  let tradeKey = '';

  const openEntry = (key: string, direction: Direction, price: number, date: string) => {
    out.push({
      id: key,
      symbol,
      direction,
      entryPrice: price,
      exitPrice: null,
      notes: '',
      date,
      source: 'paper-trading',
      tradeKey: key,
    });
  };
  const findOpenByKey = (key: string) => out.find((e) => e.tradeKey === key && e.exitPrice === null);

  for (const order of orders) {
    const delta: number = order.side === 'BUY' ? order.qty : -order.qty;

    if (qty === 0) {
      // Starting fresh from flat.
      const key = `${symbol}#${order.id}`;
      qty = delta;
      avgPrice = order.price;
      tradeKey = key;
      openEntry(key, delta > 0 ? 'Buy' : 'Sell', order.price, order.timestamp);
      continue;
    }

    const newQty: number = qty + delta;
    const sameSide: boolean = newQty === 0 || Math.sign(newQty) === Math.sign(qty);

    if (sameSide) {
      if (newQty === 0) {
        // Fully closed.
        const entry = findOpenByKey(tradeKey);
        if (entry) entry.exitPrice = order.price;
        qty = 0;
      } else if (Math.abs(newQty) > Math.abs(qty)) {
        // Adding to the open position — recompute the running average
        // cost exactly like Holding.avgPrice does.
        const newAvg: number = (avgPrice * Math.abs(qty) + order.price * order.qty) / Math.abs(newQty);
        const entry = findOpenByKey(tradeKey);
        if (entry) entry.entryPrice = newAvg;
        avgPrice = newAvg;
        qty = newQty;
      } else {
        // A partial reduce that doesn't fully close — leaves entryPrice
        // untouched, same as the app's own holdings (which don't book
        // realized P&L on a partial exit either).
        qty = newQty;
      }
    } else {
      // The order flipped the position through zero in one go (e.g. a
      // sell larger than the existing long, covering + writing in the
      // same order) — close the old side at this price, then open the
      // new side with the remainder.
      const entry = findOpenByKey(tradeKey);
      if (entry) entry.exitPrice = order.price;
      const key = `${symbol}#${order.id}-flip`;
      qty = newQty;
      avgPrice = order.price;
      tradeKey = key;
      openEntry(key, newQty > 0 ? 'Buy' : 'Sell', order.price, order.timestamp);
    }
  }

  return out;
}

export function deriveAutoEntriesFromOrders(orders: OrderRecord[]): JournalEntry[] {
  const sorted = [...orders].sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
  const bySymbol = new Map<string, OrderRecord[]>();
  for (const o of sorted) {
    if (!bySymbol.has(o.symbol)) bySymbol.set(o.symbol, []);
    bySymbol.get(o.symbol)!.push(o);
  }
  const out: JournalEntry[] = [];
  for (const [symbol, symOrders] of bySymbol) out.push(...replaySymbol(symbol, symOrders));
  return out.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// Merges freshly-derived auto entries into the existing journal:
//  - a manual entry (no tradeKey) is left exactly as the user made it
//  - an auto entry the user deleted (tradeKey in dismissedKeys) stays gone
//  - a still-tracked auto entry gets its numbers refreshed, but any notes
//    the user added to it are preserved
//  - a brand-new round-trip is appended
export function mergeAutoJournalEntries(
  existing: JournalEntry[],
  freshAuto: JournalEntry[],
  dismissedKeys: ReadonlySet<string>
): JournalEntry[] {
  const manual = existing.filter((e) => !e.tradeKey);
  const priorByKey = new Map(existing.filter((e) => e.tradeKey).map((e) => [e.tradeKey as string, e]));

  const mergedAuto: JournalEntry[] = [];
  for (const fresh of freshAuto) {
    const key = fresh.tradeKey as string;
    if (dismissedKeys.has(key)) continue;
    const prior = priorByKey.get(key);
    mergedAuto.push(prior ? { ...fresh, notes: prior.notes } : fresh);
  }

  return [...mergedAuto, ...manual].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
