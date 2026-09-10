import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme';
import { AppText } from './AppText';
import { Button } from './Button';
import { spacing, radius } from '../../theme/spacing';

export function PermissionState({
  title,
  message,
  onRequest,
  requestLabel = 'Allow Access',
  showSettings = false,
  onOpenSettings,
}) {
  const { colors } = useTheme();
  return (
    <View style={styles.container}>
      <View style={[styles.iconWrap, { backgroundColor: colors.primarySubtle }]}>
        <Ionicons name="lock-closed-outline" size={40} color={colors.primary} />
      </View>
      <AppText variant="title3" style={styles.title}>{title}</AppText>
      <AppText variant="body" color="sub" style={styles.msg}>{message}</AppText>
      <Button title={requestLabel} onPress={onRequest} fullWidth style={styles.btn} />
      {showSettings && onOpenSettings ? (
        <Button title="Open Settings" onPress={onOpenSettings} variant="ghost" fullWidth />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', padding: spacing.lg },
  iconWrap: {
    width: 80,
    height: 80,
    borderRadius: radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  title: { textAlign: 'center', marginBottom: spacing.sm },
  msg: { textAlign: 'center', lineHeight: 22, marginBottom: spacing.lg },
  btn: { marginBottom: spacing.sm },
});
