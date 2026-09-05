import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp } from '@react-navigation/native';

import { useTheme } from '../../theme';
import { fontFamily, fontSize } from '../../theme/typography';
import { spacing, radius } from '../../theme/spacing';
import { profileRepo } from '../../db/profileRepo';
import { nutritionRepo } from '../../db/nutritionRepo';
import { workoutRepo, WorkoutSession } from '../../db/workoutRepo';
import { computeTargets } from '../../domain/nutrition';
import { planForGoal, todaysPlanDay } from '../../domain/plans';
import { useSteps } from '../../hooks/useSteps';
import { HomeStackParamList, TabParamList, RootStackParamList } from '../../navigation/types';

type Nav = CompositeNavigationProp<
  NativeStackNavigationProp<HomeStackParamList, 'HomeMain'>,
  CompositeNavigationProp<
    BottomTabNavigationProp<TabParamList>,
    NativeStackNavigationProp<RootStackParamList>
  >
>;

const HERO_IMAGES = [
  require('../../../assets/images/ListScreen/1-barbell-bench-press.jpg'),
  require('../../../assets/images/ListScreen/2-barbell-squat.jpg'),
  require('../../../assets/images/ListScreen/3-deadlift.jpg'),
  require('../../../assets/images/ListScreen/5-pull-up.jpg'),
  require('../../../assets/images/ListScreen/13-push-up.jpg'),
];

const FALLBACK_QUOTES = [
  { content: 'The body achieves what the mind believes.', author: 'Anonymous' },
  { content: 'No pain, no gain. Shut up and train.', author: 'Anonymous' },
  { content: 'Train insane or remain the same.', author: 'Anonymous' },
  { content: 'Sweat is just fat crying.', author: 'Anonymous' },
  { content: 'Strength does not come from the body — it comes from the will.', author: 'Unknown' },
];

