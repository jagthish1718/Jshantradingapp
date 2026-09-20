import type { LangCode } from './languages';
import { lessons } from './lessons';
import type { LessonQuizQuestion } from './lessons';

export interface QuizQuestion extends LessonQuizQuestion {
  lessonId: number;
}

// Every quiz question across all 50 real TradeWise lessons, flattened into
// one pool (258 questions — 48 lessons x 5, plus the 8-question Beginner
// review and the 10-question course-completion review).
export const allQuizQuestions: QuizQuestion[] = lessons.flatMap((l) =>
  l.quiz.map((q) => ({ ...q, lessonId: l.id }))
);

const DAILY_QUIZ_SIZE = 10;

// Small deterministic PRNG (mulberry32) seeded from a number, so the same
// seed always produces the same shuffle — used to give everyone the same
// "Daily Quiz" set on a given calendar date, and a different one tomorrow.
function mulberry32(seed: number) {
  let s = seed;
  return () => {
    s |= 0;
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function seededShuffle<T>(arr: T[], seed: number): T[] {
  const a = [...arr];
  const rand = mulberry32(seed);
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function dateSeed(d: Date): number {
  const key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
  let h = 0;
  for (let i = 0; i < key.length; i++) h = (Math.imul(31, h) + key.charCodeAt(i)) | 0;
  return h;
}

// The day's quiz: a deterministic 10-question pick from the full pool, the
// same for every user on a given calendar date.
export function getDailyQuiz(date: Date = new Date()): QuizQuestion[] {
  return seededShuffle(allQuizQuestions, dateSeed(date)).slice(0, DAILY_QUIZ_SIZE);
}

export function resolveQuizText(
  field: Partial<Record<LangCode, string>> | undefined,
  language: LangCode
): string {
  return field?.[language] ?? field?.en ?? '';
}

export function resolveQuizOptions(
  field: Partial<Record<LangCode, string[]>> | undefined,
  language: LangCode
): string[] {
  return field?.[language] ?? field?.en ?? [];
}
