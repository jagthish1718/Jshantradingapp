// Real leaderboard, synced through Supabase (see the SQL migration handed
// to the user — table `quiz_leaderboard`, RLS restricts every row's writes
// to its own owner and a 0-100 CHECK constraint caps how high a score can
// even be, matching the daily quiz's max of 10/10 * 10 pts).
import { supabase } from '../lib/supabaseClient';

export interface LeaderboardRow {
  user_id: string;
  display_name: string;
  best_score: number;
  updated_at: string;
}

export async function fetchTopScores(limit = 50): Promise<LeaderboardRow[]> {
  const { data, error } = await supabase
    .from('quiz_leaderboard')
    .select('user_id, display_name, best_score, updated_at')
    .order('best_score', { ascending: false })
    .limit(limit);
  if (error) throw error;
  return data ?? [];
}

export async function fetchMyRow(userId: string): Promise<LeaderboardRow | null> {
  const { data, error } = await supabase
    .from('quiz_leaderboard')
    .select('user_id, display_name, best_score, updated_at')
    .eq('user_id', userId)
    .maybeSingle();
  if (error) throw error;
  return data ?? null;
}

// Only writes when `score` actually beats the stored best — cheap guard
// against a stale/duplicate call clobbering a higher score with a lower
// one (e.g. two quiz attempts finishing out of order).
export async function submitScoreIfBest(userId: string, displayName: string, score: number): Promise<void> {
  const existing = await fetchMyRow(userId);
  if (existing && existing.best_score >= score) return;
  const { error } = await supabase.from('quiz_leaderboard').upsert({
    user_id: userId,
    display_name: displayName,
    best_score: score,
    updated_at: new Date().toISOString(),
  });
  if (error) throw error;
}
