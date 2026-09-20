import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeNavigator from './HomeNavigator';
import LessonsNavigator from './LessonsNavigator';
import QuizNavigator from './QuizNavigator';
import ProfileNavigator from './ProfileNavigator';
import { useThemeColors } from '../context/ThemeContext';
import type { ThemeColors } from '../theme/colors';
import CoachFAB from '../components/CoachFAB';
import { fonts, radius } from '../theme/spacing';
import type { RootTabParamList } from './types';

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function AppNavigator() {
  const colors = useThemeColors();
  return (
    <NavigationContainer>
      <View style={{ flex: 1 }}>
        <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.textLight,
          tabBarStyle: {
            backgroundColor: colors.background,
            borderTopColor: colors.border,
            borderTopWidth: 1,
            height: 60,
            paddingBottom: 6,
            paddingTop: 8,
            elevation: 0,
            shadowOpacity: 0,
          },
          tabBarLabelStyle: { fontSize: 10.5, fontFamily: fonts.medium, marginTop: 2 },
          tabBarIcon: ({ color, size, focused }) => {
            const icons: Record<string, [any, any]> = {
              Home: ['home', 'home-outline'],
              LessonsTab: ['book', 'book-outline'],
              QuizTab: ['trophy', 'trophy-outline'],
              ProfileTab: ['person', 'person-outline'],
            };
            const [filled, outline] = icons[route.name] ?? ['ellipse', 'ellipse-outline'];
            return (
              <View
                style={{
                  width: 40,
                  height: 26,
                  borderRadius: radius.pill,
                  backgroundColor: focused ? colors.primaryLight : 'transparent',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Ionicons name={focused ? filled : outline} size={20} color={color} />
              </View>
            );
          },
        })}
      >
          <Tab.Screen name="Home" component={HomeNavigator} options={{ title: 'Home' }} />
          <Tab.Screen name="LessonsTab" component={LessonsNavigator} options={{ title: 'Lessons' }} />
          <Tab.Screen name="QuizTab" component={QuizNavigator} options={{ title: 'Quiz' }} />
          <Tab.Screen name="ProfileTab" component={ProfileNavigator} options={{ title: 'Profile' }} />
        </Tab.Navigator>
        <CoachFAB />
      </View>
    </NavigationContainer>
  );
}
