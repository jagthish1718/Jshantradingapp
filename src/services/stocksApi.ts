// Live NSE prices via Yahoo Finance's public chart endpoint — no API key,
// no per-key rate limit. (Twelve Data's free plan blocks almost every real
// NSE large-cap symbol with a 403 "not available with your plan" — verified
// against RELIANCE, TCS, HDFCBANK, ICICIBANK, SBIN, ITC, BHARTIARTL, LT —
// so it isn't usable here even though it's a "real" API.)

export interface CompanyQuote {
  symbol: string;
  name: string;
  close: number;
  change: number;
  percentChange: number;
  open: number;
  high: number;
  low: number;
  previousClose: number;
  volume: number;
  fiftyTwoWeekLow: number | null;
  fiftyTwoWeekHigh: number | null;
}

async function fetchOne(symbol: string): Promise<CompanyQuote | null> {
  try {
    const res = await fetch(
      `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}.NS`
    );
    if (!res.ok) return null;
    const json = await res.json();
    const meta = json?.chart?.result?.[0]?.meta;
    if (!meta || typeof meta.regularMarketPrice !== 'number') return null;

    const close = meta.regularMarketPrice;
    const previousClose = meta.previousClose ?? meta.chartPreviousClose ?? close;
    const change = close - previousClose;

    return {
      symbol,
      name: meta.longName ?? meta.shortName ?? symbol,
      close,
      change,
      percentChange: previousClose ? (change / previousClose) * 100 : 0,
      open: meta.regularMarketDayLow ?? close,
      high: meta.regularMarketDayHigh ?? close,
      low: meta.regularMarketDayLow ?? close,
      previousClose,
      volume: meta.regularMarketVolume ?? 0,
      fiftyTwoWeekLow: meta.fiftyTwoWeekLow ?? null,
      fiftyTwoWeekHigh: meta.fiftyTwoWeekHigh ?? null,
    };
  } catch {
    return null;
  }
}

export async function fetchCompanyQuotes(symbols: string[]): Promise<CompanyQuote[]> {
  const results = await Promise.all(symbols.map(fetchOne));
  return results.filter((q): q is CompanyQuote => q !== null);
}
