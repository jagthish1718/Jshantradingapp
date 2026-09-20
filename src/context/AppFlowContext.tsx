import { createContext, useContext, ReactNode } from 'react';

interface AppFlowContextValue {
  replayOnboarding: () => void;
}

const AppFlowContext = createContext<AppFlowContextValue>({
  replayOnboarding: () => {},
});

export function AppFlowProvider({
  value,
  children,
}: {
  value: AppFlowContextValue;
  children: ReactNode;
}) {
  return <AppFlowContext.Provider value={value}>{children}</AppFlowContext.Provider>;
}

export function useAppFlow() {
  return useContext(AppFlowContext);
}
