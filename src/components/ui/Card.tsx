import React from 'react';
import { View, StyleSheet, ViewStyle, TouchableOpacity } from 'react-native';
import { useTheme } from '../../theme';
import { radius, shadow, spacing } from '../../theme/spacing';

type CardVariant = 'default' | 'highlight' | 'subtle';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
  activeOpacity?: number;
  variant?: CardVariant;
  noPad?: boolean;
  accessibilityLabel?: string;
}

export function Card({
  children,
  style,
  onPress,
  activeOpacity = 0.8,
  variant = 'default',
  noPad = false,
  accessibilityLabel,
}: CardProps) {
  const { colors } = useTheme();

  const bg =
    variant === 'highlight'
      ? colors.surface2
      : variant === 'subtle'
      ? colors.surfaceHighlight
      : colors.surface;

  const containerStyle: ViewStyle[] = [
    styles.card,
    { backgroundColor: bg, borderColor: colors.border },
    shadow.md,
    ...(noPad ? [styles.noPad] : []),
    ...(style ? [style] : []),
  ];

  if (onPress) {
    return (
      <TouchableOpacity
        style={containerStyle}
        onPress={onPress}
        activeOpacity={activeOpacity}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={containerStyle}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.lg,
    borderWidth: StyleSheet.hairlineWidth,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  noPad: {
    padding: 0,
  },
});
