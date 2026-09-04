import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { settingsRepo } from '../db/settingsRepo';
import { RootStackParamList } from './types';
import { OnboardingScreen } from '../screens/onboarding/OnboardingScreen';
import { ProfileSetupScreen } from '../screens/you/ProfileSetupScreen';
import { TabNavigator } from './TabNavigator';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  const [onboardingDone] = useState(() => settingsRepo.isOnboardingDone());

  return (
    <Stack.Navigator
      initialRouteName={onboardingDone ? 'Main' : 'Onboarding'}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen} />
      <Stack.Screen name="Main" component={TabNavigator} />
    </Stack.Navigator>
  );
}
