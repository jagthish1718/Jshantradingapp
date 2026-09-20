// Clean but colorful fintech palette — royal blue brand + accent pops.
// Split into light/dark so the app can offer a real dark theme; see
// ../context/ThemeContext.tsx for the hook that picks between them.

export interface ThemeColors {
  primary: string;
  primaryDark: string;
  primaryLight: string;
  background: string;
  surface: string;
  text: string;
  textMuted: string;
  textLight: string;
  border: string;
  divider: string;
  success: string;
  successBg: string;
  danger: string;
  dangerBg: string;
  gold: string;
  goldBg: string;
  teal: string;
  tealBg: string;
  purple: string;
  purpleBg: string;
  tierColors: Record<string, string>;
  tierBg: Record<string, string>;
}

export const lightColors: ThemeColors = {
  primary: '#2E4BDE',        // royal blue — main brand color
  primaryDark: '#1F35A6',
  primaryLight: '#EAEEFF',
  background: '#FFFFFF',
  surface: '#F7F8FC',
  text: '#12141C',
  textMuted: '#666D80',
  textLight: '#A0A7B8',
  border: '#EBEDF3',
  divider: '#F1F2F7',
  success: '#0F8A46',
  successBg: '#EAF7EF',
  danger: '#D6373C',
  dangerBg: '#FCEAEA',

  gold: '#D4A537',
  goldBg: '#FBF1DA',
  teal: '#0EA5A0',
  tealBg: '#E2F7F6',
  purple: '#7C3AED',
  purpleBg: '#F1EAFE',

  tierColors: {
    Beginner: '#2E4BDE',
    Intermediate: '#D4A537',
    Advanced: '#D6373C',
  },
  tierBg: {
    Beginner: '#EAEEFF',
    Intermediate: '#FBF1DA',
    Advanced: '#FCEAEA',
  },
};

export const darkColors: ThemeColors = {
  primary: '#6C87FF',
  primaryDark: '#8DA1FF',
  primaryLight: '#1E2340',
  background: '#0E0F14',
  surface: '#181A22',
  text: '#F2F3F7',
  textMuted: '#9AA0B4',
  textLight: '#6B7180',
  border: '#262935',
  divider: '#20222C',
  success: '#3DDC84',
  successBg: '#123322',
  danger: '#FF7B7B',
  dangerBg: '#3A1416',

  gold: '#E8C168',
  goldBg: '#332A12',
  teal: '#2DD4CF',
  tealBg: '#0F2E2C',
  purple: '#B69CFB',
  purpleBg: '#241A3D',

  tierColors: {
    Beginner: '#6C87FF',
    Intermediate: '#E8C168',
    Advanced: '#FF7B7B',
  },
  tierBg: {
    Beginner: '#1E2340',
    Intermediate: '#332A12',
    Advanced: '#3A1416',
  },
};

// Kept for any file still on the old static import during migration —
// always the light palette. Prefer useThemeColors() from ThemeContext.
export const colors = lightColors;
