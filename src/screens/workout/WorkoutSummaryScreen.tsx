import React, { useEffect, useMemo, useRef } from 'react';
import { View, StyleSheet, Animated, Share } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useTheme } from '../../theme';
import { spacing, radius } from '../../theme/spacing';
import { Screen, AppHeader, Card, AppText, Button, ErrorState } from '../../components/ui';
import { workoutRepo } from '../../db/workoutRepo';
import { settingsRepo } from '../../db/settingsRepo';
import { profileRepo } from '../../db/profileRepo';
import { formatVolume } from '../../utils/units';
import { YouStackScreenProps } from '../../navigation/types';

type Props = YouStackScreenProps<'WorkoutSummary'>;

const WORKOUT_MILESTONES = [1, 5, 10, 25, 50, 100, 200, 365, 500];
const STREAK_MILESTONES = [3, 7, 14, 30, 60, 100, 180, 365];

const HYPE_LINES = [
  'Nice work. Every session counts.',
  'Discipline beats motivation. You showed up.',
  'That effort is in the bank now.',
  'Future you says thanks.',
];

export function WorkoutSummaryScreen({ route, navigation }: Props) {
  const { sessionId, priorPRs } = route.params;
  const { colors } = useTheme();
  const units = settingsRepo.getUnits();
  const session = useMemo(() => workoutRepo.getFullSession(sessionId), [sessionId]);
  const iconScale = useRef(new Animated.Value(0.4)).current;
  const hype = useMemo(() => HYPE_LINES[Math.floor(Math.random() * HYPE_LINES.length)], []);

  useEffect(() => {
    Animated.spring(iconScale, { toValue: 1, speed: 10, bounciness: 16, useNativeDriver: true }).start();
  }, [iconScale]);

  if (!session) {
    return (
      <Screen>
        <AppHeader title="Workout" onBack={() => navigation.popToTop()} />
        <ErrorState title="Workout not found" />
      </Screen>
    );
  }

  let totalVolume = 0;
  let exercisesLogged = 0;
  const newPRs: string[] = [];

  for (const ex of session.exercises) {
    // Simplified logger: at most one logged set per exercise (today's best effort).
    const logged = ex.sets.find((s) => s.completed === 1);
    if (!logged) continue;
    exercisesLogged += 1;
    totalVolume += logged.weight_kg * logged.reps;

    const prior = priorPRs?.[ex.exercise_id] ?? null;
    const isNewPR = logged.weight_kg > 0 && (!prior || logged.weight_kg > prior.weight_kg ||
      (logged.weight_kg === prior.weight_kg && logged.reps > prior.reps));
    if (isNewPR) newPRs.push(ex.exercise_name);
  }

  const stats = workoutRepo.getProgressStats();
  const workoutMilestone = WORKOUT_MILESTONES.includes(stats.totalWorkouts) ? stats.totalWorkouts : null;
  const streakMilestone = STREAK_MILESTONES.includes(stats.streak) ? stats.streak : null;
  const firstName = profileRepo.get()?.name?.trim().split(' ')[0] || null;

  const shareWin = () => {
    const headline =
      newPRs.length > 0
        ? `Just set ${newPRs.length > 1 ? 'new PRs' : 'a new PR'} on ${newPRs.join(', ')} 💪`
        : `Logged a workout today — ${exercisesLogged} exercise${exercisesLogged === 1 ? '' : 's'}, ${formatVolume(totalVolume, units)} total volume 🔥`;
    const streakLine = stats.streak > 1 ? `\n${stats.streak}-day streak and counting.` : '';
    Share.share({ message: `${headline}${streakLine}\n— logged in GymRat` }).catch(() => {});
  };

  return (
    <Screen scroll>
      <AppHeader title="" />

      <View style={styles.hero}>
        <Animated.View style={[styles.iconWrap, { backgroundColor: colors.successSubtle, transform: [{ scale: iconScale }] }]}>
          <Ionicons name="checkmark" size={48} color={colors.success} />
        </Animated.View>
        <AppText variant="title1" style={{ marginTop: spacing.lg }}>
          {firstName ? `Nice one, ${firstName}!` : 'Workout Complete'}
        </AppText>
        <AppText variant="body" color="sub" style={{ marginTop: spacing.xs, textAlign: 'center' }}>
          {streakMilestone ? `🔥 ${streakMilestone}-day streak — your consistency is showing.` : hype}
        </AppText>
      </View>

      <View style={styles.statsRow}>
        <Stat label="Volume" value={formatVolume(totalVolume, units)} />
        <Stat label="Exercises" value={String(exercisesLogged)} />
      </View>

      {workoutMilestone ? (
        <Card variant="highlight" style={styles.milestoneCard}>
          <Ionicons name="ribbon" size={22} color={colors.primary} />
          <AppText variant="bodySemiBold" style={{ marginLeft: spacing.sm, flex: 1 }}>
            Milestone: {workoutMilestone} workout{workoutMilestone === 1 ? '' : 's'} logged!
          </AppText>
        </Card>
      ) : null}

      {newPRs.length > 0 ? (
        <Card variant="highlight">
          <View style={styles.prHeader}>
            <Ionicons name="trophy" size={20} color={colors.warning} />
            <AppText variant="sectionHeader" style={{ marginLeft: spacing.sm }}>New Personal Records</AppText>
          </View>
          {newPRs.map((name) => (
            <AppText key={name} variant="bodyMedium" style={{ marginTop: spacing.sm }}>
              🏆 {name}
            </AppText>
          ))}
        </Card>
      ) : null}

      <Button
        title="Share this win"
        variant="secondary"
        fullWidth
        leftIcon={<Ionicons name="share-social-outline" size={18} color={colors.primary} />}
        onPress={shareWin}
        style={{ marginTop: spacing.lg }}
      />
      <Button
        title="View Progress"
        variant="ghost"
        fullWidth
        onPress={() => navigation.navigate('WorkoutHistory')}
        style={{ marginTop: spacing.sm }}
      />
      <Button
        title="Done"
        fullWidth
        onPress={() => navigation.popToTop()}
        style={{ marginTop: spacing.md }}
      />
    </Screen>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.stat}>
      <AppText variant="metricSmall">{value}</AppText>
      <AppText variant="label" color="muted" style={{ marginTop: 4 }}>{label}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: { alignItems: 'center', paddingVertical: spacing.xl },
  iconWrap: {
    width: 96,
    height: 96,
    borderRadius: radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: spacing.lg,
  },
  stat: { alignItems: 'center' },
  prHeader: { flexDirection: 'row', alignItems: 'center' },
  milestoneCard: { flexDirection: 'row', alignItems: 'center' },
});
