export const emptySnapshot = (source, week = []) => ({
  steps: 0,
  caloriesKcal: null,
  distanceM: null,
  heartRateBpm: null,
  sleepMin: null,
  weightKg: null,
  workouts: null,
  elevationM: null,
  source,
  week,
});
