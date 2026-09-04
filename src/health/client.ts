import { Platform } from 'react-native';

import { toDateKey } from '../utils/date';
import { stepsRepo } from '../db/stepsRepo';
import { healthRepo } from '../db/healthRepo';
import { isExpoGo } from './env';
import { pedometerProvider, Pedometer } from './pedometer';
import { emptySnapshot, HealthProvider, HealthSnapshot, HealthStatus } from './types';

let native: HealthProvider | null | undefined;
let watchSub: { remove: () => void } | null = null;
let usingNative = false;

async function loadNative(): Promise<HealthProvider | null> {
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

export async function getHealthStatus(): Promise<{ status: HealthStatus; source: HealthSnapshot['source'] }> {
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

export async function requestHealth(): Promise<{ status: HealthStatus; source: HealthSnapshot['source'] }> {
  const n = await loadNative();
  if (n) {
    const s = await n.request();
    if (s === 'granted') return { status: s, source: n.id };
    if (s === 'needs_install') return { status: s, source: n.id };
  }
  const p = await pedometerProvider.request();
  return { status: p, source: 'phone_sensor' };
}

export async function readHealth(): Promise<HealthSnapshot> {
  const n = await loadNative();
  if (n) {
    const s = await n.getStatus();
    if (s === 'granted') {
      usingNative = true;
      stopPedometerWatch();
      const snap = await n.readToday();
      persist(snap);
      return snap;
    }
  }
  usingNative = false;
  const snap = await pedometerProvider.readToday();
  persist(snap);
  return snap;
}

function persist(snap: HealthSnapshot): void {
  stepsRepo.setDaySteps(toDateKey(new Date()), snap.steps);
  for (const d of snap.week) stepsRepo.setDaySteps(d.date, d.steps);
  healthRepo.saveSnapshot(snap);
}

export function startPedometerWatch(onSteps: (n: number) => void): void {
  if (usingNative || Platform.OS === 'ios') return;
  if (watchSub) return;
  watchSub = Pedometer.watchStepCount((result) => {
    onSteps(stepsRepo.addTodaySteps(result.steps));
  });
}

export function stopPedometerWatch(): void {
  watchSub?.remove();
  watchSub = null;
}

export function openHealthSettings(): void {
  void loadNative().then((n) => n?.openSettings?.());
}

export function emptyHealth(): HealthSnapshot {
  return emptySnapshot('phone_sensor', stepsRepo.getLastNDays(7));
}
