import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Header from "../components/Header";
import ExerciseCard from "../components/ExerciseCard";
import { useNavigation } from "@react-navigation/native";
import { EXERCISE_DATA } from "../data/Excercises";
import BenchPressLoader from "../components/BenchPressLoader";

const MUSCLE_GROUPS = [
  "All",
  "Chest",
  "Back",
  "Shoulders",
  "Biceps",
  "Triceps",
  "Legs",
  "Core",
];

export default function ExerciseListScreen() {
  const nav = useNavigation();
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedMuscle, setSelectedMuscle] = useState("All");

  useEffect(() => {
    setData(EXERCISE_DATA);
    setLoading(false);
  }, []);

  function handleOpen(item) {
    nav.navigate("Detail", { item });
  }

  const filtered = data.filter((d) => {
    const matchesSearch = d.name.toLowerCase().includes(query.toLowerCase());
    if (selectedMuscle === "All") return matchesSearch;

    const bodyPartLower = d.bodyPart.toLowerCase();
    const selectedLower = selectedMuscle.toLowerCase();

    if (selectedLower === "biceps" || selectedLower === "triceps") {
      return matchesSearch && bodyPartLower === selectedLower;
    }

    return matchesSearch && bodyPartLower === selectedLower;
  });

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

      <View style={styles.filterContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScrollContent}
        >
          {MUSCLE_GROUPS.map((muscle) => (
            <TouchableOpacity
              key={muscle}
              style={[
                styles.filterChipNew,
                selectedMuscle === muscle && styles.filterChipNewActive,
              ]}
              onPress={() => setSelectedMuscle(muscle)}
            >
              <Text
                style={[
                  styles.filterChipLabel,
                  selectedMuscle === muscle && styles.filterChipLabelActive,
                ]}
              >
                {muscle}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {loading ? (
        <BenchPressLoader />
      ) : filtered.length === 0 ? (
        <View style={styles.emptyWrap}>
          <Text style={styles.emptyText}>
            No exercises found for "{query || selectedMuscle}"
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
  page: {
    flex: 1,
    backgroundColor: "#f7fbff",
  },

  searchWrap: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },

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

  filterContainer: {
    width: "100%",
    paddingTop: 4,
    paddingBottom: 12,
    backgroundColor: "#f7fbff",
  },

  filterScrollContent: {
    paddingLeft: 16,
    paddingRight: 8,
    alignItems: "center",
  },

  filterChipNew: {
    paddingHorizontal: 18,
    paddingVertical: 9,
    backgroundColor: "#ffffff",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#e5e8ed",

    marginRight: 10,

    // Prevent collapse/shrink
    flexShrink: 0,
    height: 36,

    justifyContent: "center",
  },

  filterChipNewActive: {
    backgroundColor: "#ff577b",
    borderColor: "#ff577b",
  },

  filterChipLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#64748b",
  },

  filterChipLabelActive: {
    color: "#ffffff",
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
