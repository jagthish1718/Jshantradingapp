// Real, free-tier market data keys for Nivesha.
// None of these need a credit card. Sign up, copy the key, paste it below.
// Leave a key blank and that screen will show a friendly "add your key" message
// instead of crashing.

// News — GNews.io — https://gnews.io/register — free: 100 requests/day
export const GNEWS_API_KEY = 'b38fd1b99ccd4ae89f41ed7a65756f38';

// Company prices — Twelve Data — https://twelvedata.com/register
// free: 800 requests/day, 8/min, NSE (India) supported
export const TWELVE_DATA_API_KEY = '79fc4774d9834a558ab4695acf8a3f0a';

// IPO details — ipoalerts.in — https://ipoalerts.in
// free: 750 requests/month, 25/day, 6/min
export const IPOALERTS_API_KEY = '66bd916f07562ee38abced98549f3e1e006b4a8b89c9a0fd003a285c14c58d20';

// AI Coach chat — Google Gemini. The key now lives ONLY on the backend
// (nivesha-payments-backend's GEMINI_API_KEY env var on Vercel) — the app
// calls /api/ai-coach instead of Gemini directly, so no key belongs here.
// The old key that used to live in this file was shipped in the app bundle
// and is in git history, so it should be revoked/rotated in Google AI
// Studio and a fresh key pasted into Vercel's env vars, not back here.

// Payments — Razorpay via a tiny serverless backend (never call Razorpay
// directly from the app — the secret key must stay server-side).
// Deploy the sibling nivesha-payments-backend project to Vercel, then paste
// its URL here, e.g. 'https://nivesha-payments-backend.vercel.app'.
export const PAYMENTS_BACKEND_URL: string = 'https://nivesha-payments-backend.vercel.app';

// Accounts — Supabase (email/password + email verification). Free tier.
// The URL and anon key below are meant to be public — access to data is
// controlled by Row Level Security policies on the server, not by keeping
// these secret. The separate service_role key (backend only, never here)
// is what actually reads/writes the entitlements table.
export const SUPABASE_URL = 'https://bmuxutmzvuehovwskhep.supabase.co';
export const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJtdXh1dG16dnVlaG92d3NraGVwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk5MDE5MDcsImV4cCI6MjEwNTQ3NzkwN30.YhvDRuiGdj90zMk7v-ZhPPtlJMn4p9uVfY6zX-4P02U';
