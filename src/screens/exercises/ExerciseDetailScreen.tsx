import React, { useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Animated,
  Linking,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useVideoPlayer, VideoView } from 'expo-video';
import * as Haptics from 'expo-haptics';

import { useTheme } from '../../theme';
import { fontFamily, fontSize } from '../../theme/typography';
import { spacing, radius, shadow } from '../../theme/spacing';
import { Screen, AppHeader, Button, AppText, Card } from '../../components/ui';
import { favoritesRepo } from '../../db/favoritesRepo';
import { ExercisesStackScreenProps } from '../../navigation/types';

// Local video assets (IDs 1-6 and 13 have local MP4s)
const VIDEO_ASSETS: Record<string, ReturnType<typeof require>> = {
  '1':  require('../../../assets/videos/barbell_bench_press.mp4'),
  '2':  require('../../../assets/videos/barbell_squat.mp4'),
  '3':  require('../../../assets/videos/barbell_deadlift.mp4'),
  '4':  require('../../../assets/videos/barbell_overhead_press.mp4'),
  '5':  require('../../../assets/videos/pullups.mp4'),
  '6':  require('../../../assets/videos/dumbell_curl.mp4'),
  '13': require('../../../assets/videos/push_up.mp4'),
};

function getYouTubeId(url: string): string | null {
  const m = url.match(/(?:youtu\.be\/|v=|embed\/)([^#&?]{11})/);
  return m?.[1] ?? null;
}

type Props = ExercisesStackScreenProps<'ExerciseDetail'>;

export function ExerciseDetailScreen({ route, navigation }: Props) {
  const { item } = route.params;
  const { colors } = useTheme();

  const [isFav, setIsFav] = useState(() => favoritesRepo.isFavorite(item.id));
  const [videoOpen, setVideoOpen] = useState(false);
  const pulseAnim = useRef(new Animated.Value(1)).current;

  const localAsset = VIDEO_ASSETS[item.id];
  const player = useVideoPlayer(localAsset ?? null, (p) => { p.loop = true; });

  const handleVideo = () => {
    if (localAsset) {
      setVideoOpen(true);
    } else if (item.videoUrl) {
      const ytId = getYouTubeId(item.videoUrl);
      if (ytId) {
        Linking.openURL(`https://www.youtube.com/watch?v=${ytId}`).catch(() => {});
      } else {
        Linking.openURL(item.videoUrl).catch(() => {});
      }
    }
  };

  const toggleFav = () => {
    const next = favoritesRepo.toggle(item);
    setIsFav(next);
    if (next) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      pulseAnim.setValue(0.7);
      Animated.spring(pulseAnim, {
        toValue: 1.2,
        speed: 12,
        bounciness: 18,
        useNativeDriver: true,
      }).start(() => {
        Animated.spring(pulseAnim, {
          toValue: 1,
          speed: 16,
          bounciness: 10,
          useNativeDriver: true,
        }).start();
      });
    }
  };

  React.useEffect(() => {
    if (localAsset) {
      if (videoOpen) player.play();
      else player.pause();
    }
  }, [videoOpen, localAsset]);

  const renderInstructions = (text: string) =>
    text.split('\n').filter(Boolean).map((line, i) => {
      const colon = line.indexOf(':');
      if (colon > 0) {
        return (
          <Text key={i} style={[styles.instrLine, { color: colors.text }]}>
            <Text style={[styles.instrBold, { color: colors.text }]}>
              {line.substring(0, colon + 1)}
            </Text>
            {line.substring(colon + 1)}
          </Text>
        );
      }
      return (
        <Text key={i} style={[styles.instrLine, { color: colors.text }]}>
          {line}
        </Text>
      );
    });

  return (
    <Screen>
      <AppHeader
        title=""
        onBack={() => navigation.goBack()}
        rightAction={{
          icon: isFav ? 'heart' : 'heart-outline',
          label: isFav ? 'Remove from favorites' : 'Add to favorites',
          onPress: toggleFav,
          color: isFav ? colors.error : colors.textSub,
        }}
      />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Hero image + play button */}
        <TouchableOpacity
          style={styles.imageWrap}
          onPress={(item.videoUrl || localAsset) ? handleVideo : undefined}
          activeOpacity={0.9}
          accessibilityRole="button"
          accessibilityLabel={`Watch ${item.name} demonstration`}
        >
          <Image source={item.image} style={styles.image} resizeMode="cover" />
          {(localAsset || item.videoUrl) && (
            <View style={styles.playOverlay}>
              <View style={styles.playBtn}>
                <Ionicons name="play" size={30} color="#fff" style={{ marginLeft: 3 }} />
              </View>
              <Text style={styles.watchText}>
                {localAsset ? 'Watch Video' : 'Watch on YouTube ↗'}
              </Text>
            </View>
          )}
        </TouchableOpacity>

        {/* Name + meta */}
        <View style={styles.nameRow}>
          <View style={styles.nameFlex}>
            <Text style={[styles.name, { color: colors.text }]}>{item.name}</Text>
            <Text style={[styles.meta, { color: colors.textSub }]}>
              {item.bodyPart}  ·  {item.equipment}
            </Text>
          </View>
          <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
            <TouchableOpacity
              onPress={toggleFav}
              style={[styles.favBtn, { backgroundColor: colors.surface, borderColor: colors.border }]}
              accessibilityRole="button"
              accessibilityLabel={isFav ? 'Remove from favorites' : 'Save exercise'}
            >
              <Ionicons
                name={isFav ? 'heart' : 'heart-outline'}
                size={24}
                color={isFav ? colors.error : colors.textSub}
              />
            </TouchableOpacity>
          </Animated.View>
        </View>

        {/* Instructions */}
        {item.description.trim() ? (
          <Card style={styles.section}>
            <AppText variant="sectionHeader" style={{ marginBottom: spacing.md }}>
              How to Do It
            </AppText>
            {renderInstructions(item.description)}
          </Card>
        ) : null}

        {/* Beginner tips */}
        {item.beginnerTips ? (
          <Card style={styles.section} variant="subtle">
            <View style={styles.tipsHeader}>
              <Ionicons name="bulb-outline" size={20} color={colors.warning} />
              <AppText variant="sectionHeader" style={{ marginLeft: spacing.sm }}>
                Beginner Tips
              </AppText>
            </View>
            <AppText variant="body" color="sub" style={{ marginTop: spacing.md, lineHeight: 24 }}>
              {item.beginnerTips}
            </AppText>
          </Card>
        ) : null}

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Local video modal */}
      {localAsset && (
        <Modal
          visible={videoOpen}
          animationType="fade"
          transparent
          onRequestClose={() => setVideoOpen(false)}
          statusBarTranslucent
        >
          <View style={styles.modalBg}>
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => setVideoOpen(false)}
              accessibilityRole="button"
              accessibilityLabel="Close video"
              hitSlop={{ top: 16, bottom: 16, left: 16, right: 16 }}
            >
              <Ionicons name="close" size={28} color="#fff" />
            </TouchableOpacity>
            <VideoView
              style={styles.video}
              player={player}
              contentFit="contain"
              nativeControls
              allowsPictureInPicture
            />
            <Text style={styles.modalTitle}>{item.name}</Text>
          </View>
        </Modal>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  scroll: { paddingBottom: 40 },
  imageWrap: {
    height: 280,
    backgroundColor: '#000',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  playOverlay: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  playBtn: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: 'rgba(255,255,255,0.22)',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  watchText: {
    fontFamily: fontFamily.body.bold,
    fontSize: fontSize.md,
    color: '#fff',
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: spacing.lg,
    paddingBottom: spacing.sm,
  },
  nameFlex: { flex: 1 },
  name: {
    fontFamily: fontFamily.display.bold,
    fontSize: fontSize['2xl'],
    letterSpacing: -0.3,
    marginBottom: 4,
  },
  meta: {
    fontFamily: fontFamily.body.medium,
    fontSize: fontSize.md,
  },
  favBtn: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: spacing.md,
    ...shadow.sm,
  },
  section: { marginHorizontal: spacing.lg, marginTop: spacing.md },
  tipsHeader: { flexDirection: 'row', alignItems: 'center' },
  instrLine: {
    fontFamily: fontFamily.body.regular,
    fontSize: fontSize.md,
    lineHeight: 26,
    marginBottom: spacing.sm,
  },
  instrBold: {
    fontFamily: fontFamily.body.bold,
  },
  // Modal
  modalBg: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.96)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeBtn: {
    position: 'absolute',
    top: 52,
    right: 20,
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 20,
    padding: 8,
    zIndex: 10,
  },
  video: {
    width: '100%',
    height: 300,
  },
  modalTitle: {
    fontFamily: fontFamily.body.semiBold,
    fontSize: fontSize.md,
    color: 'rgba(255,255,255,0.5)',
    marginTop: spacing.xl,
  },
});
