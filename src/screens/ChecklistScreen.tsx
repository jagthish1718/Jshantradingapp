import { useCallback, useState } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColors } from '../context/ThemeContext';
import type { ThemeColors } from '../theme/colors';
import { spacing, radius, fonts } from '../theme/spacing';
import { dailyChecklistItems } from '../data/checklist';

function todayKey() {
  const d = new Date();
  const iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  return `nivesha:checklist:${iso}`;
}

export default function ChecklistScreen() {
  const colors = useThemeColors();
  const styles = makeStyles(colors);
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [loaded, setLoaded] = useState(false);

  const load = useCallback(async () => {
    try {
      const raw = await AsyncStorage.getItem(todayKey());
      setChecked(raw ? JSON.parse(raw) : {});
    } catch {
      setChecked({});
    } finally {
      setLoaded(true);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [load])
  );

  const toggle = async (id: string) => {
    const next = { ...checked, [id]: !checked[id] };
    setChecked(next);
    try {
      await AsyncStorage.setItem(todayKey(), JSON.stringify(next));
    } catch {
      // ignore
    }
  };

  const doneCount = dailyChecklistItems.filter((i) => checked[i.id]).length;
  const total = dailyChecklistItems.length;

  if (!loaded) return <View style={styles.container} />;

  return (
    <View style={styles.container}>
      <View style={styles.progressCard}>
        <Text style={styles.progressText}>
          {doneCount} of {total} done today
        </Text>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${(doneCount / total) * 100}%` }]} />
        </View>
      </View>

      {dailyChecklistItems.map((item) => {
        const isDone = !!checked[item.id];
        return (
          <Pressable
            key={item.id}
            style={[styles.item, isDone && styles.itemDone]}
            onPress={() => toggle(item.id)}
          >
            <View style={[styles.checkbox, isDone && styles.checkboxDone]}>
              {isDone && <Ionicons name="checkmark" size={14} color="#fff" />}
            </View>
            <Ionicons
              name={item.icon as any}
              size={18}
              color={isDone ? colors.textLight : colors.primary}
              style={{ marginRight: spacing.sm }}
            />
            <Text style={[styles.itemLabel, isDone && styles.itemLabelDone]}>{item.label}</Text>
          </Pressable>
        );
      })}

      <Text style={styles.footNote}>Resets automatically at midnight.</Text>
    </View>
  );
}

const makeStyles = (colors: ThemeColors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: spacing.lg },
  progressCard: {
    backgroundColor: colors.primaryLight,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  progressText: { fontFamily: fonts.semiBold, fontSize: 14, color: colors.primaryDark, marginBottom: spacing.sm },
  progressTrack: { height: 6, backgroundColor: '#fff', borderRadius: radius.pill, overflow: 'hidden' },
  progressFill: { height: 6, backgroundColor: colors.primary, borderRadius: radius.pill },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  itemDone: { backgroundColor: colors.surface, borderColor: colors.divider },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: radius.sm,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  checkboxDone: { backgroundColor: colors.primary, borderColor: colors.primary },
  itemLabel: { fontFamily: fonts.medium, fontSize: 14.5, color: colors.text, flex: 1 },
  itemLabelDone: { color: colors.textMuted, textDecorationLine: 'line-through' },
  footNote: { fontFamily: fonts.regular, fontSize: 11.5, color: colors.textLight, textAlign: 'center', marginTop: spacing.md },
});
