import { Platform } from 'react-native';

import { toDateKey } from '../utils/date';
import { stepsRepo } from '../db/stepsRepo';
import { healthRepo } from '../db/healthRepo';
import { isExpoGo } from './env';
import { pedometerProvider, Pedometer } from './pedometer';
import { emptySnapshot } from './types';

let native;
let watchSub = null;

async function loadNative() {
  if (native !== undefined) return native;
  if (isExpoGo()) {
    native = null;
    return null;
  }
  try {
    if (Platform.OS === 'android') {
      native = (await import('./androidHealthConnect')).androidHealthConnect;
      return native;
    }
    if (Platform.OS === 'ios') {
      native = (await import('./iosHealthKit')).iosHealthKit;
      return native;
    }
  } catch {
    native = null;
    return null;
  }
  native = null;
  return null;
}

export async function getHealthStatus() {
  const n = await loadNative();
  if (n) {
    const s = await n.getStatus();
    if (s === 'granted' || s === 'needs_install' || s === 'undetermined' || s === 'denied') {
      return { status: s, source: n.id };
    }
  }
  const p = await pedometerProvider.getStatus();
  return { status: p, source: 'phone_sensor' };
}

export async function requestHealth() {
  const n = await loadNative();
  if (n) {
    const s = await n.request();
    if (s === 'granted') {
      // Health Connect only has step data if some other app (Google Fit, Samsung
      // Health, a fitness tracker...) is writing into it — most phones have nothing
      // doing that. Also grab the phone's own step-sensor permission in the background
      // so we can still show real steps even when Health Connect itself is empty.
      if (Platform.OS === 'android') pedometerProvider.request().catch(() => {});
      return { status: s, source: n.id };
    }
    if (s === 'needs_install') return { status: s, source: n.id };
  }
  const p = await pedometerProvider.request();
  return { status: p, source: 'phone_sensor' };
}

export async function readHealth() {
  const n = await loadNative();
  if (n) {
    const s = await n.getStatus();
    if (s === 'granted') {
      const snap = await n.readToday();
      if (Platform.OS === 'android') {
        // Steps specifically can also come from the phone's own sensor (see above) —
        // use whichever is higher instead of trusting an empty Health Connect record.
        const sensorSteps = stepsRepo.getTodaySteps();
        if (sensorSteps > snap.steps) {
          snap.steps = sensorSteps;
          if (snap.week.length) snap.week[snap.week.length - 1].steps = sensorSteps;
        }
      }
      persist(snap);
      return snap;
    }
  }
  const snap = await pedometerProvider.readToday();
  persist(snap);
  return snap;
}

function persist(snap) {
  stepsRepo.setDaySteps(toDateKey(new Date()), snap.steps);
  for (const d of snap.week) stepsRepo.setDaySteps(d.date, d.steps);
  healthRepo.saveSnapshot(snap);
}

export function startPedometerWatch(onSteps) {
  if (watchSub) return;
  watchSub = Pedometer.watchStepCount((result) => {
    onSteps(stepsRepo.addTodaySteps(result.steps));
  });
}

export function stopPedometerWatch() {
  watchSub?.remove();
  watchSub = null;
}

export function openHealthSettings() {
  void loadNative().then((n) => n?.openSettings?.());
}

export function emptyHealth() {
  return emptySnapshot('phone_sensor', stepsRepo.getLastNDays(7));
}
