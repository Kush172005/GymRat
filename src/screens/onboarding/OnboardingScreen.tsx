import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Animated,
  Platform,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { useTheme } from '../../theme';
import { fontFamily, fontSize } from '../../theme/typography';
import { spacing, radius } from '../../theme/spacing';
import { RootStackParamList } from '../../navigation/types';
import { settingsRepo } from '../../db/settingsRepo';

const { width: SW, height: SH } = Dimensions.get('window');

type Nav = NativeStackNavigationProp<RootStackParamList>;

const SLIDES = [
  {
    id: '1',
    icon: 'barbell-outline' as const,
    title: 'Exercise Library',
    body: '37+ exercises with step-by-step instructions and video demos for every major muscle group.',
  },
  {
    id: '2',
    icon: 'fitness-outline' as const,
    title: 'A plan from your goal',
    body: 'Set a goal and training days. GymRat gives you a pre-built week from the exercise library — no empty workout to fill in.',
  },
  {
    id: '3',
    icon: 'nutrition-outline' as const,
    title: 'Protein that is actually calculated',
    body: 'Age, height, weight, activity, and goal feed Mifflin–St Jeor calories and ISSN protein targets — then you log food against them.',
  },
];

export function OnboardingScreen() {
  const nav = useNavigation<Nav>();
  const { colors, isDark } = useTheme();
  const flatRef = useRef<FlatList>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [index, setIndex] = React.useState(0);

  const finish = () => {
    settingsRepo.setOnboardingDone();
    nav.replace('ProfileSetup');
  };

  const goNext = () => {
    if (index < SLIDES.length - 1) {
      flatRef.current?.scrollToIndex({ index: index + 1 });
      setIndex(index + 1);
    } else {
      finish();
    }
  };

  const skip = () => finish();

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <StatusBar style={isDark ? 'light' : 'dark'} />

      {/* Skip */}
      <TouchableOpacity
        style={[styles.skipBtn, { top: Platform.OS === 'ios' ? 58 : 24 }]}
        onPress={skip}
        accessibilityRole="button"
        accessibilityLabel="Skip onboarding"
      >
        <Text style={[styles.skipText, { color: colors.textSub }]}>Skip</Text>
      </TouchableOpacity>

      {/* Slides */}
      <Animated.FlatList
        ref={flatRef}
        data={SLIDES}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(s) => s.id}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false },
        )}
        onMomentumScrollEnd={(e) => {
          setIndex(Math.round(e.nativeEvent.contentOffset.x / SW));
        }}
        renderItem={({ item }) => (
          <View style={[styles.slide, { width: SW }]}>
            <View style={[styles.iconCircle, { backgroundColor: colors.primarySubtle }]}>
              <Ionicons name={item.icon} size={72} color={colors.primary} />
            </View>
            <Text style={[styles.slideTitle, { color: colors.text }]}>{item.title}</Text>
            <Text style={[styles.slideBody,  { color: colors.textSub }]}>{item.body}</Text>
          </View>
        )}
      />

      {/* Dots */}
      <View style={styles.dots}>
        {SLIDES.map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              {
                backgroundColor: i === index ? colors.primary : colors.border,
                width: i === index ? 22 : 8,
              },
            ]}
          />
        ))}
      </View>

      {/* CTA */}
      <TouchableOpacity
        style={[styles.cta, { backgroundColor: colors.primary }]}
        onPress={goNext}
        accessibilityRole="button"
        accessibilityLabel={index === SLIDES.length - 1 ? 'Get started' : 'Next slide'}
      >
        <Text style={styles.ctaText}>
          {index === SLIDES.length - 1 ? 'Get Started' : 'Next'}
        </Text>
        <Ionicons name="arrow-forward" size={20} color="#fff" style={{ marginLeft: 8 }} />
      </TouchableOpacity>

      <View style={styles.bottomSpacer} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  skipBtn: {
    position: 'absolute',
    right: spacing.xl,
    zIndex: 10,
    padding: spacing.sm,
  },
  skipText: {
    fontFamily: fontFamily.body.semiBold,
    fontSize: fontSize.md,
  },
  slide: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing['3xl'],
    paddingTop: SH * 0.12,
  },
  iconCircle: {
    width: 160,
    height: 160,
    borderRadius: radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing['3xl'],
  },
  slideTitle: {
    fontFamily: fontFamily.display.bold,
    fontSize: fontSize['3xl'],
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  slideBody: {
    fontFamily: fontFamily.body.regular,
    fontSize: fontSize.lg,
    textAlign: 'center',
    lineHeight: 28,
  },
  dots: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing['2xl'],
    gap: spacing.sm,
  },
  dot: {
    height: 8,
    borderRadius: radius.full,
  },
  cta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    borderRadius: radius.xl,
  },
  ctaText: {
    fontFamily: fontFamily.body.bold,
    fontSize: fontSize.lg,
    color: '#FFFFFF',
  },
  bottomSpacer: { height: spacing['3xl'] },
});
