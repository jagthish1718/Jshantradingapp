import { StyleSheet, Text, View, Pressable, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColors } from '../context/ThemeContext';
import type { ThemeColors } from '../theme/colors';
import { spacing, radius, fonts } from '../theme/spacing';
import { books } from '../data/books';
import { useEntitlements } from '../context/EntitlementsContext';

export default function BooksScreen() {
  const colors = useThemeColors();
  const styles = makeStyles(colors);
  const { purchasedBooks, buyBook, isSubscribed } = useEntitlements();
  const hasFullLessonAccess = isSubscribed;

  return (
    <FlatList
      style={styles.container}
      data={books}
      keyExtractor={(b) => b.id}
      contentContainerStyle={{ padding: spacing.lg }}
      ItemSeparatorComponent={() => <View style={{ height: spacing.md }} />}
      ListHeaderComponent={
        <>
          <Text style={styles.intro}>
            Download the lesson content as PDFs for offline reading.
          </Text>
          {!hasFullLessonAccess && (
            <View style={styles.hintBox}>
              <Ionicons name="information-circle" size={16} color={colors.primary} />
              <Text style={styles.hintText}>
                The English/Tamil/Hindi books are the same content as the in-app lessons — they're
                included free with a Niveshaa membership, no need to buy separately.
              </Text>
            </View>
          )}
        </>
      }
      renderItem={({ item }) => {
        const includedFree = item.isLessonContent && hasFullLessonAccess;
        const owned = purchasedBooks.includes(item.id) || includedFree;
        return (
          <View style={styles.card}>
            <View style={styles.coverWrap}>
              <Ionicons name="book" size={24} color={colors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.title} numberOfLines={2}>
                {item.title}
              </Text>
              <Text style={styles.meta}>
                {item.language} · {item.pages} pages
              </Text>
              <Text style={styles.desc} numberOfLines={2}>
                {item.description}
              </Text>
            </View>
            {owned ? (
              <View style={styles.ownedTag}>
                <Ionicons name="checkmark-circle" size={16} color={colors.success} />
                <Text style={styles.ownedText}>{includedFree ? 'Included' : 'Owned'}</Text>
              </View>
            ) : (
              <Pressable style={styles.buyButton} onPress={() => buyBook(item.id)}>
                <Text style={styles.buyButtonText}>{item.price}</Text>
              </Pressable>
            )}
          </View>
        );
      }}
      ListFooterComponent={
        <Text style={styles.footNote}>
          Demo mode — "buying" a book just flips a local flag. Ready to connect real downloads and
          a payment gateway later.
        </Text>
      }
    />
  );
}

const makeStyles = (colors: ThemeColors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  intro: { fontFamily: fonts.regular, fontSize: 13.5, color: colors.textMuted, lineHeight: 20, marginBottom: spacing.md },
  hintBox: {
    flexDirection: 'row',
    gap: spacing.sm,
    backgroundColor: colors.primaryLight,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  hintText: { flex: 1, fontFamily: fonts.regular, fontSize: 12, color: colors.primaryDark, lineHeight: 17 },
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    padding: spacing.md,
  },
  coverWrap: {
    width: 44,
    height: 56,
    borderRadius: radius.sm,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { fontFamily: fonts.semiBold, fontSize: 14.5, color: colors.text },
  meta: { fontFamily: fonts.medium, fontSize: 11.5, color: colors.textMuted, marginTop: 2 },
  desc: { fontFamily: fonts.regular, fontSize: 12, color: colors.textMuted, marginTop: 4, lineHeight: 17 },
  ownedTag: { flexDirection: 'row', alignItems: 'center', gap: 4, alignSelf: 'center' },
  ownedText: { fontFamily: fonts.semiBold, fontSize: 12, color: colors.success },
  buyButton: {
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: 8,
    alignSelf: 'center',
  },
  buyButtonText: { fontFamily: fonts.semiBold, fontSize: 13, color: colors.primary },
  footNote: { fontFamily: fonts.regular, fontSize: 11.5, color: colors.textLight, textAlign: 'center', marginTop: spacing.lg, lineHeight: 17 },
});
