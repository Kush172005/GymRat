import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated, Easing } from "react-native";

const BenchPressLoader = () => {
  const barbellY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const benchPress = Animated.sequence([
      Animated.timing(barbellY, {
        toValue: 20,
        duration: 800,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.delay(80),
      Animated.timing(barbellY, {
        toValue: 0,
        duration: 500,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.delay(350),
    ]);

    Animated.loop(benchPress).start();
    return () => barbellY.stopAnimation();
  }, [barbellY]);

  const BarbellPlates = () => (
    <View style={styles.barbellWeights}>
      <View style={styles.plate} />
      <View style={styles.bar} />
      <View style={styles.plate} />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.loaderScale}>
        <View style={styles.benchArea}>
          <View style={styles.rackPost} />
          <View style={[styles.rackPost, { right: 18, left: "auto" }]} />
          <View style={styles.bench} />
          <View style={styles.torso} />
          <View style={styles.head} />

          <Animated.View
            style={[
              styles.barbellContainer,
              { transform: [{ translateY: barbellY }] },
            ]}
          >
            <BarbellPlates />
          </Animated.View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loaderScale: {
    transform: [{ scale: 0.9 }],
  },
  benchArea: {
    width: 180,
    height: 100,
    alignItems: "center",
  },
  rackPost: {
    position: "absolute",
    top: 25,
    left: 18,
    width: 4,
    height: 35,
    backgroundColor: "#333",
    borderRadius: 2,
    zIndex: 0,
  },
  bench: {
    position: "absolute",
    bottom: 18,
    width: "100%",
    height: 14,
    backgroundColor: "#555",
    borderRadius: 3,
    zIndex: 1,
  },
  head: {
    position: "absolute",
    bottom: 38,
    left: 38,
    width: 12,
    height: 12,
    backgroundColor: "#ff5c7c",
    borderRadius: 6,
    zIndex: 3,
  },
  torso: {
    position: "absolute",
    bottom: 30,
    width: 70,
    height: 12,
    backgroundColor: "#ff5c7c",
    borderRadius: 4,
    zIndex: 2,
  },
  barbellContainer: {
    position: "absolute",
    top: 40,
    width: 160,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 4,
  },
  barbellWeights: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  bar: {
    width: 100,
    height: 3,
    backgroundColor: "#0f172a",
  },
  plate: {
    width: 16,
    height: 28,
    backgroundColor: "#ffc107",
    borderRadius: 3,
    marginHorizontal: 2,
  },
});

export default BenchPressLoader;
