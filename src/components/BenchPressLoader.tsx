import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import { useTheme } from '../theme';

export function BenchPressLoader() {
  const { colors } = useTheme();
  const barbellY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const anim = Animated.loop(
      Animated.sequence([
        Animated.timing(barbellY, {
          toValue: 22,
          duration: 780,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.delay(60),
        Animated.timing(barbellY, {
          toValue: 0,
          duration: 480,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.delay(320),
      ]),
    );
    anim.start();
    return () => anim.stop();
  }, [barbellY]);

  return (
    <View style={styles.container}>
      <View style={styles.scene}>
        {/* Rack posts */}
        <View style={[styles.post, styles.postLeft,  { backgroundColor: colors.textMuted }]} />
        <View style={[styles.post, styles.postRight, { backgroundColor: colors.textMuted }]} />
        {/* Bench */}
        <View style={[styles.bench, { backgroundColor: colors.surface2, borderColor: colors.border }]} />
        {/* Body */}
        <View style={[styles.torso, { backgroundColor: colors.primary }]} />
        <View style={[styles.head,  { backgroundColor: colors.primary }]} />
        {/* Barbell */}
        <Animated.View
          style={[styles.barbellWrap, { transform: [{ translateY: barbellY }] }]}
        >
          <View style={styles.barbellRow}>
            <View style={[styles.plate, { backgroundColor: colors.warning }]} />
            <View style={[styles.bar,   { backgroundColor: colors.textSub }]} />
            <View style={[styles.plate, { backgroundColor: colors.warning }]} />
          </View>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scene: {
    width: 180,
    height: 110,
    alignItems: 'center',
  },
  post: {
    position: 'absolute',
    top: 24,
    width: 4,
    height: 34,
    borderRadius: 2,
  },
  postLeft:  { left: 16 },
  postRight: { right: 16 },
  bench: {
    position: 'absolute',
    bottom: 16,
    width: '100%',
    height: 14,
    borderRadius: 4,
    borderWidth: 1,
  },
  torso: {
    position: 'absolute',
    bottom: 30,
    width: 68,
    height: 12,
    borderRadius: 4,
  },
  head: {
    position: 'absolute',
    bottom: 42,
    left: 36,
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  barbellWrap: {
    position: 'absolute',
    top: 36,
    width: 160,
    alignItems: 'center',
  },
  barbellRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bar: {
    width: 100,
    height: 3,
    borderRadius: 2,
  },
  plate: {
    width: 14,
    height: 26,
    borderRadius: 3,
    marginHorizontal: 2,
  },
});
