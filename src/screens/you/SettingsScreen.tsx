import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import * as Sharing from 'expo-sharing';
import { File, Paths } from 'expo-file-system';

import { useTheme, ThemeMode } from '../../theme';
import { fontFamily, fontSize } from '../../theme/typography';
import { spacing, radius } from '../../theme/spacing';
import { Screen, AppHeader, AppText, Card } from '../../components/ui';
import { settingsRepo } from '../../db/settingsRepo';
import { workoutRepo } from '../../db/workoutRepo';
import { favoritesRepo } from '../../db/favoritesRepo';
import { nutritionRepo } from '../../db/nutritionRepo';
import { stepsRepo } from '../../db/stepsRepo';
import { profileRepo } from '../../db/profileRepo';
import { customExerciseRepo } from '../../db/customExerciseRepo';
import { healthRepo } from '../../db/healthRepo';

export function SettingsScreen() {
  const { colors, mode, setMode } = useTheme();
  const nav = useNavigation();
  const [units, setUnitsState] = useState(settingsRepo.getUnits());

  const saveUnits = (v: 'kg' | 'lb') => {
    setUnitsState(v);
    settingsRepo.set('units', v);
  };
  const saveTheme = (v: ThemeMode) => {
    setMode(v);
    settingsRepo.set('theme_mode', v);
  };

  const exportData = async () => {
    try {
      const data = {
        exported_at: new Date().toISOString(),
        workouts: workoutRepo.getAllForExport(),
        favorites: favoritesRepo.getAll().map((e) => ({ id: e.id, name: e.name })),
        custom_exercises: customExerciseRepo.getAll(),
        profile: profileRepo.get(),
        nutrition: nutritionRepo.getAllForExport(),
        steps: stepsRepo.getAllForExport(),
        health: healthRepo.getToday(),
      };
      const file = new File(Paths.cache, `gymrat_export_${Date.now()}.json`);
      file.write(JSON.stringify(data, null, 2));
      const canShare = await Sharing.isAvailableAsync();
      if (canShare) {
        await Sharing.shareAsync(file.uri, {
          mimeType: 'application/json',
          dialogTitle: 'Export GymRat Data',
        });
      } else {
        Alert.alert('Saved', `Data exported to cache folder.`);
      }
    } catch (e) {
      Alert.alert('Export Failed', 'Could not export data.');
    }
  };

  const deleteAllData = () => {
    Alert.alert(
      'Delete All Data',
      'This will permanently erase food logs, steps, favorites, and custom exercises.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete Everything',
          style: 'destructive',
          onPress: () => {
            Alert.alert(
              'Are you sure?',
              'All your fitness data will be gone forever.',
              [
                { text: 'Cancel', style: 'cancel' },
                {
                  text: 'Yes, Delete',
                  style: 'destructive',
                  onPress: () => {
                    workoutRepo.clearAll();
                    nutritionRepo.clearAll();
                    stepsRepo.clearAll();
                    healthRepo.clearAll();
                    profileRepo.clear();
                    favoritesRepo.clearAll();
                    customExerciseRepo.clearAll();
                    Alert.alert('Done', 'All data has been deleted.');
                  },
                },
              ],
            );
          },
        },
      ],
    );
  };

  return (
    <Screen scroll>
      <AppHeader title="Settings" onBack={() => nav.goBack()} />

      {/* You */}
      <AppText variant="label" color="muted" style={styles.sectionLabel}>You</AppText>
      <Card noPad>
        <TouchableOpacity style={styles.row} onPress={() => (nav as any).navigate('ProfileSetup')}>
          <AppText variant="bodyMedium">Goals & body stats</AppText>
          <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.row, { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: colors.border }]}
          onPress={() => (nav as any).navigate('Plan')}
        >
          <AppText variant="bodyMedium">Training plan</AppText>
          <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
        </TouchableOpacity>
      </Card>

      {/* Units */}
      <AppText variant="label" color="muted" style={styles.sectionLabel}>Units</AppText>
      <Card noPad>
        {(['kg', 'lb'] as const).map((u, i) => (
          <TouchableOpacity
            key={u}
            style={[
              styles.row,
              i > 0 && { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: colors.border },
            ]}
            onPress={() => saveUnits(u)}
            accessibilityRole="radio"
            accessibilityState={{ checked: units === u }}
            accessibilityLabel={`${u} unit`}
          >
            <AppText variant="bodyMedium">{u === 'kg' ? 'Kilograms (kg)' : 'Pounds (lb)'}</AppText>
            {units === u && <Ionicons name="checkmark" size={20} color={colors.primary} />}
          </TouchableOpacity>
        ))}
      </Card>

      {/* Appearance */}
      <AppText variant="label" color="muted" style={styles.sectionLabel}>Appearance</AppText>
      <Card noPad>
        {(['system', 'dark', 'light'] as ThemeMode[]).map((m, i) => {
          const labels: Record<ThemeMode, string> = {
            system: 'System Default',
            dark: 'Dark',
            light: 'Light',
          };
          return (
            <TouchableOpacity
              key={m}
              style={[
                styles.row,
                i > 0 && { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: colors.border },
              ]}
              onPress={() => saveTheme(m)}
              accessibilityRole="radio"
              accessibilityState={{ checked: mode === m }}
              accessibilityLabel={`${labels[m]} theme`}
            >
              <AppText variant="bodyMedium">{labels[m]}</AppText>
              {mode === m && <Ionicons name="checkmark" size={20} color={colors.primary} />}
            </TouchableOpacity>
          );
        })}
      </Card>

      {/* Custom exercises */}
      <AppText variant="label" color="muted" style={styles.sectionLabel}>Library</AppText>
      <Card noPad>
        <TouchableOpacity
          style={styles.row}
          onPress={() => (nav as any).navigate('CreateCustomExercise')}
          accessibilityRole="button"
          accessibilityLabel="Add custom exercise"
        >
          <AppText variant="bodyMedium">Add Custom Exercise</AppText>
          <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
        </TouchableOpacity>
      </Card>

      {/* Data */}
      <AppText variant="label" color="muted" style={styles.sectionLabel}>Data</AppText>
      <Card noPad>
        <TouchableOpacity
          style={styles.row}
          onPress={exportData}
          accessibilityRole="button"
          accessibilityLabel="Export data as JSON"
        >
          <AppText variant="bodyMedium">Export Data (JSON)</AppText>
          <Ionicons name="share-outline" size={18} color={colors.textMuted} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.row, { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: colors.border }]}
          onPress={deleteAllData}
          accessibilityRole="button"
          accessibilityLabel="Delete all data"
        >
          <AppText variant="bodyMedium" color="error">Delete All Data</AppText>
          <Ionicons name="trash-outline" size={18} color={colors.error} />
        </TouchableOpacity>
      </Card>

      {/* About */}
      <AppText variant="label" color="muted" style={styles.sectionLabel}>About</AppText>
      <Card noPad>
        <View style={styles.row}>
          <AppText variant="bodyMedium">Version</AppText>
          <AppText variant="body" color="muted">1.0.0</AppText>
        </View>
        <View style={[styles.row, { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: colors.border }]}>
          <View style={{ flex: 1, paddingRight: spacing.md }}>
            <AppText variant="bodyMedium">Apple Health / Health Connect</AppText>
            <AppText variant="caption" color="muted">
              Native builds read Apple Health (iOS) and Health Connect (Android). Expo Go cannot load those APIs; it uses Motion & Fitness on iPhone and Physical activity on Android. For Health data run a native build.
            </AppText>
          </View>
        </View>
      </Card>

      <View style={{ height: 48 }} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  sectionLabel: {
    marginHorizontal: spacing.lg,
    marginTop: spacing.xl,
    marginBottom: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md + 2,
  },
});
