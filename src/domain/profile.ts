export type Sex = 'male' | 'female';
export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
export type Experience = 'beginner' | 'intermediate';

export type GoalType =
  | 'lose_weight'
  | 'gain_muscle'
  | 'build_strength'
  | 'improve_endurance'
  | 'maintain'
  | 'run_5k'
  | 'run_10k'
  | 'increase_lift'
  | 'workout_frequency';

export interface UserProfile {
  name?: string;
  sex: Sex;
  age: number;
  heightCm: number;
  weightKg: number;
  activity: ActivityLevel;
  experience: Experience;
  daysPerWeek: number;
  mealsPerDay: number;
  goal: GoalType;
  targetWeightKg?: number;
  liftFocus?: 'bench' | 'squat' | 'deadlift' | 'ohp';
}

export const GOAL_OPTIONS: { id: GoalType; label: string; blurb: string }[] = [
  { id: 'lose_weight', label: 'Lose weight', blurb: 'Fat loss while keeping muscle' },
  { id: 'gain_muscle', label: 'Gain muscle', blurb: 'Lean bulk with enough protein' },
  { id: 'build_strength', label: 'Build strength', blurb: 'Heavier compounds, modest surplus' },
  { id: 'improve_endurance', label: 'Improve endurance', blurb: 'Fuel longer sessions' },
  { id: 'maintain', label: 'Maintain weight', blurb: 'Hold weight and stay consistent' },
  { id: 'run_5k', label: 'Run a 5K', blurb: 'Lift + easy run days' },
  { id: 'run_10k', label: 'Run a 10K', blurb: 'Lift + longer easy runs' },
  { id: 'increase_lift', label: 'Increase a lift', blurb: 'Focus squat, bench, deadlift, or press' },
  { id: 'workout_frequency', label: 'Train X days/week', blurb: 'Hit a weekly training habit' },
];

export const ACTIVITY_OPTIONS: { id: ActivityLevel; label: string; blurb: string }[] = [
  { id: 'sedentary', label: 'Sedentary', blurb: 'Desk work, little extra movement' },
  { id: 'light', label: 'Light', blurb: 'Walks or 1–3 easy sessions' },
  { id: 'moderate', label: 'Moderate', blurb: 'Gym 3–5 days' },
  { id: 'active', label: 'Active', blurb: 'Hard training most days' },
  { id: 'very_active', label: 'Very active', blurb: 'Two-a-days or physical job' },
];
