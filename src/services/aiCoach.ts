import { PAYMENTS_BACKEND_URL } from '../config/apiKeys';
import type { LangCode } from '../data/languages';

export class ApiKeyMissingError extends Error {}
export class CoachApiError extends Error {}

export interface ChatTurn {
  role: 'user' | 'model';
  text: string;
}

const LANG_NAMES: Record<LangCode, string> = {
  en: 'English',
  ta: 'Tamil',
  hi: 'Hindi',
  te: 'Telugu',
  kn: 'Kannada',
  ml: 'Malayalam',
};

// The actual Gemini call happens server-side (nivesha-payments-backend's
// /api/ai-coach) so the API key never ships inside the app bundle — every
// caller here just builds a prompt and relays it through this one helper.
async function callCoachBackend(history: ChatTurn[], systemInstruction: string): Promise<string> {
  if (!PAYMENTS_BACKEND_URL) {
    throw new ApiKeyMissingError();
  }

  let res: Response;
  try {
    res = await fetch(`${PAYMENTS_BACKEND_URL}/api/ai-coach`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ history, systemInstruction }),
    });
  } catch (e) {
    throw new CoachApiError('Network error reaching the AI coach. Check your internet connection.');
  }

  if (!res.ok) {
    if (res.status === 500) {
      throw new ApiKeyMissingError();
    }
    throw new CoachApiError(`AI coach is having trouble right now (${res.status}). Try again in a bit.`);
  }

  const json = await res.json();
  const text = (json?.text ?? '').trim();
  if (!text) {
    throw new CoachApiError('The AI coach could not come up with an answer. Try rephrasing your question.');
  }
  return text;
}

function buildSystemInstruction(
  lessonTitle: string | null,
  lessonContext: string | null,
  language: LangCode
): string {
  const langName = LANG_NAMES[language] ?? 'English';
  let instruction =
    `You are "Coach", the friendly AI trading coach inside Niveshaa, a stock market learning app ` +
    `for Indian retail beginners. IMPORTANT: keep every answer short — 2 to 4 sentences, under 80 words ` +
    `— unless the user explicitly asks for more detail. Be warm, encouraging and simple — explain any jargon the moment you use it. You teach ` +
    `concepts and general market education only: never recommend buying or selling a specific stock, ` +
    `never predict prices, and never guarantee returns. If asked for a stock tip, gently redirect to ` +
    `teaching the underlying concept instead. Reply in ${langName} by default, matching the app's own ` +
    `lesson content, unless the user writes in a different language — then reply in their language.`;
  if (lessonTitle) {
    instruction +=
      `\n\nThe user is asking about the lesson "${lessonTitle}". Here is that lesson's content for ` +
      `grounding (you may also draw on general trading knowledge beyond it):\n\n${lessonContext ?? ''}`;
  }
  return instruction;
}

export async function askCoach(
  history: ChatTurn[],
  opts: { lessonTitle: string | null; lessonContext: string | null; language: LangCode }
): Promise<string> {
  const systemInstruction = buildSystemInstruction(opts.lessonTitle, opts.lessonContext, opts.language);
  return callCoachBackend(history, systemInstruction);
}

// ---------------------------------------------------------------------
// Trading Journal AI insights — a one-shot "chat" where the single user
// turn is a compact summary of the journal, not a real conversation.
// ---------------------------------------------------------------------

export interface JournalEntrySummary {
  symbol: string;
  direction: 'Buy' | 'Sell';
  entryPrice: number;
  exitPrice: number | null;
  pnlPercent: number | null;
  notes: string;
  date: string;
}

function buildJournalSystemInstruction(language: LangCode): string {
  const langName = LANG_NAMES[language] ?? 'English';
  return (
    `You are "Coach", the AI trading coach inside Niveshaa, a stock market learning app for Indian ` +
    `retail beginners. The user is sharing their PAPER TRADING journal (simulated trades, no real money) ` +
    `and wants a short review of their own patterns. Reply in ${langName}. Keep it to 3-5 short bullet-style ` +
    `sentences, under 130 words total, warm and specific to the numbers given — not generic advice. Point out ` +
    `real patterns you can see (e.g. a symbol or direction that keeps losing, notes that repeat a theme, ` +
    `discipline like always writing a reason vs. not). Never recommend buying or selling a specific real ` +
    `stock, never predict prices, and never guarantee returns — this is reflection on past paper trades only, ` +
    `not investment advice.`
  );
}

function summarizeJournal(entries: JournalEntrySummary[]): string {
  const closed = entries.filter((e) => e.exitPrice !== null);
  const wins = closed.filter((e) => (e.pnlPercent ?? 0) > 0).length;
  const losses = closed.filter((e) => (e.pnlPercent ?? 0) < 0).length;
  const lines = entries.slice(0, 40).map((e) => {
    const pnl = e.pnlPercent !== null ? `${e.pnlPercent >= 0 ? '+' : ''}${e.pnlPercent.toFixed(1)}%` : 'open';
    const note = e.notes ? ` | note: ${e.notes}` : '';
    return `- ${e.direction} ${e.symbol} @ ${e.entryPrice}${e.exitPrice !== null ? ` -> ${e.exitPrice}` : ''} (${pnl})${note}`;
  });
  return (
    `Journal summary: ${entries.length} entries, ${closed.length} closed (${wins} wins, ${losses} losses).\n\n` +
    `Entries (most recent first):\n${lines.join('\n')}`
  );
}

export async function getJournalInsights(
  entries: JournalEntrySummary[],
  language: LangCode
): Promise<string> {
  const systemInstruction = buildJournalSystemInstruction(language);
  const history: ChatTurn[] = [{ role: 'user', text: summarizeJournal(entries) }];
  return callCoachBackend(history, systemInstruction);
}
