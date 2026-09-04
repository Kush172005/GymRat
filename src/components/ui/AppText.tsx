import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { useTheme } from '../../theme';
import { fontFamily, fontSize } from '../../theme/typography';

export type TextVariant =
  | 'heroTitle'
  | 'title1'
  | 'title2'
  | 'title3'
  | 'sectionHeader'
  | 'body'
  | 'bodyMedium'
  | 'bodySemiBold'
  | 'bodyBold'
  | 'caption'
  | 'captionMedium'
  | 'metric'
  | 'metricSmall'
  | 'label';

export type TextColor =
  | 'primary'
  | 'sub'
  | 'muted'
  | 'accent'
  | 'success'
  | 'error'
  | 'warning'
  | 'white';

interface AppTextProps extends TextProps {
  variant?: TextVariant;
  color?: TextColor;
}

export function AppText({
  variant = 'body',
  color = 'primary',
  style,
  ...props
}: AppTextProps) {
  const { colors } = useTheme();

  const colorMap: Record<TextColor, string> = {
    primary: colors.text,
    sub: colors.textSub,
    muted: colors.textMuted,
    accent: colors.primary,
    success: colors.success,
    error: colors.error,
    warning: colors.warning,
    white: '#FFFFFF',
  };

  return (
    <Text
      style={[styles[variant], { color: colorMap[color] }, style]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  heroTitle: {
    fontFamily: fontFamily.display.bold,
    fontSize: fontSize['4xl'],
    letterSpacing: -0.5,
  },
  title1: {
    fontFamily: fontFamily.display.bold,
    fontSize: fontSize['3xl'],
  },
  title2: {
    fontFamily: fontFamily.display.semiBold,
    fontSize: fontSize['2xl'],
  },
  title3: {
    fontFamily: fontFamily.display.medium,
    fontSize: fontSize.xl,
  },
  sectionHeader: {
    fontFamily: fontFamily.body.bold,
    fontSize: fontSize.lg,
    letterSpacing: 0.4,
  },
  body: {
    fontFamily: fontFamily.body.regular,
    fontSize: fontSize.md,
    lineHeight: fontSize.md * 1.55,
  },
  bodyMedium: {
    fontFamily: fontFamily.body.medium,
    fontSize: fontSize.md,
  },
  bodySemiBold: {
    fontFamily: fontFamily.body.semiBold,
    fontSize: fontSize.md,
  },
  bodyBold: {
    fontFamily: fontFamily.body.bold,
    fontSize: fontSize.md,
  },
  caption: {
    fontFamily: fontFamily.body.regular,
    fontSize: fontSize.sm,
    lineHeight: fontSize.sm * 1.5,
  },
  captionMedium: {
    fontFamily: fontFamily.body.medium,
    fontSize: fontSize.sm,
  },
  metric: {
    fontFamily: fontFamily.display.bold,
    fontSize: fontSize['4xl'],
    letterSpacing: -1,
  },
  metricSmall: {
    fontFamily: fontFamily.display.semiBold,
    fontSize: fontSize['2xl'],
    letterSpacing: -0.5,
  },
  label: {
    fontFamily: fontFamily.body.medium,
    fontSize: fontSize.xs,
    letterSpacing: 0.9,
    textTransform: 'uppercase',
  },
});
