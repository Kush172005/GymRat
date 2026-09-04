import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme';
import { fontFamily, fontSize } from '../../theme/typography';
import { spacing } from '../../theme/spacing';

interface RightAction {
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  label: string;
  color?: string;
}

interface AppHeaderProps {
  title?: string;
  onBack?: () => void;
  rightAction?: RightAction;
  transparent?: boolean;
  style?: ViewStyle;
}

export function AppHeader({
  title,
  onBack,
  rightAction,
  transparent = false,
  style,
}: AppHeaderProps) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  const iconColor = transparent ? '#FFFFFF' : colors.text;

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top + spacing.sm,
          backgroundColor: transparent ? 'transparent' : colors.surface,
          borderBottomColor: transparent ? 'transparent' : colors.border,
          borderBottomWidth: transparent ? 0 : StyleSheet.hairlineWidth,
        },
        style,
      ]}
    >
      {/* Left */}
      {onBack ? (
        <TouchableOpacity
          onPress={onBack}
          style={styles.btn}
          accessibilityRole="button"
          accessibilityLabel="Go back"
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="chevron-back" size={26} color={iconColor} />
        </TouchableOpacity>
      ) : (
        <View style={styles.btn} />
      )}

      {/* Title */}
      <Text style={[styles.title, { color: iconColor }]} numberOfLines={1}>
        {title ?? ''}
      </Text>

      {/* Right */}
      {rightAction ? (
        <TouchableOpacity
          onPress={rightAction.onPress}
          style={styles.btn}
          accessibilityRole="button"
          accessibilityLabel={rightAction.label}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons
            name={rightAction.icon}
            size={24}
            color={rightAction.color ?? iconColor}
          />
        </TouchableOpacity>
      ) : (
        <View style={styles.btn} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
  },
  btn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontFamily: fontFamily.body.bold,
    fontSize: fontSize.lg,
  },
});
