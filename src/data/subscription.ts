export interface SubscriptionPlan {
  id: 'monthly' | 'quarterly' | 'half_yearly' | 'annual';
  label: string;
  durationLabel: string;
  price: string; // regular price, pre-GST
  priceNote: string;
  perMonth: string; // effective per-month rate, for comparison across plans
  newUserPrice: string; // first-ever-subscription price (5% off), pre-GST
  newUserPriceNote: string;
  savingsBadge?: string; // vs. paying monthly
  badge?: string;
}

// Every plan unlocks the exact same thing — all lessons, paper trading,
// journal and AI Coach — so the difference between plans is only duration
// and price, never features. Shown once above the plan cards.
export const sharedPlanFeatures = [
  'All 50 lessons — Beginner to Advanced',
  'Full paper trading simulator with live charts',
  'Trading journal with win-rate & performance charts',
  'Daily quiz + leaderboard access',
  'Unlimited AI Coach doubt-clearing on every lesson',
];

// PLACEHOLDER pricing — matches the model discussed for Nivesha. First-time
// subscribers get a genuine 5% new-member price; it applies once, the first
// time someone on this device ever subscribes (see EntitlementsContext).
export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'monthly',
    label: 'Monthly',
    durationLabel: '1 month',
    price: '₹142',
    priceNote: '+GST · ₹168 total',
    perMonth: '₹142/month',
    newUserPrice: '₹135',
    newUserPriceNote: '+GST · ₹159 total',
  },
  {
    id: 'quarterly',
    label: '3 Months',
    durationLabel: '3 months',
    price: '₹399',
    priceNote: '+GST · ₹471 total',
    perMonth: '₹133/month',
    newUserPrice: '₹379',
    newUserPriceNote: '+GST · ₹447 total',
    savingsBadge: 'Save 6% vs monthly',
  },
  {
    id: 'half_yearly',
    label: '6 Months',
    durationLabel: '6 months',
    price: '₹749',
    priceNote: '+GST · ₹884 total',
    perMonth: '₹125/month',
    newUserPrice: '₹712',
    newUserPriceNote: '+GST · ₹840 total',
    savingsBadge: 'Save 12% vs monthly',
  },
  {
    id: 'annual',
    label: 'Annual',
    durationLabel: '12 months',
    price: '₹1,429',
    priceNote: '+GST · ₹1,686 total',
    perMonth: '₹119/month',
    newUserPrice: '₹1,358',
    newUserPriceNote: '+GST · ₹1,602 total',
    savingsBadge: 'Save 16% vs monthly',
    badge: 'Best value',
  },
];
