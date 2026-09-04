import { getDb } from './client';
import { Exercise } from '../navigation/types';

export const favoritesRepo = {
  getAll(): Exercise[] {
    const db = getDb();
    const rows = db.getAllSync<{ exercise_id: string; data: string }>(
      'SELECT exercise_id, data FROM favorites ORDER BY created_at DESC',
    );
    return rows.map((r) => JSON.parse(r.data) as Exercise);
  },

  isFavorite(exerciseId: string): boolean {
    const db = getDb();
    const row = db.getFirstSync<{ n: number }>(
      'SELECT COUNT(*) as n FROM favorites WHERE exercise_id = ?',
      [exerciseId],
    );
    return (row?.n ?? 0) > 0;
  },

  add(exercise: Exercise): void {
    const db = getDb();
    db.runSync(
      'INSERT OR REPLACE INTO favorites (exercise_id, data, created_at) VALUES (?, ?, ?)',
      [exercise.id, JSON.stringify(exercise), Date.now()],
    );
  },

  remove(exerciseId: string): void {
    const db = getDb();
    db.runSync('DELETE FROM favorites WHERE exercise_id = ?', [exerciseId]);
  },

  /** Returns the new isFavorite state */
  toggle(exercise: Exercise): boolean {
    if (this.isFavorite(exercise.id)) {
      this.remove(exercise.id);
      return false;
    }
    this.add(exercise);
    return true;
  },

  clearAll(): void {
    const db = getDb();
    db.runSync('DELETE FROM favorites');
  },
};
