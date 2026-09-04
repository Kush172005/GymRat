import React from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '../../theme';

interface ScreenProps {
  children: React.ReactNode;
  style?: ViewStyle;
  scroll?: boolean;
  /** Pass false to disable bottom safe-area padding (e.g. screens with a tab bar) */
  bottomInset?: boolean;
  keyboardAvoiding?: boolean;
  contentContainerStyle?: ViewStyle;
  /** Extra padding around scroll content */
  padding?: number;
}

export function Screen({
  children,
  style,
  scroll = false,
  bottomInset = true,
  keyboardAvoiding = false,
  contentContainerStyle,
  padding = 16,
}: ScreenProps) {
  const { colors, isDark } = useTheme();
  const insets = useSafeAreaInsets();

  const inner = scroll ? (
    <ScrollView
      contentContainerStyle={[
        { padding, paddingBottom: (bottomInset ? insets.bottom : 0) + padding + 24 },
        contentContainerStyle,
      ]}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      {children}
    </ScrollView>
  ) : (
    <View style={[styles.flex, style]}>{children}</View>
  );

  return (
    <SafeAreaView
      style={[styles.root, { backgroundColor: colors.background }, !scroll && style]}
      edges={['top', 'left', 'right']}
    >
      <StatusBar style={isDark ? 'light' : 'dark'} />
      {keyboardAvoiding ? (
        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          {inner}
        </KeyboardAvoidingView>
      ) : (
        inner
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  flex: { flex: 1 },
});
