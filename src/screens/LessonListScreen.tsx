import { StyleSheet, Text, View, Pressable, SectionList, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColors } from '../context/ThemeContext';
import type { ThemeColors } from '../theme/colors';
import { spacing, radius, fonts } from '../theme/spacing';
import { lessons, tiers } from '../data/lessons';
import { languages, LangCode } from '../data/languages';
import { useLanguage } from '../context/LanguageContext';
import { useEntitlements } from '../context/EntitlementsContext';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { LessonsStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<LessonsStackParamList, 'LessonList'>;

export default function LessonListScreen({ navigation }: Props) {
  const colors = useThemeColors();
  const styles = makeStyles(colors);
  const { language, setLanguage } = useLanguage();
  const { isSubscribed } = useEntitlements();

  const isLocked = (tier: string, id: number) => {
    if (tier === 'Beginner' && id <= 5) return false; // first 5 lessons always free
    return !isSubscribed;
  };

  const goToPremium = () => {
    Alert.alert('Locked lesson', 'Subscribe to Niveshaa membership to unlock all lessons.', [
      { text: 'Not now', style: 'cancel' },
      {
        text: 'See plans',
        onPress: () => (navigation.getParent() as any)?.navigate('ProfileTab', { screen: 'Subscription' }),
      },
    ]);
  };

  const sections = tiers.map((tier) => ({
    title: tier,
    data: lessons.filter((l) => l.tier === tier),
  }));

  return (
    <View style={styles.container}>
      <View style={styles.langBarWrap}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: spacing.lg, gap: spacing.sm }}
        >
          {languages.map((l) => {
            const active = l.code === language;
            return (
              <Pressable
                key={l.code}
                disabled={!l.available}
                onPress={() => setLanguage(l.code as LangCode)}
                style={[
                  styles.langPill,
                  active && styles.langPillActive,
                  !l.available && styles.langPillDisabled,
                ]}
              >
                <Text style={[styles.langPillText, active && styles.langPillTextActive]}>
                  {l.nativeLabel}
                </Text>
                {!l.available && <Text style={styles.langPillSoon}>soon</Text>}
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      <SectionList
        sections={sections}
        keyExtractor={(item) => String(item.id)}
        stickySectionHeadersEnabled={false}
        renderSectionHeader={({ section }) => (
          <Text style={styles.sectionHeader}>{section.title.toUpperCase()}</Text>
        )}
        renderItem={({ item, index, section }) => {
          const locked = isLocked(item.tier, item.id);
          return (
            <>
              <Pressable
                style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
                onPress={() =>
                  locked
                    ? goToPremium()
                    : navigation.navigate('LessonDetail', { lessonId: item.id })
                }
              >
                <Text style={styles.lessonNum}>{String(item.id).padStart(2, '0')}</Text>
                <Text style={[styles.lessonTitle, locked && styles.lessonTitleLocked]} numberOfLines={2}>
                  {item.title[language] ?? item.title.en}
                </Text>
                <Ionicons
                  name={locked ? 'lock-closed' : 'chevron-forward'}
                  size={locked ? 15 : 17}
                  color={locked ? colors.textLight : colors.textLight}
                />
              </Pressable>
              {index < section.data.length - 1 && <View style={styles.rowDivider} />}
            </>
          );
        }}
        renderSectionFooter={() => <View style={{ height: spacing.xl }} />}
        contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingTop: spacing.md }}
      />
    </View>
  );
}

const makeStyles = (colors: ThemeColors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  langBarWrap: {
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  langPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: spacing.md,
    paddingVertical: 7,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
  },
  langPillActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  langPillDisabled: { opacity: 0.5 },
  langPillText: { fontFamily: fonts.medium, fontSize: 13, color: colors.text },
  langPillTextActive: { color: '#fff' },
  langPillSoon: { fontFamily: fonts.regular, fontSize: 9, color: colors.textLight },
  sectionHeader: {
    fontFamily: fonts.semiBold,
    fontSize: 12,
    color: colors.textMuted,
    letterSpacing: 0.6,
    marginBottom: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  rowPressed: { backgroundColor: colors.surface },
  rowDivider: { height: 1, backgroundColor: colors.divider, marginLeft: 36 },
  lessonNum: {
    fontFamily: fonts.semiBold,
    fontSize: 12.5,
    color: colors.textLight,
    width: 28,
  },
  lessonTitle: { fontFamily: fonts.medium, fontSize: 14.5, color: colors.text, flex: 1, paddingRight: spacing.sm },
  lessonTitleLocked: { color: colors.textLight },
});
