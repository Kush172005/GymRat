import { getDb } from './client';
import { todayKey } from '../utils/date';
import { HealthSnapshot } from '../health/types';

export const healthRepo = {
  saveSnapshot(snap: HealthSnapshot): void {
    const date = todayKey();
    getDb().runSync(
      `INSERT OR REPLACE INTO health_daily
        (date, steps, calories, distance_m, sleep_min, weight_kg, heart_rate, workouts, elevation_m, source, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        date,
        snap.steps,
        snap.caloriesKcal,
        snap.distanceM,
        snap.sleepMin,
        snap.weightKg,
        snap.heartRateBpm,
        snap.workouts,
        snap.elevationM,
        snap.source,
        Date.now(),
      ],
    );
  },

  getToday(): {
    calories: number | null;
    distance_m: number | null;
    sleep_min: number | null;
    weight_kg: number | null;
    heart_rate: number | null;
    workouts: number | null;
    elevation_m: number | null;
    source: string | null;
  } | null {
    return (
      getDb().getFirstSync(
        'SELECT calories, distance_m, sleep_min, weight_kg, heart_rate, workouts, elevation_m, source FROM health_daily WHERE date = ?',
        [todayKey()],
      ) ?? null
    );
  },

  clearAll(): void {
    getDb().runSync('DELETE FROM health_daily');
  },
};
