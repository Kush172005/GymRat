import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Header({
  title,
  onPressMenu,
  onPressFav,
  showFav = true,
  transparent = false,
}) {
  const iconColor = transparent ? "#fff" : "#0f172a";

  return (
    <View
      style={[
        styles.container,
        transparent && {
          backgroundColor: "transparent",
          borderBottomWidth: 0,
          paddingTop: 10,
          height: 60,
        },
      ]}
    >
      <TouchableOpacity onPress={onPressMenu} style={styles.iconWrap}>
        <Ionicons name="chevron-back" size={28} color={iconColor} />
      </TouchableOpacity>

      <Text style={[styles.title, { color: iconColor }]}>{title}</Text>

      {showFav ? (
        <TouchableOpacity onPress={onPressFav} style={styles.iconWrap}>
          <Ionicons
            name="heart"
            size={24}
            color={transparent ? "#fff" : "#ff5c7c"}
          />
        </TouchableOpacity>
      ) : (
        <View style={styles.iconWrap} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    height: 100,
  },
  title: { fontSize: 20, fontWeight: "800", color: "#0f172a" },
  iconWrap: { padding: 8 },
});
