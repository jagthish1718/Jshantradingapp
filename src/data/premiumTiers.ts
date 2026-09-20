export interface PremiumTier {
  tier: 'Beginner' | 'Intermediate' | 'Advanced';
  price: string;
  priceNote: string;
  description: string;
  lessonRange: string;
}

// One-time lesson-tier unlocks. First 5 Beginner lessons are always free.
// Every tier — including the free preview — includes unlimited AI Coach
// doubt-clearing, so that perk isn't repeated per-row on screen.
export const premiumTiers: PremiumTier[] = [
  {
    tier: 'Beginner',
    price: '₹99',
    priceNote: '+GST · one-time',
    lessonRange: 'Lessons 1–15',
    description: 'Trading basics, order types & market fundamentals (first 5 lessons free)',
  },
  {
    tier: 'Intermediate',
    price: '₹159',
    priceNote: '+GST · one-time',
    lessonRange: 'Lessons 16–35',
    description: 'Chart reading, indicators & risk management',
  },
  {
    tier: 'Advanced',
    price: '₹259',
    priceNote: '+GST · one-time',
    lessonRange: 'Lessons 36–50',
    description: 'Strategy building, options basics & portfolio discipline',
  },
];
