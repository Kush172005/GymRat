import React, { useState, useMemo } from 'react';
import {
  View,
  FlatList,
  TextInput,
  StyleSheet,
  ScrollView,
  Text,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { useTheme } from '../../theme';
import { fontFamily, fontSize } from '../../theme/typography';
import { spacing, radius, shadow } from '../../theme/spacing';
import { Screen, AppHeader, Chip, EmptyState } from '../../components/ui';
import { ExerciseCard } from '../../components/ExerciseCard';
import { ExercisesStackParamList, Exercise } from '../../navigation/types';
import { getAllExercises, filterExercises, MUSCLE_GROUPS } from '../../data/exercises';
import { favoritesRepo } from '../../db/favoritesRepo';

type Nav = NativeStackNavigationProp<ExercisesStackParamList, 'ExerciseList'>;

export function ExerciseListScreen() {
  const nav = useNavigation<Nav>();
  const { colors } = useTheme();
  const [query, setQuery] = useState('');
  const [muscle, setMuscle] = useState<string>('All');

  // Load all exercises (bundled + custom) — useMemo so it doesn't rebuild on every keystroke
  const allExercises = useMemo(() => getAllExercises(), []);
  const filtered = useMemo(
    () => filterExercises(allExercises, query, muscle),
    [allExercises, query, muscle],
  );

  const openDetail = (item: Exercise) => nav.navigate('ExerciseDetail', { item });

  return (
    <Screen>
      <AppHeader
        title="Exercises"
        rightAction={{
          icon: 'heart-outline',
          label: 'Saved exercises',
          onPress: () => nav.navigate('Favorites'),
          color: colors.primary,
        }}
      />

      {/* Search bar */}
      <View style={[styles.searchWrap, { backgroundColor: colors.background }]}>
        <View style={[styles.searchBar, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Ionicons name="search-outline" size={18} color={colors.textMuted} style={{ marginRight: spacing.sm }} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search exercises…"
            placeholderTextColor={colors.textMuted}
            style={[styles.searchInput, { color: colors.text, fontFamily: fontFamily.body.regular }]}
            accessibilityLabel="Search exercises"
            returnKeyType="search"
            clearButtonMode="while-editing"
          />
        </View>
      </View>

      {/* Muscle group chips */}
      <View style={[styles.chipContainer, { backgroundColor: colors.background }]}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipScroll}
        >
          {MUSCLE_GROUPS.map((g) => (
            <Chip
              key={g}
              label={g}
              selected={muscle === g}
              onPress={() => setMuscle(g)}
            />
          ))}
        </ScrollView>
      </View>

      {/* Results count */}
      {query || muscle !== 'All' ? (
        <View style={styles.countRow}>
          <Text style={[styles.countText, { color: colors.textSub }]}>
            {filtered.length} exercise{filtered.length !== 1 ? 's' : ''}
          </Text>
        </View>
      ) : null}

      {filtered.length === 0 ? (
        <EmptyState
          icon="barbell-outline"
          title="No exercises found"
          subtitle={query ? `No results for "${query}"` : `No ${muscle} exercises yet.`}
          actionLabel={muscle !== 'All' ? 'Clear filter' : undefined}
          onAction={muscle !== 'All' ? () => { setMuscle('All'); setQuery(''); } : undefined}
        />
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(i) => i.id}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
          columnWrapperStyle={styles.row}
          renderItem={({ item }) => (
            <ExerciseCard item={item} onPress={openDetail} />
          )}
        />
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  searchWrap: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: radius.lg,
    borderWidth: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
  },
  searchInput: {
    flex: 1,
    fontSize: fontSize.md,
  },
  chipContainer: {
    paddingBottom: spacing.sm,
  },
  chipScroll: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xs,
  },
  countRow: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.sm,
  },
  countText: {
    fontFamily: fontFamily.body.medium,
    fontSize: fontSize.sm,
  },
  list: {
    padding: spacing.lg,
    paddingBottom: 100,
  },
  row: {
    justifyContent: 'space-between',
  },
});
