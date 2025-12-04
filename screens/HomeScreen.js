import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
  Easing,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Header from "../components/Header";

function useRandomQuote() {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchQuote() {
      try {
        const res = await fetch("https://zenquotes.io/api/random");
        const data = await res.json();
        const q = Array.isArray(data) ? data[0] : data;
        setQuote({ content: q.q, author: q.a });
      } catch {
        setQuote({
          content: "The body achieves what the mind believes.",
          author: "Anonymous",
        });
      } finally {
        setLoading(false);
      }
    }
    fetchQuote();
  }, []);

  return { quote, loading };
}

export default function HomeScreen() {
  const nav = useNavigation();
  const { quote, loading } = useRandomQuote();

  const images = [
    "https://i.pinimg.com/736x/0c/a7/53/0ca7534669efb0ed5a111a99db775cdf.jpg",
    "https://i.pinimg.com/1200x/04/2f/24/042f24d95e88ce396fbd22861da9b2f2.jpg",
    "https://i.pinimg.com/1200x/16/15/8d/16158d888b9171fbbcbd0d212549fd14.jpg",
    "https://i.pinimg.com/1200x/5b/90/01/5b90017e5d51dc3c278e08135dd7ecc5.jpg",
    "https://i.pinimg.com/736x/58/d8/86/58d8868d14e98c5dc3d86992f15b12fa.jpg",
    "https://i.pinimg.com/1200x/43/d0/79/43d0799004cdf5934a3c9daef739aad4.jpg",
  ];

  const [index, setIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const interval = setInterval(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }).start(() => {
        setIndex((prev) => (prev + 1) % images.length);

        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }).start();
      });
    }, 6000);

    return () => clearInterval(interval);
  }, [fadeAnim]);

  return (
    <View style={styles.bgContainer}>
      <Animated.Image
        source={{ uri: images[index] }}
        style={[styles.bgImage, { opacity: fadeAnim }]}
        resizeMode="cover"
      />

      <View style={styles.overlay} />
      <Header
        title="FitFlow"
        onPressMenu={() => {}}
        onPressFav={() => nav.navigate("Favorites")}
      />

      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.hero}>
            <Text style={styles.title}>Crush Your Workout</Text>
            <Text style={styles.subtitle}>
              Smart workouts • Beautiful UI • Track effortlessly
            </Text>

            <View style={styles.actionRow}>
              <TouchableOpacity
                style={styles.primaryBtn}
                onPress={() => nav.navigate("List")}
              >
                <Text style={styles.primaryText}>Explore Exercises</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.secondaryBtn}
                onPress={() => nav.navigate("Favorites")}
              >
                <Text style={styles.secondaryText}>Saved</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            style={styles.stepTrackerCard}
            onPress={() => nav.navigate("StepTracker")}
            activeOpacity={0.8}
          >
            <View style={styles.stepTrackerIcon}>
              <Ionicons name="walk" size={32} color="#ff577b" />
            </View>
            <View style={styles.stepTrackerContent}>
              <Text style={styles.stepTrackerTitle}>Daily Step Tracker</Text>
              <Text style={styles.stepTrackerSubtitle}>
                Track your daily steps and reach your fitness goals
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#fff" />
          </TouchableOpacity>

          <View style={styles.quoteCard}>
            <Text style={styles.quoteHeader}>Daily Motivation ⚡</Text>
            {loading ? (
              <ActivityIndicator style={{ marginTop: 8 }} color="#ff577b" />
            ) : (
              <>
                <Text style={styles.quoteText}>"{quote.content}"</Text>
                <Text style={styles.quoteAuthor}>— {quote.author}</Text>
              </>
            )}
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  bgContainer: {
    flex: 1,
    backgroundColor: "#0f172a",
  },
  bgImage: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  hero: {
    marginTop: 20,
  },
  title: {
    color: "#fff",
    fontSize: 36,
    fontWeight: "900",
  },
  subtitle: {
    color: "#e6f0ff",
    marginTop: 8,
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 22,
  },
  actionRow: {
    flexDirection: "row",
    marginTop: 28,
    alignItems: "center",
  },
  primaryBtn: {
    backgroundColor: "#ff577b",
    paddingVertical: 14,
    paddingHorizontal: 22,
    borderRadius: 14,
    marginRight: 14,
  },
  primaryText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  secondaryBtn: {
    borderWidth: 2,
    borderColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 14,
  },
  secondaryText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  stepTrackerCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.15)",
    borderColor: "rgba(255,255,255,0.3)",
    borderWidth: 1,
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 5,
  },
  stepTrackerIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "rgba(255,255,255,0.9)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  stepTrackerContent: {
    flex: 1,
  },
  stepTrackerTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#fff",
    marginBottom: 4,
  },
  stepTrackerSubtitle: {
    fontSize: 13,
    color: "#e2e8f0",
    fontWeight: "500",
    lineHeight: 18,
  },
  quoteCard: {
    backgroundColor: "rgba(255,255,255,0.12)",
    borderColor: "rgba(255,255,255,0.25)",
    borderWidth: 1,
    padding: 18,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 10,
    elevation: 8,
  },
  quoteHeader: {
    fontWeight: "800",
    fontSize: 17,
    color: "#fff",
  },
  quoteText: {
    fontSize: 15,
    color: "#f1f5f9",
    fontStyle: "italic",
    marginTop: 10,
    lineHeight: 22,
  },
  quoteAuthor: {
    marginTop: 6,
    textAlign: "right",
    fontSize: 13,
    fontWeight: "600",
    color: "#e2e8f0",
  },
});
