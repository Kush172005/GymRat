import { getDb } from './client';

export const favoritesRepo = {
  getAll() {
    const db = getDb();
    const rows = db.getAllSync(
      'SELECT exercise_id, data FROM favorites ORDER BY created_at DESC',
    );
    return rows.map((r) => JSON.parse(r.data));
  },

  isFavorite(exerciseId) {
    const db = getDb();
    const row = db.getFirstSync(
      'SELECT COUNT(*) as n FROM favorites WHERE exercise_id = ?',
      [exerciseId],
    );
    return (row?.n ?? 0) > 0;
  },

  add(exercise) {
    const db = getDb();
    db.runSync(
      'INSERT OR REPLACE INTO favorites (exercise_id, data, created_at) VALUES (?, ?, ?)',
      [exercise.id, JSON.stringify(exercise), Date.now()],
    );
  },

  remove(exerciseId) {
    const db = getDb();
    db.runSync('DELETE FROM favorites WHERE exercise_id = ?', [exerciseId]);
  },

  /** Returns the new isFavorite state */
  toggle(exercise) {
    if (this.isFavorite(exercise.id)) {
      this.remove(exercise.id);
      return false;
    }
    this.add(exercise);
    return true;
  },

  clearAll() {
    const db = getDb();
    db.runSync('DELETE FROM favorites');
  },
};
