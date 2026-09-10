import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { useTheme } from '../../theme';
import { fontFamily, fontSize } from '../../theme/typography';
import { spacing } from '../../theme/spacing';
import { Screen, AppHeader, Card, AppText } from '../../components/ui';
import { profileRepo } from '../../db/profileRepo';
import { workoutRepo } from '../../db/workoutRepo';
import { GOAL_OPTIONS } from '../../domain/profile';

export function YouHomeScreen() {
  const nav = useNavigation();
  const { colors } = useTheme();
  const [profile, setProfile] = useState(() => profileRepo.get());
  const [streak, setStreak] = useState(0);

  useFocusEffect(
    React.useCallback(() => {
      setProfile(profileRepo.get());
      setStreak(workoutRepo.getProgressStats().streak);
    }, []),
  );

  const startEmptyWorkout = () => {
    const inProgress = workoutRepo.getInProgressSession();
    const session = inProgress ?? workoutRepo.createSession();
    nav.navigate('ActiveWorkout', { sessionId: session.id });
  };

  const goalLabel = profile
    ? GOAL_OPTIONS.find((g) => g.id === profile.goal)?.label
    : null;

  return (
    <Screen scroll>
      <AppHeader
        title="You"
        rightAction={{
          icon: 'settings-outline',
          label: 'Settings',
          onPress: () => nav.navigate('Settings'),
        }}
      />

      <Card>
        <AppText variant="label" color="muted">Goals</AppText>
        <AppText variant="title3" style={{ marginTop: spacing.sm }}>
          {goalLabel ?? 'Set your goals'}
        </AppText>
        <AppText variant="caption" color="sub" style={{ marginTop: spacing.xs }}>
          {profile
            ? `${profile.daysPerWeek} days/week · ${profile.experience}`
            : 'Age, weight, and a training goal unlock protein targets and a plan.'}
        </AppText>
        <TouchableOpacity
          style={[styles.linkRow, { marginTop: spacing.md }]}
          onPress={() => nav.navigate('ProfileSetup')}
          accessibilityRole="button"
          accessibilityLabel="Edit goals"
        >
          <AppText variant="bodySemiBold" color="accent">
            {profile ? 'Edit goals' : 'Set goals'}
          </AppText>
          <Ionicons name="chevron-forward" size={18} color={colors.primary} />
        </TouchableOpacity>
      </Card>

      <Card onPress={startEmptyWorkout} accessibilityLabel="Start a workout">
        <Row icon="play-circle-outline" colors={colors} title="Start workout" subtitle="Log sets, weight, and reps" />
      </Card>

      <Card onPress={() => nav.navigate('Plan')} accessibilityLabel="Open training plan">
        <Row icon="calendar-outline" colors={colors} title="Training plan" subtitle="Pre-built days from your goal" />
      </Card>

      <Card onPress={() => nav.navigate('WorkoutHistory')} accessibilityLabel="Open workout history and progress">
        <Row
          icon="trophy-outline"
          colors={colors}
          title="Progress"
          subtitle={streak > 0 ? `${streak}-day streak · PRs and history` : 'Streak, PRs, and history'}
        />
      </Card>

      <Card onPress={() => nav.navigate('Steps')} accessibilityLabel="Open activity">
        <Row icon="walk-outline" colors={colors} title="Activity" subtitle="Steps and health data" />
      </Card>

      <Card
        onPress={() => nav.navigate('CreateCustomExercise')}
        accessibilityLabel="Add custom exercise"
      >
        <Row icon="add-circle-outline" colors={colors} title="Custom exercise" subtitle="Add a lift to the library" />
      </Card>
    </Screen>
  );
}

function Row({ icon, colors, title, subtitle }) {
  return (
    <View style={styles.row}>
      <View style={[styles.iconWrap, { backgroundColor: colors.primarySubtle }]}>
        <Ionicons name={icon} size={20} color={colors.primary} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={[styles.rowTitle, { color: colors.text }]}>{title}</Text>
        <Text style={[styles.rowSub, { color: colors.textSub }]}>{subtitle}</Text>
      </View>
      <Ionicons name="chevron-forward" size={18} color={colors.textSub} />
    </View>
  );
}

const styles = StyleSheet.create({
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowTitle: {
    fontFamily: fontFamily.body.bold,
    fontSize: fontSize.md,
  },
  rowSub: {
    fontFamily: fontFamily.body.regular,
    fontSize: fontSize.sm,
    marginTop: 2,
  },
});
