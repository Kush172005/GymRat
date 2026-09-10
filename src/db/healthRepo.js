import { getDb } from './client';
import { todayKey } from '../utils/date';

export const healthRepo = {
  saveSnapshot(snap) {
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

  getToday() {
    return (
      getDb().getFirstSync(
        'SELECT calories, distance_m, sleep_min, weight_kg, heart_rate, workouts, elevation_m, source FROM health_daily WHERE date = ?',
        [todayKey()],
      ) ?? null
    );
  },

  clearAll() {
    getDb().runSync('DELETE FROM health_daily');
  },
};
