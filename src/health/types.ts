export type HealthStatus =
  | 'checking'
  | 'granted'
  | 'denied'
  | 'undetermined'
  | 'unavailable'
  | 'needs_install';

export type HealthSource = 'health_connect' | 'apple_health' | 'phone_sensor';

export interface DaySteps {
  date: string;
  steps: number;
}

export interface HealthSnapshot {
  steps: number;
  caloriesKcal: number | null;
  distanceM: number | null;
  heartRateBpm: number | null;
  sleepMin: number | null;
  weightKg: number | null;
  workouts: number | null;
  elevationM: number | null;
  source: HealthSource;
  week: DaySteps[];
}

export interface HealthProvider {
  id: HealthSource;
  getStatus(): Promise<HealthStatus>;
  request(): Promise<HealthStatus>;
  readToday(): Promise<HealthSnapshot>;
  openSettings?: () => void;
}

export const emptySnapshot = (source: HealthSource, week: DaySteps[] = []): HealthSnapshot => ({
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
