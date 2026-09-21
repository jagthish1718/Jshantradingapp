import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from '../screens/ProfileScreen';
import SubscriptionScreen from '../screens/SubscriptionScreen';
import PremiumScreen from '../screens/PremiumScreen';
import BooksScreen from '../screens/BooksScreen';
import AuthScreen from '../screens/AuthScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { useThemeColors } from '../context/ThemeContext';
import type { ThemeColors } from '../theme/colors';
import { fonts } from '../theme/spacing';
import type { ProfileStackParamList } from './types';

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export default function ProfileNavigator() {
  const colors = useThemeColors();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: '#fff',
        headerTitleStyle: { fontFamily: fonts.semiBold, fontSize: 16, color: '#fff' },
      }}
    >
      <Stack.Screen name="ProfileMain" component={ProfileScreen} options={{ title: 'Profile' }} />
      <Stack.Screen name="Subscription" component={SubscriptionScreen} options={{ title: 'Subscription' }} />
      <Stack.Screen name="Premium" component={PremiumScreen} options={{ title: 'Premium Lessons' }} />
      <Stack.Screen name="Books" component={BooksScreen} options={{ title: 'Books' }} />
      <Stack.Screen name="Auth" component={AuthScreen} options={{ title: 'Account' }} />
      <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: 'Settings' }} />
    </Stack.Navigator>
  );
}
