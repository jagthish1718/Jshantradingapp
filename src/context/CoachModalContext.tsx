import { createContext, useContext, useState, ReactNode } from 'react';
import { Modal, SafeAreaView, StyleSheet, Platform } from 'react-native';
import CoachChat from '../components/CoachChat';
import { useThemeColors } from './ThemeContext';
import type { ThemeColors } from '../theme/colors';

interface CoachModalContextValue {
  openCoach: (lessonId?: number, lessonTitle?: string) => void;
  closeCoach: () => void;
}

const CoachModalContext = createContext<CoachModalContextValue>({
  openCoach: () => {},
  closeCoach: () => {},
});

export function useCoachModal() {
  return useContext(CoachModalContext);
}

export function CoachModalProvider({ children }: { children: ReactNode }) {
  const colors = useThemeColors();
  const styles = makeStyles(colors);
  const [visible, setVisible] = useState(false);
  const [lessonId, setLessonId] = useState<number | undefined>(undefined);
  const [lessonTitle, setLessonTitle] = useState<string | undefined>(undefined);

  const openCoach = (id?: number, title?: string) => {
    setLessonId(id);
    setLessonTitle(title);
    setVisible(true);
  };
  const closeCoach = () => setVisible(false);

  return (
    <CoachModalContext.Provider value={{ openCoach, closeCoach }}>
      {children}
      <Modal
        visible={visible}
        animationType="slide"
        presentationStyle={Platform.OS === 'ios' ? 'pageSheet' : undefined}
        onRequestClose={closeCoach}
      >
        <SafeAreaView style={styles.modalRoot}>
          <CoachChat lessonId={lessonId} lessonTitle={lessonTitle} onClose={closeCoach} />
        </SafeAreaView>
      </Modal>
    </CoachModalContext.Provider>
  );
}

const makeStyles = (colors: ThemeColors) => StyleSheet.create({
  modalRoot: { flex: 1, backgroundColor: colors.background },
});
