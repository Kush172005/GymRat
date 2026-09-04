import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { useTheme } from '../../theme';
import { fontFamily, fontSize } from '../../theme/typography';
import { spacing, radius } from '../../theme/spacing';
import { Screen, AppHeader, Card, AppText, Button, EmptyState } from '../../components/ui';
import { profileRepo } from '../../db/profileRepo';
import { nutritionRepo } from '../../db/nutritionRepo';
import { computeTargets } from '../../domain/nutrition';
import { GOAL_OPTIONS } from '../../domain/profile';

function Bar({ label, used, target, color, unit }: { label: string; used: number; target: number; color: string; unit: string }) {
  const { colors } = useTheme();
  const pct = target > 0 ? Math.min(100, (used / target) * 100) : 0;
  const left = Math.max(0, Math.round(target - used));
  return (
    <View style={styles.barBlock}>
      <View style={styles.barHead}>
        <AppText variant="captionMedium">{label}</AppText>
        <AppText variant="caption" color="sub">
          {Math.round(used)} / {Math.round(target)} {unit}
        </AppText>
      </View>
      <View style={[styles.track, { backgroundColor: colors.surface2 }]}>
        <View style={[styles.fill, { width: `${pct}%` as `${number}%`, backgroundColor: color }]} />
      </View>
      <AppText variant="caption" color="muted">{left} {unit} left</AppText>
    </View>
  );
}

export function NutritionScreen() {
  const { colors } = useTheme();
  const nav = useNavigation();
  const [profile, setProfile] = useState(() => profileRepo.get());
  const [totals, setTotals] = useState(() => nutritionRepo.totalsForDate());
  const [logs, setLogs] = useState(() => nutritionRepo.getForDate());
  const [water, setWater] = useState(() => nutritionRepo.getWater());

  useFocusEffect(
    React.useCallback(() => {
      setProfile(profileRepo.get());
      setTotals(nutritionRepo.totalsForDate());
      setLogs(nutritionRepo.getForDate());
      setWater(nutritionRepo.getWater());
    }, []),
  );

  const targets = useMemo(() => (profile ? computeTargets(profile) : null), [profile]);
  const goalLabel = GOAL_OPTIONS.find((g) => g.id === profile?.goal)?.label;

  if (!profile || !targets) {
    return (
      <Screen>
        <AppHeader title="Fuel" />
        <EmptyState
          icon="nutrition-outline"
          title="Set your body stats first"
          subtitle="Protein and calories are calculated from your age, height, weight, activity, and goal — not a generic number."
          actionLabel="Set goals"
          onAction={() => (nav as any).navigate('ProfileSetup')}
        />
      </Screen>
    );
  }

  return (
    <Screen scroll>
      <AppHeader title="Fuel" />
      <AppText variant="caption" color="muted" style={{ marginBottom: spacing.md }}>
        {goalLabel} · {targets.proteinPerMealG} g protein each meal
      </AppText>

      <Card>
        <Text style={[styles.hero, { color: colors.text }]}>{targets.proteinG} g</Text>
        <AppText variant="bodyMedium" color="sub">Daily protein target</AppText>
        <Bar label="Protein" used={totals.protein} target={targets.proteinG} color={colors.primary} unit="g" />
        <Bar label="Calories" used={totals.kcal} target={targets.calories} color={colors.warning} unit="kcal" />
        <Bar label="Carbs" used={totals.carbs} target={targets.carbsG} color={colors.success} unit="g" />
        <Bar label="Fat" used={totals.fat} target={targets.fatG} color={colors.textSub} unit="g" />
      </Card>

      <Card>
        <View style={styles.waterRow}>
          <View>
            <AppText variant="sectionHeader">Water</AppText>
            <AppText variant="caption" color="sub">{water} / {targets.waterMl} ml</AppText>
          </View>
          <TouchableOpacity
            style={[styles.waterBtn, { backgroundColor: colors.primary }]}
            onPress={() => setWater(nutritionRepo.addWater(250))}
            accessibilityRole="button"
            accessibilityLabel="Add 250 milliliters of water"
          >
            <Text style={styles.waterBtnText}>+250 ml</Text>
          </TouchableOpacity>
        </View>
      </Card>

      <Button
        title="Log food"
        onPress={() => (nav as any).navigate('FoodPicker')}
        fullWidth
        style={{ marginBottom: spacing.lg }}
      />

      <AppText variant="label" color="muted" style={{ marginBottom: spacing.sm }}>Today</AppText>
      {logs.length === 0 ? (
        <AppText variant="body" color="sub">Nothing logged yet. Add a food to see remaining protein.</AppText>
      ) : (
        logs.map((log) => (
          <Card key={log.id} style={styles.logCard}>
            <View style={{ flex: 1 }}>
              <AppText variant="bodySemiBold">{log.name}</AppText>
              <AppText variant="caption" color="sub">
                {log.servings} × · {Math.round(log.protein_g)} g protein · {Math.round(log.kcal)} kcal
              </AppText>
            </View>
            <TouchableOpacity
              onPress={() => {
                nutritionRepo.remove(log.id);
                setLogs(nutritionRepo.getForDate());
                setTotals(nutritionRepo.totalsForDate());
              }}
              accessibilityRole="button"
              accessibilityLabel={`Remove ${log.name}`}
            >
              <Ionicons name="close-circle-outline" size={22} color={colors.textMuted} />
            </TouchableOpacity>
          </Card>
        ))
      )}

      <AppText variant="caption" color="muted" style={{ marginTop: spacing.xl }}>
        Fiber target {targets.fiberG} g. Formula: Mifflin–St Jeor + ISSN protein ranges. Not medical advice.
      </AppText>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: {
    fontFamily: fontFamily.display.bold,
    fontSize: 48,
    letterSpacing: -1.5,
  },
  barBlock: { marginTop: spacing.lg },
  barHead: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  track: { height: 8, borderRadius: 4, overflow: 'hidden', marginBottom: 4 },
  fill: { height: '100%', borderRadius: 4 },
  waterRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  waterBtn: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radius.md,
  },
  waterBtnText: {
    color: '#fff',
    fontFamily: fontFamily.body.bold,
    fontSize: fontSize.sm,
  },
  logCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
});
