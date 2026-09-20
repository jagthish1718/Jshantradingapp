import { StyleSheet, Text, View, Pressable, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColors } from '../context/ThemeContext';
import type { ThemeColors } from '../theme/colors';
import { spacing, radius, fonts } from '../theme/spacing';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { HomeStackParamList } from '../navigation/types';
import NiveshaLogo from '../components/NiveshaLogo';
import { useProfile } from '../context/ProfileContext';
import { getGreeting } from '../utils/greeting';

type Props = NativeStackScreenProps<HomeStackParamList, 'HomeMain'>;

interface Tile {
  icon: keyof typeof Ionicons.glyphMap;
  cardColor: string;
  label: string;
  onPress: () => void;
}

export default function HomeScreen({ navigation }: Props) {
  const colors = useThemeColors();
  const styles = makeStyles(colors);
  const { name, photoUri } = useProfile();

  const continueLearning: Tile[] = [
    {
      icon: 'book',
      cardColor: colors.primary,
      label: 'Lessons',
      onPress: () => (navigation.getParent() as any)?.navigate('LessonsTab'),
    },
    {
      icon: 'trophy',
      cardColor: colors.gold,
      label: 'Daily Quiz',
      onPress: () => (navigation.getParent() as any)?.navigate('QuizTab'),
    },
    {
      icon: 'checkmark-done',
      cardColor: colors.teal,
      label: 'Checklist',
      onPress: () => navigation.navigate('Checklist'),
    },
  ];

  const markets: Tile[] = [
    {
      icon: 'newspaper',
      cardColor: colors.primaryDark,
      label: 'Business News',
      onPress: () => navigation.navigate('News'),
    },
    {
      icon: 'business',
      cardColor: colors.teal,
      label: 'Companies',
      onPress: () => navigation.navigate('Companies'),
    },
    {
      icon: 'rocket',
      cardColor: colors.gold,
      label: 'IPO Details',
      onPress: () => navigation.navigate('IPOs'),
    },
  ];

  const practiceTools: Tile[] = [
    {
      icon: 'trending-up',
      cardColor: colors.teal,
      label: 'Paper Trading',
      onPress: () => navigation.navigate('PaperTrading'),
    },
    {
      icon: 'journal',
      cardColor: colors.purple,
      label: 'Trading Journal',
      onPress: () => navigation.navigate('TradingJournal'),
    },
  ];

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <View style={styles.headerTopRow}>
          <View style={styles.brandRow}>
            <NiveshaLogo size={68} />
            <View>
              <Text style={styles.greeting}>{getGreeting()}</Text>
              <Text style={styles.brand}>{name}</Text>
            </View>
          </View>
          <Pressable
            style={styles.avatar}
            onPress={() => (navigation.getParent() as any)?.navigate('ProfileTab')}
          >
            {photoUri ? (
              <Image source={{ uri: photoUri }} style={styles.avatarPhoto} />
            ) : (
              <Ionicons name="person" size={16} color="#fff" />
            )}
          </Pressable>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statCell}>
            <Text style={styles.statValue}>0</Text>
            <Text style={styles.statLabel}>Day streak</Text>
          </View>
          <View style={styles.statCellDivider} />
          <View style={styles.statCell}>
            <Text style={styles.statValue}>0/50</Text>
            <Text style={styles.statLabel}>Lessons done</Text>
          </View>
          <View style={styles.statCellDivider} />
          <View style={styles.statCell}>
            <Text style={styles.statValue}>—</Text>
            <Text style={styles.statLabel}>Quiz rank</Text>
          </View>
        </View>
      </View>

      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Continue learning</Text>
        <CardGrid tiles={continueLearning} styles={styles} />

        <Text style={styles.sectionTitle}>Practice tools</Text>
        <CardGrid tiles={practiceTools} styles={styles} />

        <Text style={styles.sectionTitle}>Markets</Text>
        <CardGrid tiles={markets} styles={styles} />

        <View style={{ height: spacing.xxl }} />
      </ScrollView>
    </View>
  );
}

function CardGrid({ tiles, styles }: { tiles: Tile[]; styles: ReturnType<typeof makeStyles> }) {
  // If there's an odd one out, let the last tile span the full row instead
  // of leaving empty space next to it.
  const isLastOdd = tiles.length % 2 === 1;
  return (
    <View style={styles.cardGrid}>
      {tiles.map((t, i) => {
        const isTrailingOdd = isLastOdd && i === tiles.length - 1;
        return (
          <Pressable
            key={t.label}
            style={({ pressed }) => [
              styles.card,
              isTrailingOdd && styles.cardWide,
              { backgroundColor: t.cardColor },
              pressed && styles.cardPressed,
            ]}
            onPress={t.onPress}
          >
            <Ionicons name={t.icon} size={22} color="#fff" />
            <Text style={[styles.cardLabel, isTrailingOdd && styles.cardLabelWide]} numberOfLines={2}>
              {t.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const makeStyles = (colors: ThemeColors) => StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  header: {
    backgroundColor: colors.primary,
    paddingTop: 58,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
    borderBottomLeftRadius: radius.xl,
    borderBottomRightRadius: radius.xl,
  },
  headerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.lg,
  },
  brandRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  greeting: { fontFamily: fonts.regular, fontSize: 13, color: 'rgba(255,255,255,0.75)', marginBottom: 2 },
  brand: { fontFamily: fonts.displayBold, fontSize: 27, color: '#fff' },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  avatarPhoto: { width: 38, height: 38, borderRadius: 19 },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: radius.lg,
    paddingVertical: spacing.md,
  },
  statCell: { flex: 1, alignItems: 'center' },
  statCellDivider: { width: 1, backgroundColor: 'rgba(255,255,255,0.2)' },
  statValue: { fontFamily: fonts.bold, fontSize: 17, color: '#fff' },
  statLabel: { fontFamily: fonts.regular, fontSize: 10.5, color: 'rgba(255,255,255,0.75)', marginTop: 3 },
  body: { flex: 1, paddingHorizontal: spacing.lg, paddingTop: spacing.lg },
  sectionTitle: {
    fontFamily: fonts.semiBold,
    fontSize: 12,
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginBottom: spacing.sm,
  },
  cardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  card: {
    width: '48.5%',
    borderRadius: radius.xl,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.sm,
    justifyContent: 'space-between',
    minHeight: 80,
  },
  cardWide: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    minHeight: 60,
  },
  cardPressed: { opacity: 0.85 },
  cardLabel: {
    fontFamily: fonts.semiBold,
    fontSize: 13,
    color: '#fff',
    marginTop: spacing.sm,
  },
  cardLabelWide: { marginTop: 0, marginLeft: spacing.xs },
});
