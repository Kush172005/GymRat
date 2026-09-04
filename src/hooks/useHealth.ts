import { useCallback, useEffect, useState } from 'react';
import { AppState, Linking, Platform } from 'react-native';

import {
  emptyHealth,
  getHealthStatus,
  openHealthSettings,
  readHealth,
  requestHealth,
  startPedometerWatch,
  stopPedometerWatch,
} from '../health/client';
import { HealthSnapshot, HealthStatus } from '../health/types';
import { isExpoGo } from '../health/env';
import { stepsRepo } from '../db/stepsRepo';

export type { HealthStatus };

export function useHealth() {
  const [status, setStatus] = useState<HealthStatus>('checking');
  const [snapshot, setSnapshot] = useState<HealthSnapshot>(() => emptyHealth());
  const expoGo = isExpoGo();

  const sync = useCallback(async () => {
    const { status: s } = await getHealthStatus();
    setStatus(s);
    if (s === 'granted') {
      const snap = await readHealth();
      setSnapshot(snap);
      if (snap.source === 'phone_sensor' && Platform.OS === 'android') {
        startPedometerWatch((n) => {
          setSnapshot((prev) => ({ ...prev, steps: n }));
        });
      } else {
        stopPedometerWatch();
      }
      return;
    }
    stopPedometerWatch();
    setSnapshot((prev) => ({
      ...emptyHealth(),
      steps: stepsRepo.getTodaySteps(),
      week: stepsRepo.getLastNDays(7),
      source: prev.source,
    }));
  }, []);

  useEffect(() => {
    sync();
    const sub = AppState.addEventListener('change', (state) => {
      if (state === 'active') sync();
    });
    return () => {
      sub.remove();
      stopPedometerWatch();
    };
  }, [sync]);

  const request = useCallback(async () => {
    const { status: s } = await requestHealth();
    setStatus(s);
    if (s === 'granted') await sync();
    return s;
  }, [sync]);

  return { status, snapshot, request, refresh: sync, expoGo, openHealthSettings };
}

export function useSteps() {
  const health = useHealth();
  return {
    status: health.status,
    steps: health.snapshot.steps,
    request: health.request,
    refresh: health.refresh,
  };
}

export function openPlayHealthConnect(): void {
  Linking.openURL(
    'https://play.google.com/store/apps/details?id=com.google.android.apps.healthdata',
  ).catch(() => {});
}
