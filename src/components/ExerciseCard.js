import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme';
import { fontFamily, fontSize } from '../theme/typography';
import { radius, shadow, spacing } from '../theme/spacing';

export function ExerciseCard({ item, onPress, style }) {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }, shadow.md, style]}
      onPress={() => onPress(item)}
      activeOpacity={0.85}
      accessibilityRole="button"
      accessibilityLabel={`${item.name}, ${item.bodyPart}`}
    >
      {item.image ? (
        <Image source={item.image} style={styles.image} resizeMode="cover" />
      ) : (
        <View style={[styles.imagePlaceholder, { backgroundColor: colors.surface2 }]}>
          <Ionicons name="barbell-outline" size={32} color={colors.textMuted} />
        </View>
      )}
      <View style={styles.info}>
        <Text numberOfLines={1} style={[styles.name, { color: colors.text }]}>
          {item.name}
        </Text>
        <Text numberOfLines={1} style={[styles.meta, { color: colors.textSub }]}>
          {item.bodyPart}
        </Text>
        {item.isCustom && (
          <View style={[styles.customBadge, { backgroundColor: colors.primarySubtle }]}>
            <Text style={[styles.customLabel, { color: colors.primary }]}>Custom</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '48%',
    borderRadius: radius.lg,
    borderWidth: StyleSheet.hairlineWidth,
    overflow: 'hidden',
    marginBottom: spacing.lg,
  },
  image: {
    width: '100%',
    height: 118,
  },
  imagePlaceholder: {
    width: '100%',
    height: 118,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    padding: spacing.md,
  },
  name: {
    fontFamily: fontFamily.body.bold,
    fontSize: fontSize.md,
    marginBottom: 3,
  },
  meta: {
    fontFamily: fontFamily.body.regular,
    fontSize: fontSize.sm,
  },
  customBadge: {
    marginTop: spacing.xs,
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: radius.xs,
  },
  customLabel: {
    fontFamily: fontFamily.body.bold,
    fontSize: fontSize.xs,
  },
});
