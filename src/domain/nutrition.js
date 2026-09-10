/**
 * Evidence-based daily targets.
 *
 * Calories: Mifflin–St Jeor BMR (Academy of Nutrition and Dietetics)
 *   × Pal activity factor, then a conservative surplus/deficit.
 * Protein: ISSN 1.4–2.0 g/kg for training; 1.6–2.4 g/kg when dieting
 *   (Helms / Examine). Overweight uses BMI-25 reference weight so
 *   protein is not inflated by fat mass.
 * Fat: at least 0.7 g/kg, ~25% of calories (AMDR 20–35%).
 * Carbs: remaining calories.
 * Fiber: 14 g per 1000 kcal (IOM).
 * Water: 35 ml/kg.
 * Per-meal protein: ~0.25 g/kg (ISSN serving), split across meals.
 */

const ACTIVITY_FACTOR = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  very_active: 1.9,
};

function clamp(n, min, max) {
  return Math.min(max, Math.max(min, n));
}

export function mifflinStJeorBmr(sex, kg, cm, age) {
  const base = 10 * kg + 6.25 * cm - 5 * age;
  return sex === 'male' ? base + 5 : base - 161;
}

export function bmiOf(kg, cm) {
  const m = cm / 100;
  if (m <= 0) return 0;
  return kg / (m * m);
}

/** Use actual weight unless BMI ≥ 30 — then protein on BMI-25 equivalent. */
export function proteinReferenceKg(weightKg, heightCm) {
  const bmi = bmiOf(weightKg, heightCm);
  if (bmi < 30) return weightKg;
  const m = heightCm / 100;
  return 25 * m * m;
}

function proteinPerKg(goal) {
  switch (goal) {
    case 'lose_weight':
      return 2.0; // 1.6–2.4 range; 2.0 preserves lean mass in a deficit
    case 'gain_muscle':
      return 1.8; // 1.6–2.2; 1.8 is past the Morton ~1.6 plateau with headroom
    case 'build_strength':
    case 'increase_lift':
      return 1.8;
    case 'improve_endurance':
    case 'run_5k':
    case 'run_10k':
      return 1.6;
    case 'maintain':
    case 'workout_frequency':
    default:
      return 1.6;
  }
}

function calorieAdjustment(goal, tdee) {
  switch (goal) {
    case 'lose_weight':
      return -Math.min(500, Math.round(tdee * 0.2)); // ~0.5 kg/week, not crash
    case 'gain_muscle':
      return 250; // lean bulk — surplus, not dirty bulk
    case 'build_strength':
    case 'increase_lift':
      return 200;
    case 'improve_endurance':
    case 'run_5k':
    case 'run_10k':
      return 100;
    default:
      return 0;
  }
}

function stepGoalFor(goal) {
  switch (goal) {
    case 'lose_weight':
      return 10000;
    case 'run_5k':
    case 'run_10k':
    case 'improve_endurance':
      return 12000;
    default:
      return 8000;
  }
}

export function computeTargets(profile) {
  const bmr = mifflinStJeorBmr(profile.sex, profile.weightKg, profile.heightCm, profile.age);
  const tdee = bmr * ACTIVITY_FACTOR[profile.activity];
  const delta = calorieAdjustment(profile.goal, tdee);
  const floor = profile.sex === 'female' ? 1200 : 1500;
  const calories = Math.round(clamp(tdee + delta, floor, tdee + 500));

  const refKg = proteinReferenceKg(profile.weightKg, profile.heightCm);
  const proteinG = Math.round(refKg * proteinPerKg(profile.goal));
  const proteinKcal = proteinG * 4;

  const fatG = Math.round(Math.max(refKg * 0.7, (calories * 0.25) / 9));
  const fatKcal = fatG * 9;

  const carbKcal = Math.max(0, calories - proteinKcal - fatKcal);
  const carbsG = Math.round(carbKcal / 4);
  const fiberG = Math.round((calories / 1000) * 14);
  const waterMl = Math.round(profile.weightKg * 35);
  const meals = clamp(profile.mealsPerDay || 4, 3, 6);
  const proteinPerMealG = Math.round(proteinG / meals);
  const bmi = bmiOf(profile.weightKg, profile.heightCm);

  const notes = [
    'BMR uses Mifflin–St Jeor (kcal from weight, height, age, sex).',
    'TDEE = BMR × activity factor (1.2–1.9).',
    `Protein ${proteinPerKg(profile.goal).toFixed(1)} g/kg (ISSN / Examine ranges), using ${bmi >= 30 ? 'BMI-25 reference weight' : 'your body weight'}.`,
    'Fat ~25% of calories (min 0.7 g/kg). Carbs fill the rest.',
    'These are starting targets, not medical advice. Recalculate when weight changes.',
  ];

  return {
    bmr: Math.round(bmr),
    tdee: Math.round(tdee),
    calories,
    proteinG,
    carbsG,
    fatG,
    fiberG,
    waterMl,
    proteinPerMealG,
    stepGoal: stepGoalFor(profile.goal),
    bmi: Math.round(bmi * 10) / 10,
    calorieDelta: Math.round(calories - tdee),
    methodNotes: notes,
  };
}

export function kcalFromMacros(proteinG, carbsG, fatG) {
  return Math.round(proteinG * 4 + carbsG * 4 + fatG * 9);
}
