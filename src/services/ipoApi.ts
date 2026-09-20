import { IPOALERTS_API_KEY } from '../config/apiKeys';

export type IPOStatus = 'open' | 'upcoming' | 'listed' | 'closed' | 'unknown';

export interface IPOListing {
  id: string;
  companyName: string;
  status: IPOStatus;
  priceRangeLabel: string | null;
  openDate: string | null;
  closeDate: string | null;
  listingDate: string | null;
  lotSize: number | null;
  issueSizeLabel: string | null;
  gmpLabel: string | null;
  // Full raw record from ipoalerts.in — kept as a fallback in case a field
  // isn't mapped above yet (their schema has 30+ fields).
  raw: any;
}

export class ApiKeyMissingError extends Error {}
export class PlanRestrictedError extends Error {}
export class RateLimitedError extends Error {}

// The ipoalerts.in free plan caps `limit` at 1 result per request (verified:
// limit=50 returns a 400 "Limit must be less than or equal to 1"), so
// multiple IPOs means paging one at a time. Free plan is also capped at
// 6 requests/minute and 25/day — pages are fetched ONE AT A TIME (not in
// parallel) with a small gap between them so a single screen load can't
// burst past the per-minute limit on its own, and results are cached for
// a minute so switching tabs back and forth doesn't re-spend the quota.
const MAX_PAGES_PER_LOAD = 5;
const REQUEST_GAP_MS = 350;
const CACHE_TTL_MS = 60_000;

const cache: Partial<Record<IPOStatus, { data: IPOListing[]; at: number }>> = {};

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function normalizeStatus(s: unknown): IPOStatus {
  const v = String(s ?? '').toLowerCase();
  if (v.includes('open')) return 'open';
  if (v.includes('upcoming') || v.includes('pre')) return 'upcoming';
  if (v.includes('list')) return 'listed';
  if (v.includes('close')) return 'closed';
  return 'unknown';
}

function mapIPO(raw: any): IPOListing {
  let priceRangeLabel: string | null = null;
  if (raw.priceRange) {
    const parts = String(raw.priceRange).split('-');
    priceRangeLabel =
      parts.length === 2 ? `₹${parts[0].trim()} – ₹${parts[1].trim()}` : `₹${raw.priceRange}`;
  } else if (raw.price_range) {
    priceRangeLabel = raw.price_range;
  }

  return {
    id: String(raw.id ?? raw.symbol ?? raw.slug ?? raw.name ?? Math.random()),
    companyName: raw.name ?? raw.company_name ?? raw.companyName ?? 'Unknown company',
    status: normalizeStatus(raw.status),
    priceRangeLabel,
    openDate: raw.startDate ?? raw.open_date ?? raw.openDate ?? null,
    closeDate: raw.endDate ?? raw.close_date ?? raw.closeDate ?? null,
    listingDate: raw.listingDate ?? raw.listing_date ?? null,
    lotSize: raw.minQty ?? raw.lot_size ?? raw.lotSize ?? null,
    issueSizeLabel: raw.issueSize ?? raw.issue_size ?? null,
    gmpLabel: raw.gmp != null ? `₹${raw.gmp}` : raw.gmp_label ?? raw.gmpLabel ?? null,
    raw,
  };
}

async function fetchPage(status: IPOStatus | undefined, page: number) {
  // The ipoalerts.in free plan requires `status` and only accepts "open" —
  // "upcoming"/"listed" return a 400 "not supported for free plan users".
  const qs = new URLSearchParams({ limit: '1', page: String(page), status: status ?? 'open' });
  const res = await fetch(`https://api.ipoalerts.in/ipos?${qs.toString()}`, {
    headers: { 'x-api-key': IPOALERTS_API_KEY },
  });
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    if (res.status === 429) {
      throw new RateLimitedError('Too many IPO requests — please wait a minute and try again.');
    }
    if (res.status === 400 && /free plan/i.test(body)) {
      throw new PlanRestrictedError(`"${status}" needs a paid ipoalerts.in plan`);
    }
    throw new Error(`IPO request failed (${res.status}): ${body.slice(0, 200)}`);
  }
  return res.json();
}

export async function fetchIPOs(status?: IPOStatus): Promise<IPOListing[]> {
  if (!IPOALERTS_API_KEY) {
    throw new ApiKeyMissingError('ipoalerts.in API key missing');
  }

  const key = status ?? 'open';
  const cached = cache[key];
  if (cached && Date.now() - cached.at < CACHE_TTL_MS) {
    return cached.data;
  }

  const first = await fetchPage(status, 1);
  const items: any[] = Array.isArray(first) ? first : first.ipos ?? [];
  const totalPages: number = first?.meta?.totalPages ?? items.length;
  const pagesToFetch = Math.min(totalPages, MAX_PAGES_PER_LOAD);

  // Sequential, not parallel — a burst of simultaneous requests trips the
  // free plan's per-minute limit even when the total count is within quota.
  for (let page = 2; page <= pagesToFetch; page++) {
    await sleep(REQUEST_GAP_MS);
    const pageData = await fetchPage(status, page);
    const pageItems: any[] = Array.isArray(pageData) ? pageData : pageData.ipos ?? [];
    items.push(...pageItems);
  }

  const mapped = items.map(mapIPO);
  cache[key] = { data: mapped, at: Date.now() };
  return mapped;
}