function useQuote() {
  const [quote, setQuote] = useState<{ content: string; author: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetch('https://zenquotes.io/api/random')
      .then((r) => r.json())
      .then((d) => {
        if (cancelled) return;
        const q = Array.isArray(d) ? d[0] : d;
        setQuote({ content: q.q, author: q.a });
      })
      .catch(() => {
        if (!cancelled) {
          const fb = FALLBACK_QUOTES[Math.floor(Math.random() * FALLBACK_QUOTES.length)];
          setQuote(fb);
        }
      })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  return { quote, loading };
}

export function HomeScreen() {
  const nav = useNavigation<Nav>();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const { quote, loading: quoteLoading } = useQuote();

  const [heroIdx, setHeroIdx] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const [proteinLeft, setProteinLeft] = useState<number | null>(null);
  const [todayPlanTitle, setTodayPlanTitle] = useState<string | null>(null);
  const [inProgress, setInProgress] = useState<WorkoutSession | null>(null);
  const [streak, setStreak] = useState(0);
  const [firstName, setFirstName] = useState<string | null>(null);
  const { steps } = useSteps();
  const stepGoal = (() => {
    const profile = profileRepo.get();
    return profile ? computeTargets(profile).stepGoal : 8000;
  })();

  // Hero slideshow
  useEffect(() => {
    const timer = setInterval(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 800,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }).start(() => {
        setHeroIdx((i) => (i + 1) % HERO_IMAGES.length);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }).start();
      });
    }, 6000);
    return () => clearInterval(timer);
  }, [fadeAnim]);

  // Reload data on focus
  useFocusEffect(
    React.useCallback(() => {
      const profile = profileRepo.get();
      if (profile) {
        const t = computeTargets(profile);
        setProteinLeft(Math.max(0, Math.round(t.proteinG - nutritionRepo.totalsForDate().protein)));
        const plan = planForGoal(profile.goal, profile.daysPerWeek, profile.experience);
        const day = todaysPlanDay(plan, profile.daysPerWeek);
        setTodayPlanTitle(day ? day.title : 'Rest day');
        setFirstName(profile.name?.trim().split(' ')[0] || null);
      } else {
        setProteinLeft(null);
        setTodayPlanTitle(null);
        setFirstName(null);
      }
      setInProgress(workoutRepo.getInProgressSession());
      setStreak(workoutRepo.getProgressStats().streak);
    }, []),
  );

  return (
    <View style={styles.root}>
      <StatusBar style="light" />

      {/* Hero bg */}
      <Animated.Image
        source={HERO_IMAGES[heroIdx]}
        style={[StyleSheet.absoluteFill, { opacity: fadeAnim }]}
        resizeMode="cover"
      />
      <View style={[StyleSheet.absoluteFill, styles.overlay]} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{ paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={[styles.header, { paddingTop: insets.top + spacing.md }]}>
          <View>
            <Text style={styles.greeting}>Good {getGreeting()}{firstName ? `, ${firstName}` : ''}</Text>
            <Text style={styles.appName}>GymRat</Text>
          </View>
          <TouchableOpacity
            style={[styles.favBtn]}
            onPress={() => (nav as any).navigate('Exercises', { screen: 'Favorites' })}
            accessibilityRole="button"
            accessibilityLabel="View saved exercises"
          >
            <Ionicons name="heart" size={22} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Hero text */}
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>Crush Your{'\n'}Workout</Text>
          <View style={styles.ctaRow}>
            <TouchableOpacity
              style={[styles.primaryBtn, { backgroundColor: colors.primary }]}
              onPress={() => (nav as any).navigate('Exercises', { screen: 'ExerciseList' })}
              accessibilityRole="button"
              accessibilityLabel="Explore exercises"
            >
              <Ionicons name="barbell-outline" size={18} color="#fff" style={{ marginRight: 8 }} />
              <Text style={styles.primaryBtnText}>Explore</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryBtn}
              onPress={() => (nav as any).navigate('You', { screen: 'Plan' })}
              accessibilityRole="button"
              accessibilityLabel="Open today's training plan"
            >
              <Ionicons name="calendar-outline" size={16} color="#fff" style={{ marginRight: 6 }} />
              <Text style={styles.secondaryBtnText}>Plan</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Stats row */}
        <View style={styles.statsRow}>
          <TouchableOpacity
            style={[styles.statCard, { backgroundColor: 'rgba(255,255,255,0.13)', borderColor: 'rgba(255,255,255,0.2)' }]}
            onPress={() => (nav as any).navigate('Fuel', { screen: 'Nutrition' })}
            activeOpacity={0.8}
            accessibilityRole="button"
            accessibilityLabel="View protein target"
          >
            <Ionicons name="nutrition-outline" size={20} color={colors.warning} />
            <Text style={styles.statValue}>{proteinLeft == null ? '—' : proteinLeft}</Text>
            <Text style={styles.statLabel}>Protein left</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.statCard, { backgroundColor: 'rgba(255,255,255,0.13)', borderColor: 'rgba(255,255,255,0.2)' }]}
            onPress={() => nav.navigate('Steps')}
            activeOpacity={0.8}
            accessibilityRole="button"
            accessibilityLabel="View step tracker"
          >
            <Ionicons name="walk-outline" size={20} color={colors.primary} />
            <Text style={styles.statValue}>{steps.toLocaleString()}</Text>
            <Text style={styles.statLabel}>/ {stepGoal >= 1000 ? `${Math.round(stepGoal / 1000)}k` : stepGoal}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.statCard, { backgroundColor: 'rgba(255,255,255,0.13)', borderColor: 'rgba(255,255,255,0.2)' }]}
            onPress={() => (nav as any).navigate('You', { screen: 'WorkoutHistory' })}
            activeOpacity={0.8}
            accessibilityRole="button"
            accessibilityLabel="View workout streak"
          >
            <Ionicons name="flame-outline" size={20} color={colors.warning} />
            <Text style={styles.statValue}>{streak}</Text>
            <Text style={styles.statLabel}>Day streak</Text>
          </TouchableOpacity>
        </View>

        {inProgress ? (
          <TouchableOpacity
            style={[styles.lastWorkout, { backgroundColor: colors.primarySubtle, borderColor: colors.primary }]}
            onPress={() => (nav as any).navigate('You', { screen: 'ActiveWorkout', params: { sessionId: inProgress.id } })}
            activeOpacity={0.8}
            accessibilityRole="button"
            accessibilityLabel="Continue in-progress workout"
          >
            <View style={styles.lastWorkoutLeft}>
              <Text style={styles.lastWorkoutTitle}>Continue workout</Text>
              <Text style={styles.lastWorkoutMeta}>Pick up where you left off</Text>
            </View>
            <Ionicons name="play-circle" size={28} color={colors.primary} />
          </TouchableOpacity>
        ) : todayPlanTitle ? (
          <TouchableOpacity
            style={[styles.lastWorkout, { backgroundColor: 'rgba(255,255,255,0.13)', borderColor: 'rgba(255,255,255,0.2)' }]}
            onPress={() => (nav as any).navigate('You', { screen: 'Plan' })}
            activeOpacity={0.8}
            accessibilityRole="button"
            accessibilityLabel="Open today's training plan"
          >
            <View style={styles.lastWorkoutLeft}>
              <Text style={styles.lastWorkoutTitle}>Today's plan</Text>
              <Text style={styles.lastWorkoutMeta}>{todayPlanTitle}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="rgba(255,255,255,0.7)" />
          </TouchableOpacity>
        ) : null}

        {/* Quote */}
        <View style={[styles.quoteCard, { backgroundColor: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.18)' }]}>
          <Text style={styles.quoteHeader}>⚡ Daily Motivation</Text>
          {quoteLoading ? (
            <ActivityIndicator color={colors.primary} style={{ marginTop: 8 }} />
          ) : (
            <>
              <Text style={styles.quoteText}>"{quote?.content}"</Text>
              <Text style={styles.quoteAuthor}>— {quote?.author}</Text>
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return 'morning';
  if (h < 17) return 'afternoon';
  return 'evening';
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#0D0D10' },
  overlay: { backgroundColor: 'rgba(0,0,0,0.5)' },
  scroll: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
  },
  greeting: {
    fontFamily: fontFamily.body.medium,
    fontSize: fontSize.sm,
    color: 'rgba(255,255,255,0.7)',
  },
  appName: {
    fontFamily: fontFamily.display.bold,
    fontSize: fontSize['2xl'],
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  favBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroSection: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing['4xl'],
    paddingBottom: spacing['2xl'],
  },
  heroTitle: {
    fontFamily: fontFamily.display.bold,
    fontSize: 46,
    color: '#FFFFFF',
    lineHeight: 52,
    marginBottom: spacing.xl,
  },
  ctaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  primaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: radius.lg,
  },
  primaryBtnText: {
    fontFamily: fontFamily.body.bold,
    fontSize: fontSize.md,
    color: '#FFFFFF',
  },
  secondaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: radius.lg,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.6)',
  },
  secondaryBtnText: {
    fontFamily: fontFamily.body.bold,
    fontSize: fontSize.md,
    color: '#FFFFFF',
  },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  statCard: {
    flex: 1,
    borderRadius: radius.lg,
    borderWidth: 1,
    padding: spacing.lg,
    alignItems: 'center',
  },
  statValue: {
    fontFamily: fontFamily.display.bold,
    fontSize: fontSize['2xl'],
    color: '#FFFFFF',
    marginTop: spacing.sm,
    letterSpacing: -0.5,
  },
  statLabel: {
    fontFamily: fontFamily.body.medium,
    fontSize: fontSize.xs,
    color: 'rgba(255,255,255,0.6)',
    marginTop: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  lastWorkout: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
    borderRadius: radius.lg,
    borderWidth: 1,
    padding: spacing.lg,
  },
  lastWorkoutLeft: { flex: 1 },
  lastWorkoutTitle: {
    fontFamily: fontFamily.body.bold,
    fontSize: fontSize.md,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  lastWorkoutMeta: {
    fontFamily: fontFamily.body.regular,
    fontSize: fontSize.sm,
    color: 'rgba(255,255,255,0.6)',
  },
  quoteCard: {
    marginHorizontal: spacing.lg,
    borderRadius: radius.lg,
    borderWidth: 1,
    padding: spacing.lg,
  },
  quoteHeader: {
    fontFamily: fontFamily.body.bold,
    fontSize: fontSize.md,
    color: '#FFFFFF',
    marginBottom: spacing.md,
  },
  quoteText: {
    fontFamily: fontFamily.body.regular,
    fontSize: fontSize.md,
    color: 'rgba(255,255,255,0.85)',
    fontStyle: 'italic',
    lineHeight: 24,
    marginBottom: spacing.sm,
  },
  quoteAuthor: {
    fontFamily: fontFamily.body.medium,
    fontSize: fontSize.sm,
    color: 'rgba(255,255,255,0.55)',
    textAlign: 'right',
  },
});
