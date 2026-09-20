import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../utils/storage';

export type TradingExperience = 'Beginner' | 'Intermediate' | 'Experienced';
export type Gender = 'Male' | 'Female' | 'Other';

interface ProfileState {
  name: string;
  photoUri: string | null;
  tradingExperience: TradingExperience | null;
  gender: Gender | null;
  age: string;
  city: string;
  occupation: string;
}

interface ProfileContextValue extends ProfileState {
  loaded: boolean;
  setName: (name: string) => void;
  setPhotoUri: (uri: string | null) => void;
  setTradingExperience: (level: TradingExperience) => void;
  setGender: (gender: Gender) => void;
  updateBiodata: (fields: Partial<Pick<ProfileState, 'age' | 'city' | 'occupation'>>) => void;
  resetProfile: () => void;
}

const defaultState: ProfileState = {
  name: 'Trader',
  photoUri: null,
  tradingExperience: null,
  gender: null,
  age: '',
  city: '',
  occupation: '',
};

const ProfileContext = createContext<ProfileContextValue>({
  ...defaultState,
  loaded: false,
  setName: () => {},
  setPhotoUri: () => {},
  setTradingExperience: () => {},
  setGender: () => {},
  updateBiodata: () => {},
  resetProfile: () => {},
});

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ProfileState>(defaultState);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEYS.profile);
        if (raw) setState({ ...defaultState, ...JSON.parse(raw) });
      } catch {
        // ignore
      } finally {
        setLoaded(true);
      }
    })();
  }, []);

  const persist = (next: ProfileState) => {
    setState(next);
    AsyncStorage.setItem(STORAGE_KEYS.profile, JSON.stringify(next)).catch(() => {});
  };

  const setName = (name: string) => persist({ ...state, name: name.trim() || 'Trader' });
  const setPhotoUri = (uri: string | null) => persist({ ...state, photoUri: uri });
  const setTradingExperience = (level: TradingExperience) => persist({ ...state, tradingExperience: level });
  const setGender = (gender: Gender) => persist({ ...state, gender });
  const updateBiodata = (fields: Partial<Pick<ProfileState, 'age' | 'city' | 'occupation'>>) =>
    persist({ ...state, ...fields });
  const resetProfile = () => persist({ ...defaultState });

  return (
    <ProfileContext.Provider
      value={{ ...state, loaded, setName, setPhotoUri, setTradingExperience, setGender, updateBiodata, resetProfile }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  return useContext(ProfileContext);
}
