import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Animated,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

import { useTheme } from '../../theme';
import { fontFamily, fontSize } from '../../theme/typography';
import { spacing, radius } from '../../theme/spacing';
import { Screen, AppHeader, Card, AppText, Button, ErrorState } from '../../components/ui';
import { workoutRepo, FullWorkoutSession, FullWorkoutExercise } from '../../db/workoutRepo';
import { settingsRepo } from '../../db/settingsRepo';
import { getAllExercises } from '../../data/exercises';
import { displayWeight, parseWeightInput, formatWeight, formatVolume } from '../../utils/units';
import { YouStackScreenProps } from '../../navigation/types';

type Props = YouStackScreenProps<'ActiveWorkout'>;

const HYPE_LINES = [
  "Let's build today's log.",
  'Every rep you log here beats yesterday.',
  'Show up. Log it. Repeat.',
  "Today's effort is tomorrow's target.",
];

export function ActiveWorkoutScreen({ route, navigation }: Props) {
  const { sessionId } = route.params;
  const { colors } = useTheme();
  const units = settingsRepo.getUnits();

  const [session, setSession] = useState<FullWorkoutSession | null>(() =>
    workoutRepo.getFullSession(sessionId),
  );
  const [justAddedId, setJustAddedId] = useState<string | null>(null);
  const knownIds = useRef<Set<string>>(new Set());
  const hype = useMemo(() => HYPE_LINES[Math.floor(Math.random() * HYPE_LINES.length)], []);

  // exercise_id -> muscle group, so the day's log can be grouped by what you trained
  const muscleByExerciseId = useMemo(() => {
    const map = new Map<string, string>();
    for (const ex of getAllExercises()) map.set(ex.id, ex.bodyPart.split(',')[0].trim());
    return map;
  }, []);

  const refresh = useCallback(() => {
    const next = workoutRepo.getFullSession(sessionId);
    if (next) {
      const ids = next.exercises.map((e) => e.id);
      const added = ids.find((id) => !knownIds.current.has(id));
      setJustAddedId(added ?? null);
      knownIds.current = new Set(ids);
    }
    setSession(next);
  }, [sessionId]);

  useFocusEffect(refresh);

  if (!session) {
    return (
      <Screen>
        <AppHeader title="Workout" onBack={() => navigation.goBack()} />
        <ErrorState title="Workout not found" message="This session may have already been discarded." />
      </Screen>
    );
  }

  const groups = useMemo(() => {
    const byMuscle = new Map<string, FullWorkoutExercise[]>();
    for (const ex of session.exercises) {
      const muscle = muscleByExerciseId.get(ex.exercise_id) ?? 'Other';
      if (!byMuscle.has(muscle)) byMuscle.set(muscle, []);
      byMuscle.get(muscle)!.push(ex);
    }
    return Array.from(byMuscle.entries());
  }, [session, muscleByExerciseId]);

  const logged = session.exercises.filter((ex) => ex.sets.length > 0);
  const totalVolume = logged.reduce((sum, ex) => sum + (ex.sets[0]?.weight_kg ?? 0) * (ex.sets[0]?.reps ?? 0), 0);

  const removeExercise = (weId: string, name: string) => {
    Alert.alert(name, 'Remove this from today’s log?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Remove', style: 'destructive', onPress: () => { workoutRepo.removeExercise(weId); refresh(); } },
    ]);
  };

  const addExercise = () => {
    navigation.navigate('ExerciseList', { pickForSessionId: sessionId });
  };

  const finish = () => {
    if (logged.length === 0) {
      Alert.alert('Nothing logged yet', 'Log at least one exercise before finishing, or discard the workout.');
      return;
    }
    const priorPRs: Record<string, { weight_kg: number; reps: number } | null> = {};
    for (const ex of session.exercises) {
      priorPRs[ex.exercise_id] = workoutRepo.getPR(ex.exercise_id);
    }
    workoutRepo.finishSession(sessionId);
    navigation.replace('WorkoutSummary', { sessionId, priorPRs });
  };

  const discard = () => {
    Alert.alert('Discard workout?', 'Today’s log will be deleted. This cannot be undone.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Discard',
        style: 'destructive',
        onPress: () => {
          workoutRepo.discardSession(sessionId);
          navigation.goBack();
        },
      },
    ]);
  };

  return (
    <Screen>
      <AppHeader
        title="Log Workout"
        onBack={() => navigation.goBack()}
        rightAction={{
          icon: 'checkmark-circle',
          label: 'Finish workout',
          onPress: finish,
          color: colors.primary,
        }}
      />

      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        {logged.length === 0 ? (
          <AppText variant="body" color="sub" style={{ marginBottom: spacing.lg }}>
            {hype}
          </AppText>
        ) : (
          <View style={[styles.todayStrip, { backgroundColor: colors.primarySubtle, borderColor: colors.primary }]}>
            <View style={styles.todayStat}>
              <AppText variant="metricSmall" color="accent">{logged.length}</AppText>
              <AppText variant="label" color="muted">{logged.length === 1 ? 'exercise' : 'exercises'} today</AppText>
            </View>
            <View style={[styles.todayDivider, { backgroundColor: colors.border }]} />
            <View style={styles.todayStat}>
              <AppText variant="metricSmall" color="accent">{formatVolume(totalVolume, units)}</AppText>
              <AppText variant="label" color="muted">total volume</AppText>
            </View>
          </View>
        )}

        {session.exercises.length === 0 ? null : (
          groups.map(([muscle, exercises]) => (
            <View key={muscle} style={{ marginBottom: spacing.md }}>
              <AppText variant="label" color="muted" style={{ marginBottom: spacing.sm }}>
                {muscle.toUpperCase()} · {exercises.length}
              </AppText>
              {exercises.map((ex) => (
                <ExerciseLogRow
                  key={ex.id}
                  workoutExercise={ex}
                  units={units}
                  autoFocus={ex.id === justAddedId}
                  onRemove={() => removeExercise(ex.id, ex.exercise_name)}
                  onChange={refresh}
                />
              ))}
            </View>
          ))
        )}

        <Button title="+ Log Exercise" variant="secondary" fullWidth onPress={addExercise} style={{ marginTop: spacing.sm }} />
        <Button title="Discard workout" variant="ghost" fullWidth onPress={discard} style={{ marginTop: spacing.lg }} textStyle={{ color: colors.error }} />
      </ScrollView>
    </Screen>
  );
}

