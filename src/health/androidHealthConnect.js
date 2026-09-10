import { Linking } from 'react-native';
import {
  aggregateRecord,
  getGrantedPermissions,
  getSdkStatus,
  initialize,
  openHealthConnectSettings,
  readRecords,
  requestPermission,
  SdkAvailabilityStatus,
} from 'react-native-health-connect';

import { getLastNDateKeys } from '../utils/date';
import { emptySnapshot } from './types';
import { dayBounds, iso } from './time';

const READ = [
  { accessType: 'read', recordType: 'Steps' },
  { accessType: 'read', recordType: 'HeartRate' },
  { accessType: 'read', recordType: 'ActiveCaloriesBurned' },
  { accessType: 'read', recordType: 'TotalCaloriesBurned' },
  { accessType: 'read', recordType: 'Weight' },
  { accessType: 'read', recordType: 'ExerciseSession' },
  { accessType: 'read', recordType: 'Distance' },
  { accessType: 'read', recordType: 'SleepSession' },
  { accessType: 'read', recordType: 'ElevationGained' },
];

let ready = false;

async function ensureSdk() {
  const status = await getSdkStatus();
  if (status === SdkAvailabilityStatus.SDK_UNAVAILABLE) return 'unavailable';
  if (status === SdkAvailabilityStatus.SDK_UNAVAILABLE_PROVIDER_UPDATE_REQUIRED) {
    return 'needs_install';
  }
  if (status !== SdkAvailabilityStatus.SDK_AVAILABLE) return 'unavailable';
  if (!ready) {
    ready = await initialize();
  }
  return ready ? 'undetermined' : 'unavailable';
}

function hasRead(granted, type) {
  return granted.some((p) => p.accessType === 'read' && p.recordType === type);
}

async function currentStatus() {
  const sdk = await ensureSdk();
  if (sdk !== 'undetermined') return sdk;
  const granted = await getGrantedPermissions();
  if (hasRead(granted, 'Steps')) return 'granted';
  return 'undetermined';
}

async function stepsBetween(start, end) {
  try {
    const r = await aggregateRecord({
      recordType: 'Steps',
      timeRangeFilter: { operator: 'between', startTime: iso(start), endTime: iso(end) },
    });
    return Math.round(r.COUNT_TOTAL ?? 0);
  } catch {
    return 0;
  }
}

export const androidHealthConnect = {
  id: 'health_connect',

  async getStatus() {
    try {
      return await currentStatus();
    } catch {
      return 'unavailable';
    }
  },

  async request() {
    try {
      const sdk = await ensureSdk();
      if (sdk === 'needs_install') {
        Linking.openURL(
          'https://play.google.com/store/apps/details?id=com.google.android.apps.healthdata',
        ).catch(() => {});
        return 'needs_install';
      }
      if (sdk !== 'undetermined' && sdk !== 'granted') return sdk;
      await requestPermission(READ);
      return await currentStatus();
    } catch {
      return 'denied';
    }
  },

  async readToday() {
    const snap = emptySnapshot('health_connect');
    const today = dayBounds(0);

    snap.steps = await stepsBetween(today.start, today.end);

    try {
      const cal = await aggregateRecord({
        recordType: 'ActiveCaloriesBurned',
        timeRangeFilter: { operator: 'between', startTime: iso(today.start), endTime: iso(today.end) },
      });
      snap.caloriesKcal = Math.round(cal.ACTIVE_CALORIES_TOTAL.inKilocalories);
    } catch {
      try {
        const total = await aggregateRecord({
          recordType: 'TotalCaloriesBurned',
          timeRangeFilter: { operator: 'between', startTime: iso(today.start), endTime: iso(today.end) },
        });
        snap.caloriesKcal = Math.round(total.ENERGY_TOTAL.inKilocalories);
      } catch { /* optional */ }
    }

    try {
      const dist = await aggregateRecord({
        recordType: 'Distance',
        timeRangeFilter: { operator: 'between', startTime: iso(today.start), endTime: iso(today.end) },
      });
      snap.distanceM = dist.DISTANCE.inMeters;
    } catch { /* optional */ }

    try {
      const hr = await aggregateRecord({
        recordType: 'HeartRate',
        timeRangeFilter: { operator: 'between', startTime: iso(today.start), endTime: iso(today.end) },
      });
      snap.heartRateBpm = Math.round(hr.BPM_AVG);
    } catch { /* optional */ }

    try {
      const elev = await aggregateRecord({
        recordType: 'ElevationGained',
        timeRangeFilter: { operator: 'between', startTime: iso(today.start), endTime: iso(today.end) },
      });
      snap.elevationM = elev.ELEVATION_GAINED_TOTAL.inMeters;
    } catch { /* optional */ }

    try {
      const sleepFrom = new Date(today.start);
      sleepFrom.setHours(sleepFrom.getHours() - 12);
      const sessions = await readRecords('SleepSession', {
        timeRangeFilter: { operator: 'between', startTime: iso(sleepFrom), endTime: iso(today.end) },
      });
      let min = 0;
      for (const s of sessions.records) {
        const a = new Date(s.startTime).getTime();
        const b = new Date(s.endTime).getTime();
        if (b > a) min += (b - a) / 60000;
      }
      snap.sleepMin = Math.round(min);
    } catch { /* optional */ }

    try {
      const w = await readRecords('Weight', {
        timeRangeFilter: { operator: 'between', startTime: iso(new Date(Date.now() - 90 * 86400000)), endTime: iso(today.end) },
        pageSize: 1,
        ascendingOrder: false,
      });
      const last = w.records[0];
      if (last?.weight) snap.weightKg = last.weight.inKilograms;
    } catch { /* optional */ }

    try {
      const ex = await readRecords('ExerciseSession', {
        timeRangeFilter: { operator: 'between', startTime: iso(today.start), endTime: iso(today.end) },
      });
      snap.workouts = ex.records.length;
    } catch { /* optional */ }

    const keys = getLastNDateKeys(7);
    snap.week = [];
    for (let i = 6; i >= 0; i--) {
      const b = dayBounds(i);
      snap.week.push({ date: keys[6 - i] ?? b.key, steps: await stepsBetween(b.start, b.end) });
    }
    return snap;
  },

  openSettings() {
    openHealthConnectSettings();
  },
};
