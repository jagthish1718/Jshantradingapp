export interface ChecklistItem {
  id: string;
  label: string;
  icon: string; // Ionicons name
}

export const dailyChecklistItems: ChecklistItem[] = [
  { id: 'lesson', label: "Complete today's lesson", icon: 'book-outline' },
  { id: 'quiz', label: 'Take the daily quiz', icon: 'trophy-outline' },
  { id: 'news', label: "Read today's business news", icon: 'newspaper-outline' },
  { id: 'practice', label: 'Practice on paper trading (15 min)', icon: 'trending-up-outline' },
  { id: 'journal', label: "Review yesterday's journal entries", icon: 'journal-outline' },
];
