export type LangCode = 'en' | 'ta' | 'hi' | 'te' | 'kn' | 'ml';

export interface LanguageInfo {
  code: LangCode;
  label: string;      // shown in English (for the picker)
  nativeLabel: string; // shown in native script
  available: boolean;
}

export const languages: LanguageInfo[] = [
  { code: 'en', label: 'English', nativeLabel: 'English', available: true },
  { code: 'ta', label: 'Tamil', nativeLabel: 'தமிழ்', available: true },
  { code: 'hi', label: 'Hindi', nativeLabel: 'हिन्दी', available: true },
  { code: 'te', label: 'Telugu', nativeLabel: 'తెలుగు', available: false },
  { code: 'kn', label: 'Kannada', nativeLabel: 'ಕನ್ನಡ', available: false },
  { code: 'ml', label: 'Malayalam', nativeLabel: 'മലയാളം', available: false },
];
