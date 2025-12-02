import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Animated,
  Modal,
  Alert,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useVideoPlayer, VideoView } from "expo-video";
import YoutubePlayer from "react-native-youtube-iframe";

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

const FALLBACK_STOCK_VIDEO =
  "https://cdn.pixabay.com/video/2023/11/02/187612-880737125_large.mp4";

const renderBoldedText = (text) => {
  if (!text) return null;
  const steps = text.split("\n");
  return steps
    .map((step, index) => {
      const trimmed = step.trim();
      if (!trimmed) return null;

      const colonIndex = trimmed.indexOf(":");
      if (colonIndex > 0) {
        return (
          <Text key={index} style={styles.text}>
            <Text style={styles.boldText}>
              {trimmed.substring(0, colonIndex + 1)}
            </Text>
            {trimmed.substring(colonIndex + 1)}
          </Text>
        );
      }

      return (
        <Text key={index} style={styles.text}>
          {trimmed}
        </Text>
      );
    })
    .filter(Boolean);
};

const getYoutubeId = (url) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

export default function ExerciseDetailScreen() {
  const route = useRoute();
  const nav = useNavigation();
  const { item } = route.params || {};

  const [fav, setFav] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const pulseAnim = useRef(new Animated.Value(1)).current;

  const localAsset = item?.id ? VIDEO_ASSETS[item.id] : null;
  const youtubeId =
    !localAsset && item?.videoUrl ? getYoutubeId(item.videoUrl) : null;

  const isLocalVideo = !!localAsset;

  const localPlayerSource = isLocalVideo ? localAsset : FALLBACK_STOCK_VIDEO;

  const player = useVideoPlayer(localPlayerSource, (player) => {
    player.loop = true;
  });

  useEffect(() => {
    if (isLocalVideo) {
      if (modalVisible) {
        player.play();
      } else {
        player.pause();
      }
    }
  }, [modalVisible, isLocalVideo]);

  useEffect(() => {
    (async () => {
      if (item?.id) {
        const saved = await AsyncStorage.getItem("@fav_" + item.id);
        setFav(!!saved);
      }
    })();
  }, [item?.id]);

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
        speed: 14,
        bounciness: 10,
        useNativeDriver: true,
      }).start();
    });
  };

  const toggleFav = async () => {
    if (!item?.id) return;
    try {
      if (fav) {
        await AsyncStorage.removeItem("@fav_" + item.id);
        setFav(false);
      } else {
        await AsyncStorage.setItem("@fav_" + item.id, JSON.stringify(item));
        setFav(true);
        runPulseAnimation();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const safeItem = {
    ...item,
    name: item?.name || "Unknown Exercise",
    bodyPart: item?.bodyPart || "Unknown",
    equipment: item?.equipment || "N/A",
    image:
      item?.image ||
      "https://images.unsplash.com/photo-1517964603305-11c2f62f430c?auto=format&fit=crop&w=800&q=80",
    description:
      item?.description || "No instructions available. Ask your trainer.",
    beginnerTips: item?.beginnerTips || "• Engage your core.\n• Move slow.",
  };

  return (
    <View style={styles.container}>
      <Header
        title="Exercise Details"
        onPressMenu={() => nav.goBack()}
        onPressFav={() => nav.navigate("Favorites")}
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => setModalVisible(true)}
          style={styles.imageContainer}
        >
          <Image source={safeItem.image} style={styles.image} />

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
              <Text style={styles.watchText}>
                {isLocalVideo ? "Watch Video" : "Watch on YouTube"}
              </Text>
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
          onPress={() =>
            Alert.alert("Workout Logged", `Logged: ${safeItem.name} workout!`)
          }
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
            {isLocalVideo ? (
              <VideoView
                style={styles.video}
                player={player}
                contentFit="contain"
                nativeControls
                allowsPictureInPicture
              />
            ) : youtubeId ? (
              <YoutubePlayer
                height={300}
                play={true}
                videoId={youtubeId}
                onChangeState={(event) => {
                  if (event === "ended") setModalVisible(false);
                }}
              />
            ) : (
              // Fallback if no local video AND no valid Youtube ID
              <VideoView
                style={styles.video}
                player={player}
                contentFit="contain"
                nativeControls
              />
            )}
          </View>

          <Text style={styles.modalSubText}>{safeItem.name}</Text>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7fbff",
  },
  scrollContent: {
    padding: 18,
  },
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
    backgroundColor: "rgba(255, 255, 255, 0.25)",
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
    textShadowColor: "rgba(0,0,0,0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
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
});
