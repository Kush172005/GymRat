import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme';
import { AppText } from './AppText';
import { Button } from './Button';
import { spacing, radius } from '../../theme/spacing';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = 'Something went wrong',
  message,
  onRetry,
}: ErrorStateProps) {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <View style={[styles.iconWrap, { backgroundColor: colors.errorSubtle }]}>
        <Ionicons name="alert-circle-outline" size={44} color={colors.error} />
      </View>
      <AppText variant="title3" style={styles.title}>{title}</AppText>
      {message ? (
        <AppText variant="body" color="sub" style={styles.msg}>{message}</AppText>
      ) : null}
      {onRetry ? (
        <Button title="Try Again" onPress={onRetry} style={styles.btn} />
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
  msg:   { textAlign: 'center', lineHeight: 22 },
  btn:   { marginTop: spacing.xl },
});
