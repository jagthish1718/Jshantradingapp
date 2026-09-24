import type { OptionMeta } from '../data/marketSim';

export type LessonsStackParamList = {
  LessonList: undefined;
  LessonDetail: { lessonId: number };
  LessonQuiz: { lessonId: number };
  AskDoubt: { lessonId: number; lessonTitle: string };
};

export type HomeStackParamList = {
  HomeMain: undefined;
  Checklist: undefined;
  PaperTrading: undefined;
  TradingJournal: undefined;
  ProChart: { symbol: string };
  PositionChart: { symbol: string; qty: number; avgPrice: number; option?: OptionMeta };
  OptionsChain: undefined;
  OptionOrder: {
    underlying: string;
    strike: number;
    optType: 'CE' | 'PE';
    expiry: string;
    lotSize: number;
    side?: 'BUY' | 'SELL';
  };
  News: undefined;
  Companies: undefined;
  IPOs: undefined;
};

export type QuizStackParamList = {
  QuizMain: undefined;
  Leaderboard: undefined;
};

export type ProfileStackParamList = {
  ProfileMain: undefined;
  Subscription: undefined;
  Premium: undefined;
  Books: undefined;
  Auth: { mode?: 'signup' | 'login' } | undefined;
  Settings: undefined;
};

export type RootTabParamList = {
  Home: undefined;
  LessonsTab: undefined;
  QuizTab: undefined;
  ProfileTab: undefined;
};
