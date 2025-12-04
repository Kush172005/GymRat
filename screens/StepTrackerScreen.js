import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Pedometer } from "expo-sensors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/Header";

const DAILY_GOAL = 10000;
const STORAGE_KEY = "@step_history";

export default function StepTrackerScreen() {
  const nav = useNavigation();
  const [currentSteps, setCurrentSteps] = useState(0);
  const [isPedometerAvailable, setIsPedometerAvailable] = useState("checking");
  const [weeklyData, setWeeklyData] = useState([]);

  useEffect(() => {
    checkPedometerAvailability();
    loadWeeklyData();
  }, []);

  useEffect(() => {
    let subscription;

    const subscribe = async () => {
      const isAvailable = await Pedometer.isAvailableAsync();
      if (isAvailable) {
        const end = new Date();
        const start = new Date();
        start.setHours(0, 0, 0, 0);

        const pastStepCountResult = await Pedometer.getStepCountAsync(
          start,
          end
        );
        if (pastStepCountResult) {
          setCurrentSteps(pastStepCountResult.steps);
        }

        subscription = Pedometer.watchStepCount((result) => {
          setCurrentSteps((prev) => prev + result.steps);
        });
      }
    };

    subscribe();

    return () => {
      subscription && subscription.remove();
    };
  }, [isPedometerAvailable]);

  useEffect(() => {
    saveCurrentDaySteps();
  }, [currentSteps]);

  async function checkPedometerAvailability() {
    const available = await Pedometer.isAvailableAsync();
    setIsPedometerAvailable(available ? "available" : "unavailable");
  }

  async function loadWeeklyData() {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setWeeklyData(parsed);
      } else {
        initializeWeeklyData();
      }
    } catch (error) {
      initializeWeeklyData();
    }
  }

  function initializeWeeklyData() {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const today = new Date().getDay();
    const data = days.map((day, index) => ({
      day,
      steps: 0,
      isToday: index === today,
    }));
    setWeeklyData(data);
  }

  async function saveCurrentDaySteps() {
    try {
      const today = new Date().getDay();
      const updatedData = weeklyData.map((item, index) => {
        if (index === today) {
          return { ...item, steps: currentSteps };
        }
        return item;
      });
      setWeeklyData(updatedData);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
    } catch (error) {
      console.log("Error saving steps:", error);
    }
  }

  const progressPercentage = Math.min(
    (currentSteps / DAILY_GOAL) * 100,
    100
  ).toFixed(0);

  const maxSteps = Math.max(...weeklyData.map((d) => d.steps), DAILY_GOAL);

  if (isPedometerAvailable === "checking") {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ff577b" />
        <Text style={styles.loadingText}>Checking pedometer...</Text>
      </View>
    );
  }

  if (isPedometerAvailable === "unavailable") {
    return (
      <View style={styles.page}>
        <Header
          title="Step Tracker"
          onPressMenu={() => nav.goBack()}
          onPressFav={() => nav.navigate("Favorites")}
        />
        <View style={styles.errorContainer}>
          <Ionicons name="warning-outline" size={64} color="#ff577b" />
          <Text style={styles.errorTitle}>Pedometer Not Available</Text>
          <Text style={styles.errorText}>
            This device doesn't support step counting or permission was denied.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.page}>
      <Header
        title="Step Tracker"
        onPressMenu={() => nav.goBack()}
        onPressFav={() => nav.navigate("Favorites")}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroCard}>
          <View style={styles.iconContainer}>
            <Ionicons name="walk" size={48} color="#ff577b" />
          </View>

          <Text style={styles.stepCount}>{currentSteps.toLocaleString()}</Text>
          <Text style={styles.stepLabel}>Steps Today</Text>

          <View style={styles.progressBarContainer}>
            <View style={styles.progressBarBg}>
              <View
                style={[
                  styles.progressBarFill,
                  { width: `${progressPercentage}%` },
                ]}
              />
            </View>
            <Text style={styles.progressText}>
              {progressPercentage}% of goal
            </Text>
          </View>

          <View style={styles.goalRow}>
            <Ionicons name="flag" size={18} color="#64748b" />
            <Text style={styles.goalText}>
              Daily Goal: {DAILY_GOAL.toLocaleString()} steps
            </Text>
          </View>
        </View>

        <View style={styles.statsCard}>
          <Text style={styles.sectionTitle}>Calories Burned</Text>
          <Text style={styles.calorieValue}>
            {Math.round(currentSteps * 0.04)} kcal
          </Text>
          <Text style={styles.calorieSubtext}>
            Approx. 0.04 calories per step
          </Text>
        </View>

        <View style={styles.chartCard}>
          <View style={styles.chartHeader}>
            <Text style={styles.sectionTitle}>Weekly Progress</Text>
            <Text style={styles.chartSubtitle}>Last 7 days</Text>
          </View>

          <View style={styles.chartContainer}>
            {weeklyData.map((item, index) => {
              const barHeight =
                maxSteps > 0 ? (item.steps / maxSteps) * 150 : 0;
              return (
                <View key={index} style={styles.barWrapper}>
                  <View style={styles.barContainer}>
                    <View
                      style={[
                        styles.bar,
                        {
                          height: Math.max(barHeight, 4),
                          backgroundColor: item.isToday ? "#ff577b" : "#cbd5e1",
                        },
                      ]}
                    />
                  </View>
                  <Text
                    style={[
                      styles.dayLabel,
                      item.isToday && styles.dayLabelActive,
                    ]}
                  >
                    {item.day}
                  </Text>
                  {item.steps > 0 && (
                    <Text style={styles.stepValue}>
                      {item.steps > 999
                        ? `${(item.steps / 1000).toFixed(1)}k`
                        : item.steps}
                    </Text>
                  )}
                </View>
              );
            })}
          </View>
        </View>

        <View style={styles.tipsCard}>
          <View style={styles.tipRow}>
            <Ionicons name="bulb" size={24} color="#ff577b" />
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.tipTitle}>Keep Moving!</Text>
              <Text style={styles.tipText}>
                Walking 10,000 steps a day can improve your cardiovascular
                health and boost your mood.
              </Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={styles.resetButton}
          onPress={async () => {
            setCurrentSteps(0);
            initializeWeeklyData();
            await AsyncStorage.removeItem(STORAGE_KEY);
          }}
        >
          <Ionicons name="refresh" size={20} color="#64748b" />
          <Text style={styles.resetText}>Reset All Data</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#f7fbff",
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f7fbff",
  },

  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#64748b",
    fontWeight: "600",
  },

  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },

  errorTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#0f172a",
    marginTop: 24,
    marginBottom: 12,
  },

  errorText: {
    fontSize: 16,
    color: "#64748b",
    textAlign: "center",
    lineHeight: 24,
  },

  scrollContent: {
    padding: 16,
  },

  heroCard: {
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 32,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
    marginBottom: 16,
  },

  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#fff0f3",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },

  stepCount: {
    fontSize: 56,
    fontWeight: "900",
    color: "#0f172a",
    letterSpacing: -2,
  },

  stepLabel: {
    fontSize: 18,
    color: "#64748b",
    fontWeight: "600",
    marginTop: 4,
  },

  progressBarContainer: {
    width: "100%",
    marginTop: 24,
  },

  progressBarBg: {
    width: "100%",
    height: 12,
    backgroundColor: "#f1f5f9",
    borderRadius: 6,
    overflow: "hidden",
  },

  progressBarFill: {
    height: "100%",
    backgroundColor: "#ff577b",
    borderRadius: 6,
  },

  progressText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#64748b",
    marginTop: 8,
    textAlign: "center",
  },

  goalRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#f1f5f9",
  },

  goalText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#64748b",
    marginLeft: 8,
  },

  statsCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 16,
    alignItems: "center",
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#0f172a",
  },

  calorieValue: {
    fontSize: 42,
    fontWeight: "900",
    color: "#ff577b",
    marginTop: 12,
  },

  calorieSubtext: {
    fontSize: 14,
    color: "#94a3b8",
    marginTop: 4,
  },

  chartCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 16,
  },

  chartHeader: {
    marginBottom: 24,
  },

  chartSubtitle: {
    fontSize: 14,
    color: "#94a3b8",
    marginTop: 4,
  },

  chartContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
    height: 180,
    paddingBottom: 8,
  },

  barWrapper: {
    alignItems: "center",
    flex: 1,
  },

  barContainer: {
    height: 150,
    justifyContent: "flex-end",
    marginBottom: 8,
  },

  bar: {
    width: 28,
    borderRadius: 14,
    minHeight: 4,
  },

  dayLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#94a3b8",
    marginTop: 8,
  },

  dayLabelActive: {
    color: "#ff577b",
    fontWeight: "800",
  },

  stepValue: {
    fontSize: 10,
    color: "#cbd5e1",
    marginTop: 4,
    fontWeight: "600",
  },

  tipsCard: {
    backgroundColor: "#fff9f0",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "#ffe6cc",
    marginBottom: 16,
  },

  tipRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  tipTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#0f172a",
    marginBottom: 6,
  },

  tipText: {
    fontSize: 14,
    color: "#64748b",
    lineHeight: 20,
  },

  resetButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#f8fafc",
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },

  resetText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#64748b",
    marginLeft: 8,
  },
});
