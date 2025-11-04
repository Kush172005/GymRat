import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
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

  return (
    <ImageBackground
      source={{
        uri: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=80",
      }}
      style={styles.bg}
      imageStyle={{ opacity: 0.55 }}
    >
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <Header
        title="FitFlow"
        onPressMenu={() => {}}
        onPressFav={() => nav.navigate("Favorites")}
      />

      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.gradientOverlay} />

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

          {/* Quote Card */}
          <View style={styles.quoteCard}>
            <Text style={styles.quoteHeader}>Daily Motivation ⚡</Text>
            {loading ? (
              <ActivityIndicator style={{ marginTop: 8 }} />
            ) : (
              <>
                <Text style={styles.quoteText}>"{quote.content}"</Text>
                <Text style={styles.quoteAuthor}>- {quote.author}</Text>
              </>
            )}
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: "#0f172a",
  },

  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.25)",
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
    fontSize: 38,
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

  quoteCard: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 9,
    elevation: 6,
  },

  quoteHeader: {
    fontWeight: "800",
    fontSize: 18,
    color: "#0f172a",
  },

  quoteText: {
    fontSize: 14.5,
    color: "#333",
    fontStyle: "italic",
    marginTop: 10,
    lineHeight: 20,
  },

  quoteAuthor: {
    marginTop: 6,
    textAlign: "right",
    fontSize: 13,
    fontWeight: "600",
    color: "#555",
  },
});
