import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
  Text,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useTheme } from '../../theme';
import { fontFamily, fontSize } from '../../theme/typography';
import { spacing, radius } from '../../theme/spacing';
import { Screen, AppHeader, AppText, Chip, Button } from '../../components/ui';
import { customExerciseRepo } from '../../db/customExerciseRepo';
import { MUSCLE_GROUPS } from '../../data/exercises';

const EQUIPMENT_OPTIONS = [
  'Bodyweight',
  'Barbell',
  'Dumbbell',
  'Cable',
  'Machine',
  'Kettlebell',
  'Resistance Band',
  'Other',
];

export function CreateCustomExerciseScreen() {
  const nav = useNavigation();
  const { colors } = useTheme();
  const [name, setName] = useState('');
  const [bodyPart, setBodyPart] = useState('');
  const [equipment, setEquipment] = useState('Bodyweight');
  const [description, setDescription] = useState('');
  const [tips, setTips] = useState('');
  const [saving, setSaving] = useState(false);

  const save = () => {
    const trimmed = name.trim();
    if (!trimmed) {
      Alert.alert('Name required', 'Please enter a name for the exercise.');
      return;
    }
    if (!bodyPart) {
      Alert.alert('Muscle group required', 'Please select a muscle group.');
      return;
    }
    setSaving(true);
    customExerciseRepo.create(trimmed, bodyPart, equipment, description.trim(), tips.trim());
    setSaving(false);
    nav.goBack();
  };

  return (
    <Screen keyboardAvoiding>
      <AppHeader
        title="New Exercise"
        onBack={() => nav.goBack()}
      />

      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <AppText variant="label" color="muted" style={styles.fieldLabel}>Name</AppText>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="e.g. Bulgarian Split Squat"
          placeholderTextColor={colors.textMuted}
          style={[styles.input, { color: colors.text, backgroundColor: colors.surface, borderColor: colors.border }]}
          accessibilityLabel="Exercise name"
          autoFocus
          maxLength={60}
        />

        <AppText variant="label" color="muted" style={styles.fieldLabel}>Muscle Group</AppText>
        <View style={styles.chips}>
          {MUSCLE_GROUPS.filter((g) => g !== 'All').map((g) => (
            <Chip
              key={g}
              label={g}
              selected={bodyPart === g}
              onPress={() => setBodyPart(g)}
              style={styles.chip}
            />
          ))}
        </View>

        <AppText variant="label" color="muted" style={styles.fieldLabel}>Equipment</AppText>
        <View style={styles.chips}>
          {EQUIPMENT_OPTIONS.map((e) => (
            <Chip
              key={e}
              label={e}
              selected={equipment === e}
              onPress={() => setEquipment(e)}
              style={styles.chip}
            />
          ))}
        </View>

        <AppText variant="label" color="muted" style={styles.fieldLabel}>
          How to Do It <AppText variant="caption" color="muted">(optional)</AppText>
        </AppText>
        <TextInput
          value={description}
          onChangeText={setDescription}
          placeholder="e.g. 1. Set up... 2. Lower under control... 3. Drive back up..."
          placeholderTextColor={colors.textMuted}
          style={[styles.input, styles.multiline, { color: colors.text, backgroundColor: colors.surface, borderColor: colors.border }]}
          accessibilityLabel="How to do it"
          multiline
          textAlignVertical="top"
        />

        <AppText variant="label" color="muted" style={styles.fieldLabel}>
          Tips <AppText variant="caption" color="muted">(optional)</AppText>
        </AppText>
        <TextInput
          value={tips}
          onChangeText={setTips}
          placeholder="Cues and mistakes to avoid"
          placeholderTextColor={colors.textMuted}
          style={[styles.input, styles.multiline, { color: colors.text, backgroundColor: colors.surface, borderColor: colors.border }]}
          accessibilityLabel="Tips"
          multiline
          textAlignVertical="top"
        />

        <Button
          title="Save Exercise"
          onPress={save}
          loading={saving}
          fullWidth
          style={styles.saveBtn}
        />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: spacing.lg,
    paddingBottom: 80,
  },
  fieldLabel: {
    marginBottom: spacing.sm,
    marginTop: spacing.xl,
  },
  input: {
    borderWidth: 1,
    borderRadius: radius.md,
    padding: spacing.md,
    fontSize: fontSize.md,
    fontFamily: fontFamily.body.regular,
  },
  multiline: {
    minHeight: 90,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  chip: {
    marginRight: 0,
    marginBottom: spacing.sm,
  },
  saveBtn: {
    marginTop: spacing['2xl'],
  },
});
