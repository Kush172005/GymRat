import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ExerciseCard from "../components/ExerciseCard";
import Header from "../components/Header";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

export default function FavoritesScreen() {
  const nav = useNavigation();
  const [list, setList] = useState([]);

  useEffect(() => {
    const unsubscribe = nav.addListener("focus", () => {
      loadFavs();
    });
    loadFavs();
    return unsubscribe;
  }, [nav]);

  async function loadFavs() {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const favKeys = keys.filter((k) => k.startsWith("@fav_"));
      const kv = await AsyncStorage.multiGet(favKeys);
      const items = kv.map(([, v]) => JSON.parse(v)).filter(Boolean);
      setList(items);
    } catch (e) {
      console.error("Failed to load favorites:", e);
      setList([]);
    }
  }

  function open(it) {
    nav.navigate("Detail", { item: it });
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#f7fbff" }}>
      <Header
        title="Saved Exercises"
        onPressMenu={() => nav.goBack()}
        onPressFav={() => {}}
        showFav={false}
      />

      {list.length === 0 ? (
        <View style={favStyles.emptyWrap}>
          <Ionicons name="heart-dislike-outline" size={60} color="#ccc" />
          <Text style={favStyles.emptyTitle}>No saved exercises yet</Text>
          <Text style={favStyles.emptySub}>
            Tap the heart icon on an exercise detail screen to save it here.
          </Text>
        </View>
      ) : (
        <FlatList
          data={list}
          numColumns={2}
          keyExtractor={(i) => i.id}
          renderItem={({ item }) => <ExerciseCard item={item} onPress={open} />}
          contentContainerStyle={{ padding: 16 }}
          columnWrapperStyle={{ justifyContent: "space-between" }}
        />
      )}
    </View>
  );
}

const favStyles = StyleSheet.create({
  emptyWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#0f172a",
    marginTop: 15,
  },
  emptySub: {
    marginTop: 10,
    color: "#666",
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
  },
});
