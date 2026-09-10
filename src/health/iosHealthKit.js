import {
  getMostRecentQuantitySample,
  isHealthDataAvailableAsync,
  queryCategorySamples,
  queryStatisticsForQuantity,
  queryWorkoutSamples,
  requestAuthorization,
  WorkoutTypeIdentifier,
} from '@kingstinct/react-native-healthkit';

import { getLastNDateKeys } from '../utils/date';
import { settingsRepo } from '../db/settingsRepo';
import { emptySnapshot } from './types';
import { dayBounds } from './time';

const TO_READ = [
  'HKQuantityTypeIdentifierStepCount',
  'HKQuantityTypeIdentifierHeartRate',
  'HKQuantityTypeIdentifierActiveEnergyBurned',
  'HKQuantityTypeIdentifierDistanceWalkingRunning',
  'HKQuantityTypeIdentifierBodyMass',
  'HKQuantityTypeIdentifierFlightsClimbed',
  'HKCategoryTypeIdentifierSleepAnalysis',
  WorkoutTypeIdentifier,
];

const ASKED_KEY = 'apple_health_asked';

async function sum(identifier, start, end, unit) {
  const stats = await queryStatisticsForQuantity(identifier, ['cumulativeSum'], {
    filter: { date: { startDate: start, endDate: end } },
    unit,
  });
  return stats.sumQuantity?.quantity ?? 0;
}

export const iosHealthKit = {
  id: 'apple_health',

  async getStatus() {
    try {
      const ok = await isHealthDataAvailableAsync();
      if (!ok) return 'unavailable';
      if (settingsRepo.get(ASKED_KEY) === 'true') return 'granted';
      return 'undetermined';
    } catch {
      return 'unavailable';
    }
  },

  async request() {
    try {
      const ok = await isHealthDataAvailableAsync();
      if (!ok) return 'unavailable';
      await requestAuthorization({ toRead: [...TO_READ] });
      settingsRepo.set(ASKED_KEY, 'true');
      return 'granted';
    } catch {
      return 'denied';
    }
  },

  async readToday() {
    const snap = emptySnapshot('apple_health');
    const today = dayBounds(0);

    try {
      snap.steps = Math.round(await sum('HKQuantityTypeIdentifierStepCount', today.start, today.end, 'count'));
    } catch { /* */ }

    try {
      snap.caloriesKcal = Math.round(
        await sum('HKQuantityTypeIdentifierActiveEnergyBurned', today.start, today.end, 'kcal'),
      );
    } catch { /* */ }

    try {
      snap.distanceM = await sum(
        'HKQuantityTypeIdentifierDistanceWalkingRunning',
        today.start,
        today.end,
        'm',
      );
    } catch { /* */ }

    try {
      const hr = await queryStatisticsForQuantity('HKQuantityTypeIdentifierHeartRate', ['discreteAverage'], {
        filter: { date: { startDate: today.start, endDate: today.end } },
        unit: 'count/min',
      });
      if (hr.averageQuantity) snap.heartRateBpm = Math.round(hr.averageQuantity.quantity);
    } catch {
      try {
        const sample = await getMostRecentQuantitySample('HKQuantityTypeIdentifierHeartRate', 'count/min');
        if (sample) snap.heartRateBpm = Math.round(sample.quantity);
      } catch { /* */ }
    }

    try {
      const sleepFrom = new Date(today.start);
      sleepFrom.setHours(sleepFrom.getHours() - 12);
      const samples = await queryCategorySamples('HKCategoryTypeIdentifierSleepAnalysis', {
        limit: 0,
        filter: { date: { startDate: sleepFrom, endDate: today.end } },
      });
      let min = 0;
      for (const s of samples) {
        const asleep = s.value === 1 || s.value === 3 || s.value === 4 || s.value === 5;
        if (!asleep) continue;
        const ms = s.endDate.getTime() - s.startDate.getTime();
        if (ms > 0) min += ms / 60000;
      }
      snap.sleepMin = Math.round(min);
    } catch { /* */ }

    try {
      const mass = await getMostRecentQuantitySample('HKQuantityTypeIdentifierBodyMass', 'kg');
      if (mass) snap.weightKg = mass.quantity;
    } catch { /* */ }

    try {
      const workouts = await queryWorkoutSamples({
        limit: 40,
        filter: { date: { startDate: today.start, endDate: today.end } },
      });
      snap.workouts = workouts.length;
    } catch { /* */ }

    try {
      const flights = await sum('HKQuantityTypeIdentifierFlightsClimbed', today.start, today.end, 'count');
      snap.elevationM = flights * 3;
    } catch { /* */ }

    const keys = getLastNDateKeys(7);
    snap.week = [];
    for (let i = 6; i >= 0; i--) {
      const b = dayBounds(i);
      let steps = 0;
      try {
        steps = Math.round(await sum('HKQuantityTypeIdentifierStepCount', b.start, b.end, 'count'));
      } catch { /* */ }
      snap.week.push({ date: keys[6 - i] ?? b.key, steps });
    }
    return snap;
  },
};
