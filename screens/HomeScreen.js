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
        const res = await fetch("https://api.quotable.io/random");
        const json = await res.json();
        setQuote({ content: json.content, author: json.author });
      } catch (e) {
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
        uri: "https://images.unsplash.com/photo-1558611848-73f7eb4001d0?auto=format&fit=crop&w=1200&q=80",
      }}
      style={styles.bg}
      imageStyle={{ opacity: 0.6 }}
    >
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <Header
        title="FitFlow"
        onPressMenu={() => {}}
        onPressFav={() => nav.navigate("Favorites")}
      />
      <SafeAreaView style={styles.overlay}>
        <View style={styles.hero}>
          <Text style={styles.hi}>Crush Your Workout</Text>
          <Text style={styles.sub}>
            Smart workouts • Beautiful UI • Track effortlessly
          </Text>

          <View style={styles.actionsRow}>
            <TouchableOpacity
              style={styles.primaryBtn}
              onPress={() => nav.navigate("List")}
            >
              <Text style={styles.primaryText}>Explore Exercises</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.ghostBtn}
              onPress={() => nav.navigate("Favorites")}
            >
              <Text style={styles.ghostText}>Saved</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.bottomCard}>
          <Text style={styles.cardTitle}>Daily Motivation ⚡</Text>
          {loading ? (
            <ActivityIndicator color="#0f172a" style={{ marginTop: 8 }} />
          ) : (
            <>
              <Text style={styles.cardQuoteTxt}>"{quote.content}"</Text>
              <Text style={styles.cardQuoteAuthor}>- {quote.author}</Text>
            </>
          )}
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1, backgroundColor: "#0f172a" },
  overlay: {
    flex: 1,
    paddingHorizontal: 12,
    justifyContent: "space-between",
  },
  hero: { marginTop: 10, paddingBottom: 20 },
  hi: { color: "#fff", fontSize: 36, fontWeight: "900" },
  sub: { color: "#e6f0ff", marginTop: 8, fontSize: 16, fontWeight: "500" },
  actionsRow: { flexDirection: "row", marginTop: 24, alignItems: "center" },
  primaryBtn: {
    backgroundColor: "#ff5c7c",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 14,
    marginRight: 16,
    elevation: 8,
  },
  primaryText: { color: "#fff", fontWeight: "700", fontSize: 16 },
  ghostBtn: {
    borderWidth: 2,
    borderColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 14,
  },
  ghostText: { color: "#fff", fontWeight: "600", fontSize: 16 },
  bottomCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 30,
    shadowColor: "#0f172a",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 10,
  },
  cardTitle: { fontWeight: "900", fontSize: 18, color: "#0f172a" },
  cardQuoteTxt: {
    marginTop: 10,
    fontSize: 14.5,
    color: "#444",
    fontStyle: "italic",
  },
  cardQuoteAuthor: {
    marginTop: 4,
    fontSize: 12,
    color: "#666",
    textAlign: "right",
    fontWeight: "600",
  },
});
