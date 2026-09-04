import { getDb } from './client';
import { generateId } from '../utils/uuid';
import { todayKey } from '../utils/date';

export interface FoodLogRow {
  id: string;
  date: string;
  food_id: string;
  name: string;
  servings: number;
  protein_g: number;
  carbs_g: number;
  fat_g: number;
  kcal: number;
  created_at: number;
}

export const nutritionRepo = {
  addLog(entry: Omit<FoodLogRow, 'id' | 'created_at' | 'date'> & { date?: string }): FoodLogRow {
    const id = generateId();
    const now = Date.now();
    const date = entry.date ?? todayKey();
    getDb().runSync(
      `INSERT INTO food_logs (id, date, food_id, name, servings, protein_g, carbs_g, fat_g, kcal, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [id, date, entry.food_id, entry.name, entry.servings, entry.protein_g, entry.carbs_g, entry.fat_g, entry.kcal, now],
    );
    return { id, date, created_at: now, ...entry, servings: entry.servings };
  },

  getForDate(date = todayKey()): FoodLogRow[] {
    return getDb().getAllSync<FoodLogRow>(
      'SELECT * FROM food_logs WHERE date = ? ORDER BY created_at DESC',
      [date],
    );
  },

  remove(id: string): void {
    getDb().runSync('DELETE FROM food_logs WHERE id = ?', [id]);
  },

  totalsForDate(date = todayKey()): { protein: number; carbs: number; fat: number; kcal: number } {
    const row = getDb().getFirstSync<{ p: number; c: number; f: number; k: number }>(
      `SELECT COALESCE(SUM(protein_g),0) as p, COALESCE(SUM(carbs_g),0) as c,
              COALESCE(SUM(fat_g),0) as f, COALESCE(SUM(kcal),0) as k
       FROM food_logs WHERE date = ?`,
      [date],
    );
    return { protein: row?.p ?? 0, carbs: row?.c ?? 0, fat: row?.f ?? 0, kcal: row?.k ?? 0 };
  },

  getWater(date = todayKey()): number {
    const row = getDb().getFirstSync<{ ml: number }>(
      'SELECT ml FROM water_logs WHERE date = ?',
      [date],
    );
    return row?.ml ?? 0;
  },

  addWater(ml: number, date = todayKey()): number {
    const next = Math.max(0, this.getWater(date) + ml);
    getDb().runSync(
      'INSERT OR REPLACE INTO water_logs (date, ml) VALUES (?, ?)',
      [date, next],
    );
    return next;
  },

  clearAll(): void {
    const db = getDb();
    db.runSync('DELETE FROM food_logs');
    db.runSync('DELETE FROM water_logs');
  },

  getAllForExport() {
    return {
      food: getDb().getAllSync('SELECT * FROM food_logs ORDER BY date'),
      water: getDb().getAllSync('SELECT * FROM water_logs ORDER BY date'),
    };
  },
};
