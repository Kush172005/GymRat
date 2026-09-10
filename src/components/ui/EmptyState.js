import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme';
import { AppText } from './AppText';
import { Button } from './Button';
import { spacing, radius } from '../../theme/spacing';

export function EmptyState({
  icon,
  title,
  subtitle,
  actionLabel,
  onAction,
}) {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <View style={[styles.iconWrap, { backgroundColor: colors.primarySubtle }]}>
        <Ionicons name={icon} size={44} color={colors.primary} />
      </View>
      <AppText variant="title3" style={styles.title}>{title}</AppText>
      {subtitle ? (
        <AppText variant="body" color="sub" style={styles.sub}>{subtitle}</AppText>
      ) : null}
      {actionLabel && onAction ? (
        <Button title={actionLabel} onPress={onAction} style={styles.btn} />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing['3xl'],
  },
  iconWrap: {
    width: 88,
    height: 88,
    borderRadius: radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing['2xl'],
  },
  title: { textAlign: 'center', marginBottom: spacing.sm },
  sub:   { textAlign: 'center', lineHeight: 22 },
  btn:   { marginTop: spacing.xl, alignSelf: 'center' },
});
