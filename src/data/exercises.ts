import { Exercise } from '../navigation/types';
import { customExerciseRepo } from '../db/customExerciseRepo';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { EXERCISE_DATA } = require('../../data/Excercises') as { EXERCISE_DATA: Exercise[] };

export const MUSCLE_GROUPS = [
  'All',
  'Chest',
  'Back',
  'Shoulders',
  'Biceps',
  'Triceps',
  'Legs',
  'Core',
] as const;

export type MuscleGroup = (typeof MUSCLE_GROUPS)[number];

/** Returns bundled + custom exercises merged */
export function getAllExercises(): Exercise[] {
  const custom = customExerciseRepo.getAll().map(
    (ce): Exercise => ({
      id: ce.id,
      name: ce.name,
      bodyPart: ce.body_part,
      equipment: ce.equipment,
      image: null,
      description: '',
      beginnerTips: '',
      isCustom: true,
    }),
  );
  return [...EXERCISE_DATA, ...custom];
}

/**
 * Filter exercises by search query and muscle group.
 * Handles compound bodyParts like "Back, Legs".
 */
export function filterExercises(
  exercises: Exercise[],
  query: string,
  muscle: string,
): Exercise[] {
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
