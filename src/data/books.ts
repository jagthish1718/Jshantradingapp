export interface Book {
  id: string;
  title: string;
  language: string;
  pages: number;
  price: string;
  description: string;
  isLessonContent: boolean; // true = this book IS the lesson content as a PDF
}

// PLACEHOLDER catalog. The English/Tamil/Hindi books are PDF exports of the
// exact same 50-lesson content sold inside the app via Premium tier unlocks —
// so once a learner owns all 3 tiers (or is a member), those PDFs are
// included free rather than charged again. The quiz booklet is separate,
// additional content (not lesson material), so it stays independently priced.
export const books: Book[] = [
  {
    id: 'book-en',
    title: 'Niveshaa Trading Guide',
    language: 'English',
    pages: 125,
    price: '₹149',
    description: 'Full 50-lesson course as a downloadable PDF — read the whole guide anywhere, no app needed.',
    isLessonContent: true,
  },
  {
    id: 'book-ta',
    title: 'நிவேஷா டிரேடிங் வழிகாட்டி',
    language: 'Tamil',
    pages: 137,
    price: '₹149',
    description: 'Same course, complete Tamil translation — the typeset PDF edition is still being finalized; all 50 lessons are already available in Tamil inside the app today.',
    isLessonContent: true,
  },
  {
    id: 'book-hi',
    title: 'निवेशा ट्रेडिंग गाइड',
    language: 'Hindi',
    pages: 118,
    price: '₹149',
    description: 'Same course, complete Hindi translation — the typeset PDF edition is still being finalized; all 50 lessons are already available in Hindi inside the app today.',
    isLessonContent: true,
  },
  {
    id: 'book-quiz',
    title: 'Daily Quiz Booklet',
    language: 'English',
    pages: 106,
    price: '₹79',
    description: '258 questions across all 50 lessons, with full answer key & explanations — extra content, not in the lessons.',
    isLessonContent: false,
  },
];
