import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

export default function ExerciseCard({ item, onPress }) {
  return (
    <TouchableOpacity
      style={cardStyles.container}
      onPress={() => onPress(item)}
    >
      <Image
        source={{ uri: item.image }}
        style={cardStyles.image}
        resizeMode="cover"
      />
      <View style={cardStyles.info}>
        <Text numberOfLines={1} style={cardStyles.name}>
          {item.name}
        </Text>
        <Text style={cardStyles.meta}>
          {item.bodyPart} • {item.equipment}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const cardStyles = StyleSheet.create({
  container: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 16,
    shadowColor: "#0f172a",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  image: { width: "100%", height: 120 },
  info: { padding: 12 },
  name: { fontSize: 16, fontWeight: "800", color: "#0f172a" },
  meta: { fontSize: 12, color: "#666", marginTop: 4 },
});
