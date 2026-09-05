import { getDb } from './client';
import { generateId } from '../utils/uuid';

export interface CustomExercise {
  id: string;
  name: string;
  body_part: string;
  equipment: string;
  description: string;
  beginner_tips: string;
  created_at: number;
}

export const customExerciseRepo = {
  getAll(): CustomExercise[] {
    const db = getDb();
    return db.getAllSync<CustomExercise>(
      'SELECT * FROM custom_exercises ORDER BY name ASC',
    );
  },

  create(
    name: string,
    bodyPart: string,
    equipment: string,
    description = '',
    beginnerTips = '',
  ): CustomExercise {
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

  delete(id: string): void {
    const db = getDb();
    db.runSync('DELETE FROM custom_exercises WHERE id = ?', [id]);
  },

  clearAll(): void {
    const db = getDb();
    db.runSync('DELETE FROM custom_exercises');
  },
};
