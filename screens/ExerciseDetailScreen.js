import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Animated,
  Modal,
  Dimensions,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useVideoPlayer, VideoView } from "expo-video";

import Header from "../components/Header";

const VIDEO_ASSETS = {
  1: require("../assets/videos/barbell_bench_press.mp4"),
  2: require("../assets/videos/barbell_squat.mp4"),
  3: require("../assets/videos/barbell_deadlift.mp4"),
  4: require("../assets/videos/barbell_overhead_press.mp4"),
  5: require("../assets/videos/pullups.mp4"),
  6: require("../assets/videos/dumbell_curl.mp4"),
  13: require("../assets/videos/push_up.mp4"),
};

const PLACEHOLDER_SOURCE =
  "https://cdn.pixabay.com/video/2023/11/02/187612-880737125_large.mp4";

const renderBoldedText = (text) => {
  const steps = text.split("\n");
  return steps
    .map((step, index) => {
      const trimmedStep = step.trim();
      if (!trimmedStep) return null;
      const colonIndex = trimmedStep.indexOf(":");
      if (colonIndex > 0) {
        const title = trimmedStep.substring(0, colonIndex + 1);
        const instruction = trimmedStep.substring(colonIndex + 1);
        return (
          <Text key={index} style={styles.text}>
            <Text style={styles.boldText}>{title}</Text>
            {instruction}
          </Text>
        );
      } else {
        return (
          <Text key={index} style={styles.text}>
            {trimmedStep}
          </Text>
        );
      }
    })
    .filter(Boolean)
    .reduce(
      (prev, curr, i) => [
        prev,
        i > 0 && (
          <Text key={`sep-${i}`} style={styles.spacerText}>
            {" "}
          </Text>
        ),
        curr,
      ],
      null
    );
};

