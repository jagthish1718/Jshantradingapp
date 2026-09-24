import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import ChecklistScreen from '../screens/ChecklistScreen';
import PaperTradingScreen from '../screens/PaperTradingScreen';
import TradingJournalScreen from '../screens/TradingJournalScreen';
import ProChartScreen from '../screens/ProChartScreen';
import PositionChartScreen from '../screens/PositionChartScreen';
import OptionsChainScreen from '../screens/OptionsChainScreen';
import OptionOrderScreen from '../screens/OptionOrderScreen';
import NewsScreen from '../screens/NewsScreen';
import CompaniesScreen from '../screens/CompaniesScreen';
import IPODetailsScreen from '../screens/IPODetailsScreen';
import { useThemeColors } from '../context/ThemeContext';
import type { ThemeColors } from '../theme/colors';
import { fonts } from '../theme/spacing';
import type { HomeStackParamList } from './types';

const Stack = createNativeStackNavigator<HomeStackParamList>();

export default function HomeNavigator() {
  const colors = useThemeColors();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: '#fff',
        headerTitleStyle: { fontFamily: fonts.semiBold, fontSize: 16, color: '#fff' },
      }}
    >
      <Stack.Screen name="HomeMain" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Checklist" component={ChecklistScreen} options={{ title: 'Daily Checklist' }} />
      <Stack.Screen name="PaperTrading" component={PaperTradingScreen} options={{ headerShown: false }} />
      <Stack.Screen name="TradingJournal" component={TradingJournalScreen} options={{ title: 'Trading Journal', headerShown: false }} />
      <Stack.Screen name="ProChart" component={ProChartScreen} options={{ headerShown: false }} />
      <Stack.Screen name="PositionChart" component={PositionChartScreen} options={{ headerShown: false }} />
      <Stack.Screen name="OptionsChain" component={OptionsChainScreen} options={{ headerShown: false }} />
      <Stack.Screen name="OptionOrder" component={OptionOrderScreen} options={{ headerShown: false, presentation: 'modal' }} />
      <Stack.Screen name="News" component={NewsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Companies" component={CompaniesScreen} options={{ headerShown: false }} />
      <Stack.Screen name="IPOs" component={IPODetailsScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
