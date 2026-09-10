import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { fontFamily, fontSize } from '../theme/typography';
import { spacing, radius } from '../theme/spacing';

/**
 * Root error boundary — catches render crashes and shows a recovery UI
 * instead of the dreaded white screen.
 */
export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // In production you could log to Sentry / Crashlytics here
    console.error('[GymRat ErrorBoundary]', error, info.componentStack);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.container}>
          <Text style={styles.emoji}>💪</Text>
          <Text style={styles.title}>Something went wrong</Text>
          <Text style={styles.message}>
            GymRat hit an unexpected error. Your data is safe — tap below to try again.
          </Text>
          {__DEV__ && this.state.error && (
            <Text style={styles.devError} numberOfLines={6}>
              {this.state.error.toString()}
            </Text>
          )}
          <TouchableOpacity
            style={styles.btn}
            onPress={this.handleRetry}
            accessibilityRole="button"
            accessibilityLabel="Retry"
          >
            <Text style={styles.btnText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D10',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing['3xl'],
  },
  emoji: {
    fontSize: 64,
    marginBottom: spacing['2xl'],
  },
  title: {
    fontFamily: fontFamily.display.bold,
    fontSize: fontSize['2xl'],
    color: '#F0F0F5',
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  message: {
    fontFamily: fontFamily.body.regular,
    fontSize: fontSize.md,
    color: '#9898A8',
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: spacing['2xl'],
  },
  devError: {
    fontFamily: 'monospace',
    fontSize: fontSize.xs,
    color: '#F87171',
    backgroundColor: 'rgba(248,113,113,0.1)',
    padding: spacing.md,
    borderRadius: radius.sm,
    marginBottom: spacing.xl,
    width: '100%',
  },
  btn: {
    backgroundColor: '#E8640A',
    paddingHorizontal: spacing['2xl'],
    paddingVertical: spacing.md,
    borderRadius: radius.lg,
  },
  btnText: {
    fontFamily: fontFamily.body.bold,
    fontSize: fontSize.md,
    color: '#FFFFFF',
  },
});