export default function ExerciseDetailScreen() {
  const route = useRoute();
  const nav = useNavigation();
  const { item } = route.params || {};

  const [fav, setFav] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const pulseAnim = useRef(new Animated.Value(1)).current;

  const assetSource = VIDEO_ASSETS[item.id]
    ? VIDEO_ASSETS[item.id]
    : PLACEHOLDER_SOURCE;

  const player = useVideoPlayer(assetSource, (player) => {
    player.loop = true;
  });

  useEffect(() => {
    if (modalVisible) {
      player.play();
    } else {
      player.pause();
    }
  }, [modalVisible, player]);

  useEffect(() => {
    (async () => {
      try {
        const v = await AsyncStorage.getItem("@fav_" + item.id);
        setFav(!!v);
      } catch (e) {}
    })();
  }, []);

  const runPulseAnimation = () => {
    pulseAnim.setValue(0.7);
    Animated.spring(pulseAnim, {
      toValue: 1.2,
      speed: 10,
      bounciness: 20,
      useNativeDriver: true,
    }).start(() => {
      Animated.spring(pulseAnim, {
        toValue: 1,
        speed: 15,
        bounciness: 8,
        useNativeDriver: true,
      }).start();
    });
  };

  async function toggleFav() {
    try {
      if (fav) {
        await AsyncStorage.removeItem("@fav_" + item.id);
        setFav(false);
      } else {
        await AsyncStorage.setItem("@fav_" + item.id, JSON.stringify(item));
        setFav(true);
        runPulseAnimation();
      }
    } catch (e) {}
  }

  const safeItem = {
    ...item,
    name: item?.name || "Unknown Exercise",
    bodyPart: item?.bodyPart || "Unknown",
    equipment: item?.equipment || "N/A",
    image:
      item?.image ||
      "https://images.unsplash.com/photo-1517964603305-11c2f62f430c?auto=format&fit=crop&w=800&q=80",
    description:
      item?.description ||
      "No simple instructions available. Consult a trainer.",
    beginnerTips:
      item?.beginnerTips || "• Prioritize form over weight.\n• Always warm up.",
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#f7fbff" }}>
      <Header
        title="Exercise Details"
        onPressMenu={() => nav.goBack()}
        onPressFav={() => nav.navigate("Favorites")}
      />

      <ScrollView contentContainerStyle={{ padding: 18 }}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => setModalVisible(true)}
          style={styles.imageContainer}
        >
          <Image source={{ uri: safeItem.image }} style={styles.image} />

          <View style={styles.playOverlay}>
            <View style={styles.glassEffect}>
              <View style={styles.playButton}>
                <Ionicons
                  name="play"
                  size={32}
                  color="#fff"
                  style={{ marginLeft: 4 }}
                />
              </View>
              <Text style={styles.watchText}>Watch Tutorial</Text>
            </View>
          </View>
        </TouchableOpacity>

        <View style={styles.rowTop}>
          <View style={{ flex: 1 }}>
            <Text style={styles.name}>{safeItem.name}</Text>
            <Text style={styles.meta}>
              {safeItem.bodyPart} • {safeItem.equipment}
            </Text>
          </View>

          <TouchableOpacity onPress={toggleFav} style={styles.favBtn}>
            <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
              <Ionicons
                name={fav ? "heart" : "heart-outline"}
                size={30}
                color={fav ? "#ff4d6d" : "#999"}
              />
            </Animated.View>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.header}>How to Do</Text>
          <View style={{ marginTop: 10 }}>
            {renderBoldedText(safeItem.description)}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.header}>Beginner Tips</Text>
          <View style={{ height: 10 }} />
          <Text style={styles.text}>{safeItem.beginnerTips}</Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => alert(`Logged: ${safeItem.name} workout! ✅`)}
        >
          <Text style={styles.buttonText}>Mark as Done</Text>
        </TouchableOpacity>
        <View style={{ height: 40 }} />
      </ScrollView>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        statusBarTranslucent={true}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
            hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
          >
            <Ionicons name="close" size={28} color="#fff" />
          </TouchableOpacity>

          <View style={styles.videoWrapper}>
            <VideoView
              style={styles.video}
              player={player}
              allowsPictureInPicture
              nativeControls={true}
              contentFit="contain"
            />
          </View>

          <Text style={styles.modalSubText}>{safeItem.name}</Text>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    marginBottom: 18,
    borderRadius: 24,
    overflow: "hidden",
    position: "relative",
    height: 280,
    backgroundColor: "#000",
    shadowColor: "#ff5c7c",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    opacity: 0.9,
  },
  playOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  glassEffect: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
    width: "100%",
    height: "100%",
  },
  playButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.5)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  watchText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
    letterSpacing: 0.5,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },

  // MODAL STYLES
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.95)",
    justifyContent: "center",
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: 50,
    right: 25,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 20,
    padding: 8,
    zIndex: 10,
  },
  videoWrapper: {
    width: "100%",
    height: 300,
    justifyContent: "center",
    backgroundColor: "#000",
  },
  video: {
    width: "100%",
    height: "100%",
  },
  modalSubText: {
    color: "#888",
    marginTop: 20,
    fontSize: 16,
    fontWeight: "600",
  },

  // TEXT CONTENT STYLES
  rowTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontSize: 28,
    fontWeight: "900",
    color: "#0f172a",
    letterSpacing: -0.5,
  },
  meta: {
    color: "#64748b",
    marginTop: 4,
    fontSize: 16,
    fontWeight: "600",
  },
  favBtn: {
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  section: {
    marginTop: 24,
    paddingBottom: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: "800",
    color: "#0f172a",
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    color: "#334155",
    lineHeight: 26,
  },
  boldText: {
    fontWeight: "800",
    color: "#0f172a",
  },
  spacerText: {
    fontSize: 5,
  },
  button: {
    marginTop: 30,
    backgroundColor: "#ff5c7c",
    paddingVertical: 18,
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#ff5c7c",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "800",
    color: "#fff",
  },
});
