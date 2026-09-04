import { Pedometer } from 'expo-sensors';
import { Platform } from 'react-native';

import { stepsRepo } from '../db/stepsRepo';
import { toDateKey } from '../utils/date';
import { emptySnapshot, HealthProvider, HealthSnapshot, HealthStatus } from './types';
import { dayBounds } from './time';

async function iosHistory(): Promise<void> {
  if (Platform.OS !== 'ios') return;
  const now = new Date();
  for (let i = 0; i < 7; i++) {
    const { start, end, key } = dayBounds(i, now);
    try {
      const res = await Pedometer.getStepCountAsync(start, end);
      if (typeof res?.steps === 'number') stepsRepo.setDaySteps(key, res.steps);
    } catch {
      // Core Motion keeps ~7 days
    }
  }
}

export const pedometerProvider: HealthProvider = {
  id: 'phone_sensor',

  async getStatus(): Promise<HealthStatus> {
    try {
      const available = await Pedometer.isAvailableAsync();
      if (!available) return 'unavailable';
      const { status } = await Pedometer.getPermissionsAsync();
      if (status === 'granted') return 'granted';
      if (status === 'undetermined') return 'undetermined';
      return 'denied';
    } catch {
      return 'unavailable';
    }
  },

  async request(): Promise<HealthStatus> {
    try {
      const available = await Pedometer.isAvailableAsync();
      if (!available) return 'unavailable';
      const { status } = await Pedometer.requestPermissionsAsync();
      return status === 'granted' ? 'granted' : 'denied';
    } catch {
      return 'unavailable';
    }
  },

  async readToday(): Promise<HealthSnapshot> {
    if (Platform.OS === 'ios') {
      await iosHistory();
      const midnight = new Date();
      midnight.setHours(0, 0, 0, 0);
      try {
        const res = await Pedometer.getStepCountAsync(midnight, new Date());
        if (typeof res?.steps === 'number') {
          stepsRepo.setDaySteps(toDateKey(new Date()), res.steps);
        }
      } catch { /* */ }
    }
    const week = stepsRepo.getLastNDays(7);
    const snap = emptySnapshot('phone_sensor', week);
    snap.steps = stepsRepo.getTodaySteps();
    return snap;
  },
};

export { Pedometer };
