import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { useTheme } from '../../theme';
import { fontFamily, fontSize } from '../../theme/typography';
import { spacing } from '../../theme/spacing';
import { Screen, AppHeader, Card, AppText, EmptyState } from '../../components/ui';
import { profileRepo } from '../../db/profileRepo';
import { planForGoal, todaysPlanDay } from '../../domain/plans';
import { GOAL_OPTIONS } from '../../domain/profile';

export function PlanScreen() {
  const { colors } = useTheme();
  const nav = useNavigation();
  const [profile, setProfile] = useState(() => profileRepo.get());

  useFocusEffect(
    React.useCallback(() => {
      setProfile(profileRepo.get());
    }, []),
  );

  const plan = useMemo(
    () => (profile ? planForGoal(profile.goal, profile.daysPerWeek, profile.experience) : null),
    [profile],
  );
  const today = profile && plan
    ? todaysPlanDay(plan, profile.daysPerWeek)
    : null;

  if (!profile || !plan) {
    return (
      <Screen>
        <AppHeader title="Plan" onBack={() => nav.goBack()} />
        <EmptyState
          icon="calendar-outline"
          title="No plan yet"
          subtitle="Set a goal and training days. GymRat assigns a pre-built plan from your exercise library."
          actionLabel="Set goals"
          onAction={() => (nav as any).navigate('ProfileSetup')}
        />
      </Screen>
    );
  }

  return (
    <Screen scroll>
      <AppHeader title="Plan" onBack={() => nav.goBack()} />
      <AppText variant="caption" color="muted">
        {GOAL_OPTIONS.find((g) => g.id === profile.goal)?.label} · {profile.daysPerWeek} days/week
      </AppText>
      <AppText variant="title3" style={{ marginVertical: spacing.sm }}>{plan.name}</AppText>
      <AppText variant="body" color="sub" style={{ marginBottom: spacing.lg }}>{plan.blurb}</AppText>

      <Card style={today ? undefined : { borderColor: colors.border }}>
        <AppText variant="label" color="muted">Today</AppText>
        {today ? (
          <>
            <AppText variant="sectionHeader" style={{ marginTop: spacing.sm }}>{today.title}</AppText>
            <AppText variant="caption" color="sub">{today.focus}</AppText>
            {today.exercises.map((ex) => (
              <View key={ex.exerciseId + ex.name} style={styles.exRow}>
                <Ionicons name="barbell-outline" size={16} color={colors.primary} />
                <Text style={[styles.exText, { color: colors.text }]}>
                  {ex.name} · {ex.sets} × {ex.reps}
                </Text>
              </View>
            ))}
            {today.kind === 'run' ? (
              <AppText variant="caption" color="sub" style={{ marginTop: spacing.md }}>
                Keep the run easy enough to talk. No GPS required — just go outside.
              </AppText>
            ) : null}
          </>
        ) : (
          <AppText variant="body" color="sub" style={{ marginTop: spacing.sm }}>
            Rest day on the calendar. Use the library if you still want to train.
          </AppText>
        )}
      </Card>

      {plan.days.map((day, i) => (
        <Card key={`${day.id}-${i}`}>
          <AppText variant="bodySemiBold">Day {i + 1} · {day.title}</AppText>
          <AppText variant="caption" color="sub">{day.focus}</AppText>
          {day.exercises.map((ex) => (
            <View key={ex.exerciseId + ex.name + i} style={styles.exRow}>
              <Ionicons name={day.kind === 'run' ? 'walk-outline' : 'barbell-outline'} size={16} color={colors.primary} />
              <Text style={[styles.exText, { color: colors.text }]}>
                {ex.name} · {ex.sets} × {ex.reps}
              </Text>
            </View>
          ))}
        </Card>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  exRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  exText: {
    fontFamily: fontFamily.body.regular,
    fontSize: fontSize.md,
    flex: 1,
  },
});
