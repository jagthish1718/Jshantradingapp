import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { LessonsStackParamList } from '../navigation/types';
import CoachChat from '../components/CoachChat';

type Props = NativeStackScreenProps<LessonsStackParamList, 'AskDoubt'>;

// Thin wrapper: this route keeps the nav-stack header (title + back button,
// set in LessonsNavigator), so it hosts CoachChat without its own header.
// The same chat UI is also reachable app-wide as a floating modal — see
// CoachFAB / CoachModalContext — for general questions from any tab.
export default function AskDoubtScreen({ route }: Props) {
  const lessonId = route.params?.lessonId;
  const lessonTitle = route.params?.lessonTitle;
  return <CoachChat lessonId={lessonId} lessonTitle={lessonTitle} />;
}
