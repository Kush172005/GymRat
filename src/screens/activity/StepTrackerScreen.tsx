import React from 'react';
import { View, Text, StyleSheet, Platform, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { useTheme } from '../../theme';
import { fontFamily, fontSize } from '../../theme/typography';
import { spacing, radius } from '../../theme/spacing';
import { Screen, AppHeader, Card, AppText, Button, PermissionState, ErrorState } from '../../components/ui';
import { useHealth, openPlayHealthConnect } from '../../hooks/useHealth';
import { profileRepo } from '../../db/profileRepo';
import { computeTargets } from '../../domain/nutrition';
import { dayLabel } from '../../utils/date';
import { openAppSettings } from '../../utils/permissions';
import { HealthSnapshot, HealthStatus } from '../../health/types';
import { isExpoGo } from '../../health/env';

function sourceLabel(source: HealthSnapshot['source']): string {
  if (source === 'health_connect') return 'Health Connect';
  if (source === 'apple_health') return 'Apple Health';
  return Platform.OS === 'android' ? 'Phone sensor' : 'Motion & Fitness';
}

function permissionCopy(status: HealthStatus): { title: string; message: string } {
  const go = isExpoGo();
  if (status === 'needs_install') {
    return {
      title: 'Install Health Connect',
      message:
        'Android stores steps, heart rate, calories, and workouts from Samsung Health, Fitbit, and other apps in Health Connect. Install it from Play Store, then return here to allow access.',
    };
  }
  if (Platform.OS === 'android') {
    return {
      title: go ? 'Physical activity' : 'Health Connect',
      message: go
        ? 'Android has no Motion permission. Expo Go can only use Physical activity to count steps while GymRat is open. For Samsung Health / Fitbit / Google Fit data, run a native build (npx expo run:android) and allow Health Connect.'
        : 'Health Connect is Android’s built-in hub. Apps like Samsung Health, Fitbit, and Google Fit write here. GymRat reads steps, calories, heart rate, sleep, distance, and workouts with your permission.',
    };
  }
  return {
    title: go ? 'Motion & Fitness' : 'Apple Health',
    message: go
      ? 'Expo Go can read the phone’s step sensor (Motion & Fitness). For Apple Fitness / Watch heart rate, sleep, and calories, install a development build (npx expo run:ios) and allow Apple Health.'
      : 'Apple Health is the system hub used by Fitness and Apple Watch. GymRat reads steps, active calories, heart rate, sleep, distance, and workouts. Data stays on this iPhone.',
  };
}

export function StepTrackerScreen() {
  const { colors } = useTheme();
  const nav = useNavigation();
  const { status, snapshot, request, expoGo, openHealthSettings } = useHealth();
  const profile = profileRepo.get();
  const goal = profile ? computeTargets(profile).stepGoal : 8000;
  const week = snapshot.week.length ? snapshot.week : [];
  const max = Math.max(...week.map((d) => d.steps), goal, 1);
  const pct = Math.min(100, (snapshot.steps / goal) * 100);
  const weekTotal = week.reduce((a, d) => a + d.steps, 0);
  const weekAvg = Math.round(weekTotal / Math.max(1, week.length));
  const weekBest = Math.max(0, ...week.map((d) => d.steps));
  const copy = permissionCopy(status);

  return (
    <Screen scroll>
      <AppHeader title="Activity" onBack={() => nav.goBack()} />

      {status === 'unavailable' && (
        <ErrorState
          title="No activity data"
          message="This device does not expose Health Connect, Apple Health, or a step sensor. Workouts and protein targets still work."
        />
      )}

      {(status === 'denied' || status === 'undetermined' || status === 'needs_install') && (
        <PermissionState
          title={copy.title}
          message={copy.message}
          onRequest={status === 'needs_install' ? openPlayHealthConnect : request}
          requestLabel={status === 'needs_install' ? 'Install Health Connect' : 'Allow access'}
          showSettings={status === 'denied' || status === 'needs_install'}
          onOpenSettings={
            status === 'needs_install'
              ? openPlayHealthConnect
              : snapshot.source === 'health_connect'
                ? () => openHealthSettings()
                : openAppSettings
          }
        />
      )}

      {status === 'checking' && (
        <AppText variant="body" color="sub">Checking activity source…</AppText>
      )}

      {status !== 'unavailable' && status !== 'checking' && (
        <>
          <AppText variant="caption" color="muted" style={{ marginBottom: spacing.md }}>
            Source · {sourceLabel(status === 'granted' ? snapshot.source : Platform.OS === 'android' ? (expoGo ? 'phone_sensor' : 'health_connect') : (expoGo ? 'phone_sensor' : 'apple_health'))}
          </AppText>

          <Card style={styles.hero}>
            <View style={[styles.icon, { backgroundColor: colors.primarySubtle }]}>
              <Ionicons name="walk" size={36} color={colors.primary} />
            </View>
            <Text style={[styles.count, { color: colors.text }]}>{snapshot.steps.toLocaleString()}</Text>
            <AppText variant="bodyMedium" color="sub">of {goal.toLocaleString()} step goal</AppText>
            <View style={[styles.track, { backgroundColor: colors.surface2 }]}>
              <View style={[styles.fill, { width: `${pct}%` as `${number}%`, backgroundColor: colors.primary }]} />
            </View>
            <AppText variant="captionMedium" color="muted" style={{ marginTop: 8 }}>
              {Math.max(0, goal - snapshot.steps).toLocaleString()} to go · {pct.toFixed(0)}%
            </AppText>
          </Card>

          {status === 'granted' ? (
            <>
              <View style={styles.grid}>
                <Metric colors={colors} icon="flame-outline" label="Active kcal" value={fmt(snapshot.caloriesKcal)} />
                <Metric colors={colors} icon="navigate-outline" label="Distance" value={dist(snapshot.distanceM)} />
                <Metric colors={colors} icon="heart-outline" label="Heart rate" value={snapshot.heartRateBpm != null ? `${snapshot.heartRateBpm}` : '—'} hint="bpm" />
                <Metric colors={colors} icon="moon-outline" label="Sleep" value={sleep(snapshot.sleepMin)} />
                <Metric colors={colors} icon="scale-outline" label="Weight" value={wt(snapshot.weightKg)} />
                <Metric colors={colors} icon="barbell-outline" label="Workouts" value={snapshot.workouts != null ? String(snapshot.workouts) : '—'} />
              </View>

              <Card>
                <AppText variant="sectionHeader" style={{ marginBottom: spacing.lg }}>Last 7 days</AppText>
                <View style={styles.chart}>
                  {week.map((d, i) => {
                    const h = max > 0 ? (d.steps / max) * 120 : 0;
                    const today = i === week.length - 1;
                    return (
                      <View key={d.date} style={styles.col}>
                        <Text style={[styles.barN, { color: today ? colors.primary : colors.textMuted }]}>
                          {d.steps >= 1000 ? `${(d.steps / 1000).toFixed(1)}k` : d.steps || ''}
                        </Text>
                        <View
                          style={[
                            styles.bar,
                            {
                              height: Math.max(4, h),
                              backgroundColor: today ? colors.primary : colors.surface2,
                              borderColor: today ? colors.primaryDark : colors.border,
                            },
                          ]}
                        />
                        <Text style={[styles.barL, { color: today ? colors.primary : colors.textMuted }]}>
                          {dayLabel(d.date).slice(0, 3)}
                        </Text>
                      </View>
                    );
                  })}
                </View>
                <View style={styles.statRow}>
                  <Stat label="Week total" value={weekTotal.toLocaleString()} colors={colors} />
                  <Stat label="Daily avg" value={weekAvg.toLocaleString()} colors={colors} />
                  <Stat label="Best day" value={weekBest.toLocaleString()} colors={colors} />
                </View>
              </Card>
            </>
          ) : null}

          <Card variant="subtle">
            <AppText variant="caption" color="sub">
              {expoGo
                ? Platform.OS === 'ios'
                  ? 'You are in Expo Go. App Store Expo Go supports SDK 54 only. Update Expo Go if it says the project is outdated. Apple Health (Watch, Fitness) needs npx expo run:ios once.'
                  : 'You are in Expo Go. Health Connect is not in Expo Go — only Physical activity steps. For Samsung Health / Fitbit data run npx expo run:android once.'
                : Platform.OS === 'ios'
                  ? 'Reading Apple Health, the same store Fitness and Watch write to. GymRat does not upload this data.'
                  : 'Reading Health Connect, where Samsung Health, Fitbit, and similar apps can share data. GymRat does not upload this data.'}
            </AppText>
            {!expoGo && Platform.OS === 'android' ? (
              <Button title="Open Health Connect" onPress={() => openHealthSettings()} variant="ghost" fullWidth style={{ marginTop: spacing.md }} />
            ) : null}
            {expoGo && Platform.OS === 'ios' ? (
              <Button
                title="How to update Expo Go"
                onPress={() => Linking.openURL('https://apps.apple.com/app/expo-go/id982107779')}
                variant="ghost"
                fullWidth
                style={{ marginTop: spacing.md }}
              />
            ) : null}
          </Card>
        </>
      )}
    </Screen>
  );
}

function fmt(n: number | null): string {
  return n == null ? '—' : Math.round(n).toLocaleString();
}
function dist(m: number | null): string {
  if (m == null) return '—';
  if (m >= 1000) return `${(m / 1000).toFixed(2)} km`;
  return `${Math.round(m)} m`;
}
function sleep(min: number | null): string {
  if (min == null) return '—';
  const h = Math.floor(min / 60);
  const m = Math.round(min % 60);
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}
function wt(kg: number | null): string {
  return kg == null ? '—' : `${kg.toFixed(1)} kg`;
}

function Metric({
  colors, icon, label, value, hint,
}: {
  colors: { surface: string; border: string; text: string; textMuted: string; primary: string };
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <View style={[styles.metric, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <Ionicons name={icon} size={18} color={colors.primary} />
      <Text style={[styles.metricV, { color: colors.text }]}>{value}</Text>
      <Text style={[styles.metricL, { color: colors.textMuted }]}>{label}{hint ? ` · ${hint}` : ''}</Text>
    </View>
  );
}

function Stat({
  label,
  value,
  colors,
}: {
  label: string;
  value: string;
  colors: { text: string; textMuted: string };
}) {
  return (
    <View style={styles.stat}>
      <Text style={[styles.statV, { color: colors.text }]}>{value}</Text>
      <Text style={[styles.statL, { color: colors.textMuted }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: { alignItems: 'center', paddingVertical: spacing['2xl'] },
  icon: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  count: {
    fontFamily: fontFamily.display.bold,
    fontSize: 52,
    letterSpacing: -2,
  },
  track: {
    width: '100%',
    height: 10,
    borderRadius: 5,
    overflow: 'hidden',
    marginTop: spacing.lg,
  },
  fill: { height: '100%' },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  metric: {
    width: '48%',
    flexGrow: 1,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: radius.lg,
    padding: spacing.md,
    minHeight: 88,
  },
  metricV: { fontFamily: fontFamily.display.bold, fontSize: fontSize.xl, marginTop: 6 },
  metricL: { fontFamily: fontFamily.body.medium, fontSize: fontSize.xs, marginTop: 2, textTransform: 'uppercase' },
  chart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 170,
    justifyContent: 'space-between',
  },
  col: { flex: 1, alignItems: 'center', justifyContent: 'flex-end' },
  barN: { fontFamily: fontFamily.body.semiBold, fontSize: 9, marginBottom: 4 },
  bar: { width: 22, borderRadius: 8, borderWidth: 1 },
  barL: { fontFamily: fontFamily.body.semiBold, fontSize: fontSize.xs, marginTop: 6 },
  statRow: {
    flexDirection: 'row',
    marginTop: spacing.xl,
    paddingTop: spacing.lg,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(128,128,128,0.25)',
  },
  stat: { flex: 1, alignItems: 'center' },
  statV: { fontFamily: fontFamily.display.bold, fontSize: fontSize.lg },
  statL: { fontFamily: fontFamily.body.medium, fontSize: fontSize.xs, marginTop: 4, textTransform: 'uppercase' },
});
