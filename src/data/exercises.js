import { customExerciseRepo } from '../db/customExerciseRepo';
import { EXERCISE_DATA } from './exercisesData';

export const MUSCLE_GROUPS = [
  'All',
  'Chest',
  'Back',
  'Shoulders',
  'Biceps',
  'Triceps',
  'Legs',
  'Core',
];

/** Returns bundled + custom exercises merged */
export function getAllExercises() {
  const custom = customExerciseRepo.getAll().map((ce) => ({
    id: ce.id,
    name: ce.name,
    bodyPart: ce.body_part,
    equipment: ce.equipment,
    image: null,
    description: ce.description,
    beginnerTips: ce.beginner_tips,
    isCustom: true,
  }));
  return [...EXERCISE_DATA, ...custom];
}

/**
 * Filter exercises by search query and muscle group.
 * Handles compound bodyParts like "Back, Legs".
 */
export function filterExercises(exercises, query, muscle) {
  const q = query.toLowerCase().trim();
  return exercises.filter((ex) => {
    const matchesSearch = ex.name.toLowerCase().includes(q);
    if (muscle === 'All') return matchesSearch;
    const parts = ex.bodyPart
      .split(',')
      .map((s) => s.trim().toLowerCase());
    return matchesSearch && parts.includes(muscle.toLowerCase());
  });
}
