// Shared, single-source-of-truth market simulator.
//
// Both PaperTradingScreen and OptionsChainScreen used to run their own,
// separate price ticks — which meant an option position bought on the
// Options Chain screen never moved once it landed in your Portfolio (its
// symbol wasn't one of the plain INSTRUMENTS, so the old per-screen price
// map had nothing for it). This module fixes that: one ticking spot-price
// engine, plus pure functions to price any option (and its Greeks) off
// that spot on demand — so a position's live price is always derived
// fresh, never stale.
import { INSTRUMENTS } from './instruments';

export const STARTING_CASH = 100000;
export const TICK_MS = 2500;
const HISTORY_CAP = 24;

// Realistic pace, calibrated off NIFTY: a real index never jumps hundreds
// of points inside a second, so every tick is bounded to move at somewhere
// between REF_MIN_PTS_PER_SEC and REF_MAX_PTS_PER_SEC a second (direction
// random each tick). Every other instrument gets the same *relative*
// pace, scaled by its own price level, so a ₹1,265 stock and the ₹24,800
// index both feel equally calm/lively instead of one dwarfing the other.
export const REF_BASE = 24800;
export const REF_MAX_PTS_PER_SEC = 10;
export const REF_MIN_PTS_PER_SEC = 0.1;

// Fractional (percentage-of-price) volatility for a single 1-MINUTE candle
// on any instrument, derived from the same per-second pace above via
// sqrt(time) scaling — the standard way volatility grows with elapsed
// time. Anything that synthesizes its own price history (like a chart's
// older, simulated candles) should build off this constant rather than
// inventing a separate figure, so the synthetic history and the real,
// live-ticking price always look like they belong to the same series.
const AVG_PTS_PER_SEC = (REF_MIN_PTS_PER_SEC + REF_MAX_PTS_PER_SEC) / 2;
export const FRACTIONAL_VOL_PER_MINUTE = (AVG_PTS_PER_SEC / REF_BASE) * Math.sqrt(60);

type Listener = () => void;

const prices: Record<string, number> = {};
const history: Record<string, number[]> = {};
const listeners = new Set<Listener>();
let intervalId: ReturnType<typeof setInterval> | null = null;

function perSecondRange(base: number): { min: number; max: number } {
  const scale = base / REF_BASE;
  return { min: REF_MIN_PTS_PER_SEC * scale, max: REF_MAX_PTS_PER_SEC * scale };
}

// One bounded, randomly-signed price step over `seconds` of elapsed time.
function randomStep(base: number, seconds: number): number {
  const { min, max } = perSecondRange(base);
  const ratePerSec = min + Math.random() * (max - min);
  const sign = Math.random() < 0.5 ? -1 : 1;
  return sign * ratePerSec * seconds;
}

function seed() {
  INSTRUMENTS.forEach((ins) => {
    const points: number[] = [];
    let price = ins.base;
    for (let i = 0; i < 12; i++) {
      // Seed as if the same bounded ticker had already been running.
      price = Math.max(ins.base * 0.85, price + randomStep(ins.base, TICK_MS / 1000));
      points.push(Math.round(price * 100) / 100);
    }
    history[ins.symbol] = points;
    prices[ins.symbol] = points[points.length - 1];
  });
}
seed();

function tick() {
  INSTRUMENTS.forEach((ins) => {
    const prev = prices[ins.symbol] ?? ins.base;
    let next = prev + randomStep(ins.base, TICK_MS / 1000);
    next = Math.max(ins.base * 0.7, Math.min(ins.base * 1.3, next));
    next = Math.round(next * 100) / 100;
    prices[ins.symbol] = next;
    const hist = history[ins.symbol] ?? [];
    hist.push(next);
    if (hist.length > HISTORY_CAP) hist.shift();
    history[ins.symbol] = hist;
  });
  listeners.forEach((l) => l());
}

// Starts the shared tick loop the first time any screen needs it; safe to
// call from every screen's mount — later calls are no-ops.
export function ensureStarted() {
  if (intervalId) return;
  intervalId = setInterval(tick, TICK_MS);
}

// Subscribe to receive a call on every tick (for re-render bumps). Returns
// an unsubscribe function.
export function subscribe(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getPrice(symbol: string): number {
  return prices[symbol] ?? INSTRUMENTS.find((i) => i.symbol === symbol)?.base ?? 0;
}

export function getHistory(symbol: string): number[] {
  return history[symbol] ?? [];
}

export function getAllPrices(): Record<string, number> {
  return prices;
}

// ---------------------------------------------------------------------
// Options pricing (simplified, not real Black-Scholes — tuned to look
// and move plausibly for a learning simulator, same as before).
// ---------------------------------------------------------------------

export function optionPremium(spot: number, strike: number, isCall: boolean): number {
  const intrinsic = isCall ? Math.max(0, spot - strike) : Math.max(0, strike - spot);
  const distance = Math.abs(spot - strike);
  const timeValue = Math.max(1.5, spot * 0.018 * Math.exp(-distance / (spot * 0.045)));
  return Math.round((intrinsic + timeValue) * 100) / 100;
}

export interface OptionGreeks {
  delta: number;
  gamma: number;
  theta: number;
  vega: number;
  iv: number;
}

// Directionally-correct approximations of the real Greeks — delta rises
// from ~0 to ~1 (calls) or ~-1 to ~0 (puts) as spot moves through the
// strike, gamma peaks at-the-money, theta/vega decay with distance from
// spot. Good enough to teach "what do the Greeks mean", not a pricing model.
export function optionGreeks(spot: number, strike: number, isCall: boolean): OptionGreeks {
  const distance = spot - strike;
  const scale = spot * 0.045;
  const sigmoid = 1 / (1 + Math.exp(-distance / scale));
  const delta = isCall ? sigmoid : sigmoid - 1;
  const gamma = Math.max(0.0001, (1 / scale) * sigmoid * (1 - sigmoid));
  const iv = Math.min(45, Math.max(11, 14 + Math.abs(distance) / (spot * 0.01)));
  const theta = -Math.max(0.4, spot * 0.0009 * Math.exp(-Math.abs(distance) / (spot * 0.05)));
  const vega = Math.max(0.4, spot * 0.001 * Math.exp(-Math.abs(distance) / (spot * 0.06)));
  return {
    delta: Math.round(delta * 100) / 100,
    gamma: Math.round(gamma * 10000) / 10000,
    theta: Math.round(theta * 100) / 100,
    vega: Math.round(vega * 100) / 100,
    iv: Math.round(iv * 10) / 10,
  };
}

export interface OptionMeta {
  underlying: string;
  strike: number;
  type: 'CE' | 'PE';
  expiry: string;
  lotSize: number;
}

export function optionSymbol(opt: OptionMeta): string {
  return `${opt.underlying} ${opt.strike} ${opt.type} ${opt.expiry}`;
}

// Live premium for any holding — plain equity/index price if it's not an
// option, else derived fresh from the current spot of its underlying.
export function getLivePrice(h: { symbol: string; option?: OptionMeta }): number {
  if (h.option) {
    const spot = getPrice(h.option.underlying);
    return optionPremium(spot, h.option.strike, h.option.type === 'CE');
  }
  return getPrice(h.symbol);
}

// Simplified SPAN-style margin estimate for writing (shorting) an option —
// real exchanges compute this from volatility scenarios; here it's a flat,
// clearly-labelled approximation so the "margin required" figure in the
// order screen still tracks spot and lot size realistically.
export function estimateWriteMargin(spot: number, lotSize: number, lots: number): number {
  return Math.round(spot * lotSize * lots * 0.15);
}
