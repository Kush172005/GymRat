import { getDb } from './client';
import { generateId } from '../utils/uuid';

export const customExerciseRepo = {
  getAll() {
    const db = getDb();
    return db.getAllSync(
      'SELECT * FROM custom_exercises ORDER BY name ASC',
    );
  },

  create(name, bodyPart, equipment, description = '', beginnerTips = '') {
    const db = getDb();
    const id = `custom_${generateId()}`;
    const now = Date.now();
    db.runSync(
      `INSERT INTO custom_exercises (id, name, body_part, equipment, description, beginner_tips, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [id, name, bodyPart, equipment, description, beginnerTips, now],
    );
    return {
      id,
      name,
      body_part: bodyPart,
      equipment,
      description,
      beginner_tips: beginnerTips,
      created_at: now,
    };
  },

  delete(id) {
    const db = getDb();
    db.runSync('DELETE FROM custom_exercises WHERE id = ?', [id]);
  },

  clearAll() {
    const db = getDb();
    db.runSync('DELETE FROM custom_exercises');
  },
};
