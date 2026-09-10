const A = {
  id: 'full_a',
  title: 'Full body A',
  focus: 'Squat + press',
  kind: 'lift',
  exercises: [
    { exerciseId: '2', name: 'Barbell Squat', sets: 3, reps: '5–8' },
    { exerciseId: '1', name: 'Barbell Bench Press', sets: 3, reps: '6–8' },
    { exerciseId: '16', name: 'Bent-Over Barbell Row', sets: 3, reps: '8–10' },
    { exerciseId: '9', name: 'Plank', sets: 3, reps: '30–45s' },
  ],
};

const B = {
  id: 'full_b',
  title: 'Full body B',
  focus: 'Hinge + pull',
  kind: 'lift',
  exercises: [
    { exerciseId: '3', name: 'Barbell Deadlift', sets: 3, reps: '4–6' },
    { exerciseId: '4', name: 'Barbell Overhead Press', sets: 3, reps: '6–8' },
    { exerciseId: '5', name: 'Pull-Up', sets: 3, reps: 'AMRAP' },
    { exerciseId: '12', name: 'Dumbbell Lunges', sets: 3, reps: '8 each' },
  ],
};

const C = {
  id: 'full_c',
  title: 'Full body C',
  focus: 'Accessories',
  kind: 'lift',
  exercises: [
    { exerciseId: '33', name: 'Front Squat', sets: 3, reps: '6–8' },
    { exerciseId: '21', name: 'Incline Dumbbell Press', sets: 3, reps: '8–10' },
    { exerciseId: '31', name: 'Lat Pulldown', sets: 3, reps: '8–12' },
    { exerciseId: '35', name: 'Face Pulls', sets: 3, reps: '12–15' },
    { exerciseId: '18', name: 'Hanging Leg Raise', sets: 3, reps: '8–12' },
  ],
};

const PUSH = {
  id: 'push',
  title: 'Push',
  focus: 'Chest, shoulders, triceps',
  kind: 'lift',
  exercises: [
    { exerciseId: '1', name: 'Barbell Bench Press', sets: 4, reps: '6–8' },
    { exerciseId: '4', name: 'Barbell Overhead Press', sets: 3, reps: '6–8' },
    { exerciseId: '21', name: 'Incline Dumbbell Press', sets: 3, reps: '8–10' },
    { exerciseId: '29', name: 'Cable Tricep Pushdown', sets: 3, reps: '10–12' },
  ],
};

const PULL = {
  id: 'pull',
  title: 'Pull',
  focus: 'Back, biceps',
  kind: 'lift',
  exercises: [
    { exerciseId: '3', name: 'Barbell Deadlift', sets: 3, reps: '4–6' },
    { exerciseId: '5', name: 'Pull-Up', sets: 3, reps: 'AMRAP' },
    { exerciseId: '14', name: 'Seated Cable Row', sets: 3, reps: '8–12' },
    { exerciseId: '6', name: 'Dumbbell Bicep Curl', sets: 3, reps: '10–12' },
  ],
};

const LEGS = {
  id: 'legs',
  title: 'Legs',
  focus: 'Squat pattern + calves',
  kind: 'lift',
  exercises: [
    { exerciseId: '2', name: 'Barbell Squat', sets: 4, reps: '5–8' },
    { exerciseId: '12', name: 'Dumbbell Lunges', sets: 3, reps: '8 each' },
    { exerciseId: '10', name: 'Leg Press', sets: 3, reps: '10–12' },
    { exerciseId: '17', name: 'Standing Calf Raise', sets: 3, reps: '12–15' },
  ],
};

const STRENGTH_A = {
  id: 'str_a',
  title: 'Strength A',
  focus: 'Squat + bench',
  kind: 'lift',
  exercises: [
    { exerciseId: '2', name: 'Barbell Squat', sets: 5, reps: '5' },
    { exerciseId: '1', name: 'Barbell Bench Press', sets: 5, reps: '5' },
    { exerciseId: '16', name: 'Bent-Over Barbell Row', sets: 5, reps: '5' },
  ],
};

const STRENGTH_B = {
  id: 'str_b',
  title: 'Strength B',
  focus: 'Squat + press + hinge',
  kind: 'lift',
  exercises: [
    { exerciseId: '2', name: 'Barbell Squat', sets: 5, reps: '5' },
    { exerciseId: '4', name: 'Barbell Overhead Press', sets: 5, reps: '5' },
    { exerciseId: '3', name: 'Barbell Deadlift', sets: 1, reps: '5' },
  ],
};

const RUN_EASY = {
  id: 'run_easy',
  title: 'Easy run',
  focus: 'Aerobic base',
  kind: 'run',
  exercises: [
    { exerciseId: '37', name: 'Mountain Climbers', sets: 3, reps: '30s', note: 'Warm-up if you cannot run outside.' },
  ],
};

function takeDays(pool, n) {
  const out = [];
  for (let i = 0; i < n; i++) out.push(pool[i % pool.length]);
  return out;
}

export function planForGoal(goal, daysPerWeek, experience) {
  const n = Math.min(6, Math.max(2, daysPerWeek));

  if (goal === 'build_strength' || goal === 'increase_lift') {
    return {
      id: 'strength',
      name: 'Linear strength',
      blurb: 'Heavy compounds 5×5. Add a little weight when you hit all reps.',
      days: takeDays([STRENGTH_A, STRENGTH_B], Math.min(n, 4)),
    };
  }

  if (goal === 'gain_muscle' && n >= 4) {
    return {
      id: 'ppl',
      name: 'Push / Pull / Legs',
      blurb: 'Classic hypertrophy split using your library lifts.',
      days: takeDays([PUSH, PULL, LEGS], n),
    };
  }

  if (goal === 'run_5k' || goal === 'run_10k' || goal === 'improve_endurance') {
    const lift = experience === 'beginner' ? [A, B] : [A, B, C];
    const days = [];
    for (let i = 0; i < n; i++) {
      days.push(i % 2 === 0 ? lift[Math.floor(i / 2) % lift.length] : RUN_EASY);
    }
    return {
      id: 'hybrid',
      name: goal === 'run_10k' ? '10K hybrid' : '5K hybrid',
      blurb: 'Lift on some days, easy running on others. Keep runs conversational.',
      days,
    };
  }

  return {
    id: 'full_body',
    name: 'Full body',
    blurb: 'Best default for fat loss, consistency, and beginners — 3 rotating sessions.',
    days: takeDays([A, B, C], n),
  };
}

/** Mon=1 … Sun=0. Default 3 days = Mon/Wed/Fri. */
const TRAINING_DOWS = {
  2: [1, 4],
  3: [1, 3, 5],
  4: [1, 2, 4, 5],
  5: [1, 2, 3, 4, 5],
  6: [1, 2, 3, 4, 5, 6],
  7: [0, 1, 2, 3, 4, 5, 6],
};

export function todaysPlanDay(plan, daysPerWeek, date = new Date()) {
  const trainingDows = TRAINING_DOWS[daysPerWeek] ?? TRAINING_DOWS[3];
  const idx = trainingDows.indexOf(date.getDay());
  if (idx < 0) return null;
  return plan.days[idx % plan.days.length];
}
