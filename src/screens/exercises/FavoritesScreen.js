import React, { useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import { Screen, AppHeader, EmptyState } from '../../components/ui';
import { ExerciseCard } from '../../components/ExerciseCard';
import { favoritesRepo } from '../../db/favoritesRepo';
import { spacing } from '../../theme/spacing';

export function FavoritesScreen() {
  const nav = useNavigation();
  const [items, setItems] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      setItems(favoritesRepo.getAll());
    }, []),
  );

  const openDetail = (item) => nav.navigate('ExerciseDetail', { item });

  return (
    <Screen>
      <AppHeader
        title="Saved Exercises"
        onBack={() => nav.goBack()}
      />

      {items.length === 0 ? (
        <EmptyState
          icon="heart-outline"
          title="No saved exercises"
          subtitle="Tap the heart on any exercise detail page to save it here."
          actionLabel="Explore Exercises"
          onAction={() => nav.navigate('ExerciseList')}
        />
      ) : (
        <FlatList
          data={items}
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
  list: { padding: spacing.lg, paddingBottom: 100 },
  row: { justifyContent: 'space-between' },
});
