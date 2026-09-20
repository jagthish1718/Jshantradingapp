import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LessonListScreen from '../screens/LessonListScreen';
import LessonDetailScreen from '../screens/LessonDetailScreen';
import LessonQuizScreen from '../screens/LessonQuizScreen';
import AskDoubtScreen from '../screens/AskDoubtScreen';
import { useThemeColors } from '../context/ThemeContext';
import type { ThemeColors } from '../theme/colors';
import { fonts } from '../theme/spacing';
import type { LessonsStackParamList } from './types';

const Stack = createNativeStackNavigator<LessonsStackParamList>();

export default function LessonsNavigator() {
  const colors = useThemeColors();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: '#fff',
        headerTitleStyle: { fontFamily: fonts.semiBold, fontSize: 16, color: '#fff' },
      }}
    >
      <Stack.Screen name="LessonList" component={LessonListScreen} options={{ title: 'Lessons' }} />
      <Stack.Screen name="LessonDetail" component={LessonDetailScreen} options={{ title: 'Lesson' }} />
      <Stack.Screen name="LessonQuiz" component={LessonQuizScreen} options={{ headerShown: false }} />
      <Stack.Screen name="AskDoubt" component={AskDoubtScreen} options={{ title: 'Ask AI Coach' }} />
    </Stack.Navigator>
  );
}
