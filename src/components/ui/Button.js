import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
} from 'react-native';
import { useTheme } from '../../theme';
import { fontFamily, fontSize } from '../../theme/typography';
import { radius, spacing } from '../../theme/spacing';

export function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  style,
  textStyle,
  leftIcon,
  rightIcon,
  fullWidth = false,
  accessibilityLabel,
}) {
  const { colors } = useTheme();

  const schemeMap = {
    primary:   { bg: colors.primary,   text: '#FFFFFF',      border: colors.primary },
    secondary: { bg: 'transparent',    text: colors.primary, border: colors.primary },
    ghost:     { bg: 'transparent',    text: colors.textSub, border: 'transparent' },
    danger:    { bg: colors.error,     text: '#FFFFFF',      border: colors.error },
  };

  const sizeMap = {
    sm: { pV: spacing.sm,  pH: spacing.md,   fSize: fontSize.sm },
    md: { pV: spacing.md,  pH: spacing.xl,   fSize: fontSize.md },
    lg: { pV: spacing.lg,  pH: spacing['2xl'], fSize: fontSize.lg },
  };

  const cs = schemeMap[variant];
  const ss = sizeMap[size];

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? title}
      style={[
        styles.base,
        {
          backgroundColor: cs.bg,
          borderColor: cs.border,
          paddingVertical: ss.pV,
          paddingHorizontal: ss.pH,
          opacity: disabled ? 0.45 : 1,
          alignSelf: fullWidth ? 'stretch' : 'flex-start',
        },
        variant === 'secondary' && styles.border,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator size="small" color={cs.text} />
      ) : (
        <View style={styles.inner}>
          {leftIcon && <View style={styles.iconLeft}>{leftIcon}</View>}
          <Text style={[styles.text, { color: cs.text, fontSize: ss.fSize }, textStyle]}>
            {title}
          </Text>
          {rightIcon && <View style={styles.iconRight}>{rightIcon}</View>}
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  border: { borderWidth: 1.5 },
  inner: { flexDirection: 'row', alignItems: 'center' },
  iconLeft:  { marginRight: spacing.sm },
  iconRight: { marginLeft: spacing.sm },
  text: {
    fontFamily: fontFamily.body.bold,
    letterSpacing: 0.2,
  },
});
