import React, { useEffect, useState } from "react";
import { View, TextInput, FlatList, StyleSheet, Text } from "react-native";
import Header from "../components/Header";
import ExerciseCard from "../components/ExerciseCard";
import { useNavigation } from "@react-navigation/native";
import { EXERCISE_DATA } from "../data/Excercises";
import BenchPressLoader from "../components/BenchPressLoader";

export default function ExerciseListScreen() {
  const nav = useNavigation();
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  async function fetchExercises() {
    await new Promise((resolve) => setTimeout(resolve, 2500));

    setData(EXERCISE_DATA);
    setLoading(false);
  }

  useEffect(() => {
    fetchExercises();
  }, []);

  function handleOpen(item) {
    nav.navigate("Detail", { item });
  }

  const filtered = data.filter((d) =>
    d.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <View style={styles.page}>
      <Header
        title="Explore Exercises"
        onPressMenu={() => nav.goBack()}
        onPressFav={() => nav.navigate("Favorites")}
      />

      <View style={styles.searchWrap}>
        <TextInput
          placeholder="Search exercises (e.g., bench press)..."
          placeholderTextColor="#999"
          value={query}
          onChangeText={setQuery}
          style={styles.search}
        />
      </View>

      {loading ? (
        // 🏋️‍♂️ Replaced ActivityIndicator with the custom BenchPressLoader
        <BenchPressLoader />
      ) : filtered.length === 0 ? (
        <View style={styles.emptyWrap}>
          <Text style={styles.emptyText}>
            No exercises found matching "{query}"
          </Text>
        </View>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(i) => i.id}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          renderItem={({ item }) => (
            <ExerciseCard item={item} onPress={handleOpen} />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: "#f7fbff" },
  searchWrap: { paddingHorizontal: 16, paddingTop: 12, paddingBottom: 8 },
  search: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 16,
    fontSize: 16,
    fontWeight: "500",
    color: "#0f172a",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 3,
  },
  listContent: {
    padding: 16,
    paddingBottom: 100,
  },
  emptyWrap: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    fontWeight: "500",
    textAlign: "center",
  },
});
