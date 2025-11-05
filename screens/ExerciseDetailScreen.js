import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

import Header from "../components/Header";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ExerciseDetailScreen() {
  const route = useRoute();
  const nav = useNavigation();
  const { item } = route.params || {};
  const [fav, setFav] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const v = await AsyncStorage.getItem("@fav_" + item.id);
        setFav(!!v);
      } catch (e) {}
    })();
  }, []);

  async function toggleFav() {
    try {
      if (fav) {
        await AsyncStorage.removeItem("@fav_" + item.id);
        setFav(false);
      } else {
        await AsyncStorage.setItem("@fav_" + item.id, JSON.stringify(item));
        setFav(true);
      }
    } catch (e) {}
  }

  const safeItem = item || {
    name: "Unknown Exercise",
    bodyPart: "Unknown",
    equipment: "N/A",
    image:
      "https://images.unsplash.com/photo-1517964603305-11c2f62f430c?auto=format&fit=crop&w=800&q=80",
    description: "Exercise details could not be loaded.",
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#f7fbff" }}>
      <Header
        title="Exercise Details"
        onPressMenu={() => nav.goBack()}
        onPressFav={() => nav.navigate("Favorites")}
      />

      <ScrollView contentContainerStyle={{ padding: 18 }}>
        <Image source={{ uri: safeItem.image }} style={styles.image} />

        <View style={styles.rowTop}>
          <View style={{ flex: 1 }}>
            <Text style={styles.name}>{safeItem.name}</Text>
            <Text style={styles.meta}>
              {safeItem.bodyPart} • {safeItem.equipment}
            </Text>
          </View>

          <TouchableOpacity onPress={toggleFav} style={styles.favBtn}>
            <Ionicons
              name={fav ? "heart" : "heart-outline"}
              size={30}
              color={fav ? "#ff4d6d" : "#999"}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.header}>How to Do</Text>
          <Text style={styles.text}>{safeItem.description}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.header}>Tips</Text>
          <Text style={styles.text}>
            • Keep your posture aligned {"\n"}• Breathe properly {"\n"}•
            Prioritize form over weight {"\n"}• Controlled reps fast reps
          </Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => alert(`Logged: ${safeItem.name} workout! ✅`)}
        >
          <Text style={styles.buttonText}>Mark as Done</Text>
        </TouchableOpacity>
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 260,
    borderRadius: 20,
    marginBottom: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  rowTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontSize: 28,
    fontWeight: "900",
    color: "#0f172a",
  },
  meta: {
    color: "#888",
    marginTop: 4,
    fontSize: 16,
    fontWeight: "500",
  },
  favBtn: {
    padding: 10,
    borderRadius: 14,
  },
  section: {
    marginTop: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  header: {
    fontSize: 20,
    fontWeight: "800",
    color: "#0f172a",
  },
  text: {
    marginTop: 10,
    fontSize: 16,
    color: "#444",
    lineHeight: 24,
  },
  button: {
    marginTop: 30,
    backgroundColor: "#ff5c7c",
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#ff5c7c",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 12,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "800",
    color: "#fff",
  },
});