function progressCopy(
  pr: { weight_kg: number; reps: number } | null,
  hasEntry: boolean,
  weightKg: number,
  reps: number,
  units: 'kg' | 'lb',
): string {
  if (!pr) {
    return hasEntry ? "\u{1F4AA} That's your baseline — beat it next time" : '\u{1F195} First time — set your baseline';
  }
  if (!hasEntry) {
    return `\u{1F3AF} Beat: ${formatWeight(pr.weight_kg, units)} × ${pr.reps}`;
  }
  const beats = weightKg > pr.weight_kg || (weightKg === pr.weight_kg && reps > pr.reps);
  if (beats) return '\u{1F525} New PR! Keep it up';
  if (weightKg === pr.weight_kg && reps === pr.reps) return '\u{1F91D} Tied your best — one more rep next time';
  if (weightKg < pr.weight_kg) {
    return `So close — ${formatWeight(pr.weight_kg - weightKg, units)} short of ${formatWeight(pr.weight_kg, units)} × ${pr.reps}`;
  }
  return `\u{1F3AF} Beat: ${formatWeight(pr.weight_kg, units)} × ${pr.reps}`;
}

function ExerciseLogRow({
  workoutExercise,
  units,
  autoFocus,
  onRemove,
  onChange,
}: {
  workoutExercise: FullWorkoutExercise;
  units: 'kg' | 'lb';
  autoFocus: boolean;
  onRemove: () => void;
  onChange: () => void;
}) {
  const { colors } = useTheme();
  const set = workoutExercise.sets[0] ?? null;
  const pr = useMemo(
    () => workoutRepo.getPR(workoutExercise.exercise_id),
    // Re-check after this exercise's own value changes, since a live PR-beat should
    // still compare against history from BEFORE this (still in-progress) session.
    [workoutExercise.exercise_id, set?.weight_kg, set?.reps],
  );

  const [weight, setWeight] = useState(() => (set ? displayWeight(set.weight_kg, units) : ''));
  const [reps, setReps] = useState(() => (set?.reps ? String(set.reps) : ''));
  const badgeScale = useRef(new Animated.Value(set ? 1 : 0.6)).current;
  const wasBeating = useRef(false);

  useEffect(() => {
    setWeight(set ? displayWeight(set.weight_kg, units) : '');
    setReps(set?.reps ? String(set.reps) : '');
  }, [set?.weight_kg, set?.reps, units]);

  // Live, as-you-type feedback — computed from what's typed right now, not just the
  // last saved value, so beating your best reacts instantly instead of after you tab away.
  const liveWeightKg = parseWeightInput(weight, units);
  const liveReps = Math.max(0, parseInt(reps, 10) || 0);
  const hasEntry = liveWeightKg > 0 || liveReps > 0;
  const beatsPR = hasEntry && !!pr && (liveWeightKg > pr.weight_kg || (liveWeightKg === pr.weight_kg && liveReps > pr.reps));

  useEffect(() => {
    if (beatsPR && !wasBeating.current) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
      badgeScale.setValue(0.6);
      Animated.spring(badgeScale, { toValue: 1, speed: 14, bounciness: 14, useNativeDriver: true }).start();
    }
    wasBeating.current = beatsPR;
  }, [beatsPR, badgeScale]);

  const commit = () => {
    const w = parseWeightInput(weight, units);
    const r = Math.max(0, parseInt(reps, 10) || 0);
    if (w <= 0 && r <= 0) return; // nothing entered yet — don't create a bogus 0x0 entry
    workoutRepo.logSet(workoutExercise.id, w, r, set?.id);
    onChange();
  };

  return (
    <Card
      style={beatsPR ? { borderColor: colors.warning, borderWidth: 1.5 } : undefined}
    >
      <View style={styles.rowHeader}>
        <AppText variant="bodySemiBold" style={{ flex: 1 }}>{workoutExercise.exercise_name}</AppText>
        <TouchableOpacity
          onPress={onRemove}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          accessibilityRole="button"
          accessibilityLabel={`Remove ${workoutExercise.exercise_name}`}
        >
          <Ionicons name="trash-outline" size={18} color={colors.textMuted} />
        </TouchableOpacity>
      </View>

      <AppText
        variant="caption"
        color={beatsPR ? 'warning' : 'sub'}
        style={{ marginBottom: spacing.sm }}
      >
        {progressCopy(pr, hasEntry, liveWeightKg, liveReps, units)}
      </AppText>

      <View style={styles.inputRow}>
        <TextInput
          value={weight}
          onChangeText={setWeight}
          onEndEditing={commit}
          placeholder="Weight"
          placeholderTextColor={colors.textMuted}
          keyboardType="decimal-pad"
          autoFocus={autoFocus}
          style={[styles.input, { color: colors.text, backgroundColor: colors.surface2, borderColor: colors.border }]}
          accessibilityLabel={`${workoutExercise.exercise_name} weight`}
        />
        <AppText variant="caption" color="muted">{units}  ×</AppText>
        <TextInput
          value={reps}
          onChangeText={setReps}
          onEndEditing={commit}
          placeholder="Reps"
          placeholderTextColor={colors.textMuted}
          keyboardType="number-pad"
          style={[styles.input, { color: colors.text, backgroundColor: colors.surface2, borderColor: colors.border }]}
          accessibilityLabel={`${workoutExercise.exercise_name} reps`}
        />
        <AppText variant="caption" color="muted">reps</AppText>
      </View>

      {beatsPR ? (
        <Animated.View style={[styles.prBadge, { transform: [{ scale: badgeScale }] }]}>
          <Ionicons name="trophy" size={14} color={colors.warning} />
          <Text style={[styles.prText, { color: colors.warning }]}>New PR!</Text>
        </Animated.View>
      ) : null}
    </Card>
  );
}

const styles = StyleSheet.create({
  scroll: { padding: spacing.lg, paddingBottom: 100 },
  todayStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.xl,
  },
  todayStat: { flex: 1, alignItems: 'center' },
  todayDivider: { width: StyleSheet.hairlineWidth, height: 32 },
  rowHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.xs },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: radius.sm,
    paddingVertical: spacing.sm + 2,
    textAlign: 'center',
    fontFamily: fontFamily.body.semiBold,
    fontSize: fontSize.lg,
  },
  prBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: spacing.sm,
  },
  prText: {
    fontFamily: fontFamily.body.bold,
    fontSize: fontSize.sm,
  },
});
