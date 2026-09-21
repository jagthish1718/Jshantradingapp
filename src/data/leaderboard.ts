export interface LeaderboardEntry {
  name: string;
  score: number;
}

// Sample rows shown to signed-out players (and as a graceful fallback if the
// live Supabase leaderboard can't be reached). Scores are on the same 0-100
// scale as a real quiz result (10 questions * 10 pts each), so a real score
// ranks sensibly alongside these instead of always landing dead last.
export const sampleLeaderboard: LeaderboardEntry[] = [
  { name: 'Arjun K.', score: 90 },
  { name: 'Priya S.', score: 85 },
  { name: 'Rahul M.', score: 80 },
  { name: 'Divya R.', score: 70 },
  { name: 'Karthik V.', score: 60 },
  { name: 'Sneha P.', score: 50 },
  { name: 'Vignesh T.', score: 40 },
];
