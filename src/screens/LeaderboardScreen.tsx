import { useEffect, useState, useCallback } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColors } from '../context/ThemeContext';
import type { ThemeColors } from '../theme/colors';
import { spacing, radius, fonts } from '../theme/spacing';
import { sampleLeaderboard, LeaderboardEntry } from '../data/leaderboard';

const YOUR_BEST_KEY = 'nivesha:quiz:best_score';

const medalColors: Record<number, string> = {
  0: '#D4A537',
  1: '#9AA3B2',
  2: '#B0703A',
};

export default function LeaderboardScreen() {
  const colors = useThemeColors();
  const styles = makeStyles(colors);
  const [yourBest, setYourBest] = useState(0);

  const load = useCallback(async () => {
    try {
      const raw = await AsyncStorage.getItem(YOUR_BEST_KEY);
      setYourBest(raw ? parseInt(raw, 10) : 0);
    } catch {
      // ignore
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [load])
  );

  const combined: LeaderboardEntry[] = [...sampleLeaderboard, { name: 'You', score: yourBest }]
    .sort((a, b) => b.score - a.score);

  return (
    <View style={styles.container}>
      <FlatList
        data={combined}
        keyExtractor={(item, i) => item.name + i}
        contentContainerStyle={{ padding: spacing.lg }}
        renderItem={({ item, index }) => {
          const isYou = item.name === 'You';
          return (
            <View style={[styles.row, isYou && styles.rowYou]}>
              <View style={styles.rankWrap}>
                {index < 3 ? (
                  <Ionicons name="medal" size={18} color={medalColors[index]} />
                ) : (
                  <Text style={styles.rankText}>{index + 1}</Text>
                )}
              </View>
              <Text style={[styles.name, isYou && styles.nameYou]} numberOfLines={1}>
                {item.name}
              </Text>
              <Text style={[styles.score, isYou && styles.nameYou]}>{item.score}</Text>
            </View>
          );
        }}
        ItemSeparatorComponent={() => <View style={styles.divider} />}
        ListHeaderComponent={
          <Text style={styles.note}>
            Sample leaderboard — real rankings will sync once accounts are added.
          </Text>
        }
      />
    </View>
  );
}

const makeStyles = (colors: ThemeColors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  note: { fontFamily: fonts.regular, fontSize: 12, color: colors.textMuted, marginBottom: spacing.md },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm + 2,
  },
  rowYou: { backgroundColor: colors.primaryLight, borderRadius: radius.md, paddingHorizontal: spacing.sm },
  rankWrap: { width: 28, alignItems: 'center' },
  rankText: { fontFamily: fonts.semiBold, fontSize: 13, color: colors.textMuted },
  name: { fontFamily: fonts.medium, fontSize: 14.5, color: colors.text, flex: 1, marginLeft: spacing.sm },
  nameYou: { color: colors.primary, fontFamily: fonts.bold },
  score: { fontFamily: fonts.semiBold, fontSize: 14.5, color: colors.text },
  divider: { height: 1, backgroundColor: colors.divider, marginLeft: 28 },
});
