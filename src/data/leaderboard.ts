export interface LeaderboardEntry {
  name: string;
  score: number;
}

// PLACEHOLDER top entries — real leaderboard needs a backend/account system.
// "You" row is inserted at runtime using the locally stored score.
export const sampleLeaderboard: LeaderboardEntry[] = [
  { name: 'Arjun K.', score: 480 },
  { name: 'Priya S.', score: 465 },
  { name: 'Rahul M.', score: 452 },
  { name: 'Divya R.', score: 441 },
  { name: 'Karthik V.', score: 430 },
  { name: 'Sneha P.', score: 418 },
  { name: 'Vignesh T.', score: 405 },
];
