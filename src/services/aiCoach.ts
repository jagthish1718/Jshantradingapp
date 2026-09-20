import { GEMINI_API_KEY } from '../config/apiKeys';
import type { LangCode } from '../data/languages';

export class ApiKeyMissingError extends Error {}
export class CoachApiError extends Error {}

// gemini-3.5-flash-lite: Google's fastest model, tuned for quick chat replies
// (this app needs short, punchy coaching answers, not long essays), free tier.
const MODEL = 'gemini-3.5-flash-lite';
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

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
  if (!GEMINI_API_KEY) {
    throw new ApiKeyMissingError();
  }

  const body = {
    systemInstruction: {
      parts: [{ text: buildSystemInstruction(opts.lessonTitle, opts.lessonContext, opts.language) }],
    },
    contents: history.map((t) => ({
      role: t.role,
      parts: [{ text: t.text }],
    })),
    generationConfig: {
      temperature: 0.6,
      maxOutputTokens: 220,
    },
  };

  let res: Response;
  try {
    res = await fetch(`${ENDPOINT}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  } catch (e) {
    throw new CoachApiError('Network error reaching the AI coach. Check your internet connection.');
  }

  if (!res.ok) {
    const errText = await res.text().catch(() => '');
    if (res.status === 400 || res.status === 401 || res.status === 403) {
      throw new ApiKeyMissingError();
    }
    throw new CoachApiError(`AI coach is having trouble right now (${res.status}). Try again in a bit.`);
  }

  const json = await res.json();
  const text = json?.candidates?.[0]?.content?.parts?.map((p: any) => p.text ?? '').join('') ?? '';
  if (!text.trim()) {
    throw new CoachApiError('The AI coach could not come up with an answer. Try rephrasing your question.');
  }
  return text.trim();
}
