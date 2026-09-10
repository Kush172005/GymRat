import React, { useMemo, useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { useTheme } from '../../theme';
import { spacing } from '../../theme/spacing';
import { Screen, AppHeader, Card, AppText, Button, EmptyState } from '../../components/ui';
import { workoutRepo } from '../../db/workoutRepo';
import { settingsRepo } from '../../db/settingsRepo';
import { formatDate, dayLabel } from '../../utils/date';
import { formatVolume, formatWeight } from '../../utils/units';

export function WorkoutHistoryScreen({ navigation }) {
  const { colors } = useTheme();
  const units = settingsRepo.getUnits();
  const [reloadKey, setReloadKey] = useState(0);
  const [expanded, setExpanded] = useState({});

  useFocusEffect(
    React.useCallback(() => {
      setReloadKey((k) => k + 1);
    }, []),
  );

  const stats = useMemo(() => workoutRepo.getProgressStats(), [reloadKey]);
  const prs = useMemo(() => workoutRepo.getAllPRs(), [reloadKey]);
  const sessions = useMemo(() => workoutRepo.getCompletedSessions(30), [reloadKey]);

  const toggleExpand = (id) => {
    setExpanded((prev) => {
      if (prev[id]) {
        const next = { ...prev };
        delete next[id];
        return next;
      }
      return { ...prev, [id]: workoutRepo.getFullSession(id) };
    });
  };

  const repeatLast = () => {
    const session = workoutRepo.repeatLastWorkout();
    if (session) navigation.navigate('ActiveWorkout', { sessionId: session.id });
  };

  return (
    <Screen scroll>
      <AppHeader title="Progress" onBack={() => navigation.goBack()} />

      <Card>
        <View style={styles.statGrid}>
          <GridStat icon="flame" label="Streak" value={`${stats.streak}d`} colors={colors} />
          <GridStat icon="barbell" label="Total workouts" value={String(stats.totalWorkouts)} colors={colors} />
          <GridStat icon="calendar" label="This week" value={String(stats.weekSessions)} colors={colors} />
          <GridStat icon="stats-chart" label="Week volume" value={formatVolume(stats.weekVolumeKg, units)} colors={colors} />
        </View>

        <View style={styles.weekStrip}>
          {stats.last7Days.map((d) => (
            <View key={d.date} style={styles.dayCol}>
              <View
                style={[
                  styles.dayDot,
                  {
                    backgroundColor: d.trained ? colors.primary : colors.surface2,
                    borderColor: d.trained ? colors.primaryDark : colors.border,
                  },
                ]}
              >
                {d.trained ? <Ionicons name="checkmark" size={14} color="#fff" /> : null}
              </View>
              <AppText variant="caption" color="muted" style={{ marginTop: 4 }}>
                {dayLabel(d.date).slice(0, 1)}
              </AppText>
            </View>
          ))}
        </View>
      </Card>

      {workoutRepo.getLastFinishedSession() ? (
        <Button title="Repeat last workout" variant="secondary" fullWidth onPress={repeatLast} style={{ marginBottom: spacing.md }} />
      ) : null}

      {prs.length > 0 ? (
        <>
          <AppText variant="label" color="muted" style={styles.sectionLabel}>Personal Records</AppText>
          <Card>
            {prs.map((pr, i) => (
              <View
                key={pr.exercise_id}
                style={[styles.prRow, i > 0 && { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: colors.border }]}
              >
                <AppText variant="bodyMedium" style={{ flex: 1 }}>{pr.exercise_name}</AppText>
                <AppText variant="bodySemiBold" color="accent">
                  {formatWeight(pr.weight_kg, units)} × {pr.reps}
                </AppText>
              </View>
            ))}
          </Card>
        </>
      ) : null}

      <AppText variant="label" color="muted" style={styles.sectionLabel}>History</AppText>
      {sessions.length === 0 ? (
        <EmptyState icon="barbell-outline" title="No workouts yet" subtitle="Finish a workout to see it here." />
      ) : (
        sessions.map((s) => {
          const full = expanded[s.id];
          return (
            <Card key={s.id} noPad>
              <TouchableOpacity
                style={styles.sessionRow}
                onPress={() => toggleExpand(s.id)}
                accessibilityRole="button"
                accessibilityLabel={`Workout on ${formatDate(s.started_at)}`}
              >
                <View style={{ flex: 1 }}>
                  <AppText variant="bodySemiBold">{formatDate(s.started_at)}</AppText>
                </View>
                <Ionicons
                  name={full ? 'chevron-up' : 'chevron-down'}
                  size={18}
                  color={colors.textMuted}
                />
              </TouchableOpacity>
              {full ? (
                <View style={styles.sessionDetail}>
                  {full.exercises.map((ex) => {
                    const completed = ex.sets.filter((set) => set.completed === 1);
                    return (
                      <View key={ex.id} style={{ marginBottom: spacing.sm }}>
                        <AppText variant="captionMedium">{ex.exercise_name}</AppText>
                        <AppText variant="caption" color="sub">
                          {completed.length > 0
                            ? completed.map((set) => `${formatWeight(set.weight_kg, units)}×${set.reps}`).join('  ·  ')
                            : 'No completed sets'}
                        </AppText>
                      </View>
                    );
                  })}
                </View>
              ) : null}
            </Card>
          );
        })
      )}
    </Screen>
  );
}

function GridStat({ icon, label, value, colors }) {
  return (
    <View style={styles.gridStat}>
      <Ionicons name={icon} size={18} color={colors.primary} />
      <AppText variant="metricSmall" style={{ marginTop: 6 }}>{value}</AppText>
      <AppText variant="label" color="muted" style={{ marginTop: 2 }}>{label}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  statGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  gridStat: { width: '50%', marginBottom: spacing.lg },
  weekStrip: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: spacing.md,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(128,128,128,0.25)',
  },
  dayCol: { alignItems: 'center' },
  dayDot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionLabel: { marginTop: spacing.md, marginBottom: spacing.sm },
  prRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  sessionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
  },
  sessionDetail: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(128,128,128,0.15)',
    paddingTop: spacing.md,
  },
});
