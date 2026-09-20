import AuthForm from '../components/AuthForm';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { ProfileStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<ProfileStackParamList, 'Auth'>;

// Reached mid-flow (e.g. tapping "Subscribe" while signed out) — just the
// form, returning to whatever screen sent the person here once they log in.
export default function AuthScreen({ navigation, route }: Props) {
  return (
    <AuthForm initialMode={route.params?.mode ?? 'signup'} onLoggedIn={() => navigation.goBack()} />
  );
}
