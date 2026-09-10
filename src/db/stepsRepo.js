import { getDb } from './client';
import { toDateKey, getLastNDateKeys } from '../utils/date';

export const stepsRepo = {
  getTodaySteps() {
    return this.getDaySteps(toDateKey(new Date()));
  },

  getDaySteps(date) {
    const row = getDb().getFirstSync(
      'SELECT steps FROM daily_steps WHERE date = ?',
      [date],
    );
    return row?.steps ?? 0;
  },

  setDaySteps(date, steps) {
    getDb().runSync(
      'INSERT OR REPLACE INTO daily_steps (date, steps) VALUES (?, ?)',
      [date, Math.max(0, Math.round(steps))],
    );
  },

  addTodaySteps(delta) {
    const today = toDateKey(new Date());
    const next = this.getDaySteps(today) + delta;
    this.setDaySteps(today, next);
    return next;
  },

  getLastNDays(n) {
    const keys = getLastNDateKeys(n);
    if (keys.length === 0) return [];
    const placeholders = keys.map(() => '?').join(',');
    const rows = getDb().getAllSync(
      `SELECT date, steps FROM daily_steps WHERE date IN (${placeholders})`,
      keys,
    );
    const map = new Map(rows.map((r) => [r.date, r.steps]));
    return keys.map((date) => ({ date, steps: map.get(date) ?? 0 }));
  },

  clearAll() {
    getDb().runSync('DELETE FROM daily_steps');
  },

  getAllForExport() {
    return getDb().getAllSync(
      'SELECT date, steps FROM daily_steps ORDER BY date DESC',
    );
  },
};
