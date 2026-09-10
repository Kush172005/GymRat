import * as SQLite from 'expo-sqlite';

let _db = null;

export function initDatabase() {
  if (_db) return;
  _db = SQLite.openDatabaseSync('gymrat.db');

  _db.execSync('PRAGMA journal_mode = WAL;');
  _db.execSync('PRAGMA foreign_keys = ON;');

  // ── Settings (key/value) ────────────────────────────────────────────────────
  _db.execSync(`
    CREATE TABLE IF NOT EXISTS settings (
      key   TEXT PRIMARY KEY NOT NULL,
      value TEXT NOT NULL
    );
  `);

  // ── Favorites ───────────────────────────────────────────────────────────────
  _db.execSync(`
    CREATE TABLE IF NOT EXISTS favorites (
      exercise_id TEXT PRIMARY KEY NOT NULL,
      data        TEXT    NOT NULL,
      created_at  INTEGER NOT NULL
    );
  `);

  // ── Custom exercises ────────────────────────────────────────────────────────
  _db.execSync(`
    CREATE TABLE IF NOT EXISTS custom_exercises (
      id            TEXT PRIMARY KEY NOT NULL,
      name          TEXT    NOT NULL,
      body_part     TEXT    NOT NULL,
      equipment     TEXT    NOT NULL,
      description   TEXT    NOT NULL DEFAULT '',
      beginner_tips TEXT    NOT NULL DEFAULT '',
      created_at    INTEGER NOT NULL
    );
  `);

  // ── Workout sessions ────────────────────────────────────────────────────────
  _db.execSync(`
    CREATE TABLE IF NOT EXISTS workout_sessions (
      id               TEXT PRIMARY KEY NOT NULL,
      started_at       INTEGER NOT NULL,
      finished_at      INTEGER,
      duration_seconds INTEGER,
      notes            TEXT
    );
  `);

  // ── Exercises within a session ──────────────────────────────────────────────
  _db.execSync(`
    CREATE TABLE IF NOT EXISTS workout_exercises (
      id            TEXT PRIMARY KEY NOT NULL,
      session_id    TEXT    NOT NULL,
      exercise_id   TEXT    NOT NULL,
      exercise_name TEXT    NOT NULL,
      order_index   INTEGER NOT NULL DEFAULT 0,
      FOREIGN KEY (session_id) REFERENCES workout_sessions(id) ON DELETE CASCADE
    );
  `);

  // ── Sets ────────────────────────────────────────────────────────────────────
  _db.execSync(`
    CREATE TABLE IF NOT EXISTS sets (
      id                  TEXT PRIMARY KEY NOT NULL,
      workout_exercise_id TEXT    NOT NULL,
      weight_kg           REAL    NOT NULL DEFAULT 0,
      reps                INTEGER NOT NULL DEFAULT 0,
      completed           INTEGER NOT NULL DEFAULT 0,
      completed_at        INTEGER,
      FOREIGN KEY (workout_exercise_id) REFERENCES workout_exercises(id) ON DELETE CASCADE
    );
  `);

  _db.execSync(`
    CREATE TABLE IF NOT EXISTS daily_steps (
      date  TEXT PRIMARY KEY NOT NULL,
      steps INTEGER NOT NULL DEFAULT 0
    );
  `);

  _db.execSync(`
    CREATE TABLE IF NOT EXISTS food_logs (
      id         TEXT PRIMARY KEY NOT NULL,
      date       TEXT    NOT NULL,
      food_id    TEXT    NOT NULL,
      name       TEXT    NOT NULL,
      servings   REAL    NOT NULL DEFAULT 1,
      protein_g  REAL    NOT NULL,
      carbs_g    REAL    NOT NULL,
      fat_g      REAL    NOT NULL,
      kcal       REAL    NOT NULL,
      created_at INTEGER NOT NULL
    );
  `);

  _db.execSync(`
    CREATE TABLE IF NOT EXISTS water_logs (
      date TEXT PRIMARY KEY NOT NULL,
      ml   INTEGER NOT NULL DEFAULT 0
    );
  `);

  _db.execSync(`
    CREATE TABLE IF NOT EXISTS health_daily (
      date        TEXT PRIMARY KEY NOT NULL,
      steps       INTEGER NOT NULL DEFAULT 0,
      calories    REAL,
      distance_m  REAL,
      sleep_min   INTEGER,
      weight_kg   REAL,
      heart_rate  INTEGER,
      workouts    INTEGER,
      elevation_m REAL,
      source      TEXT,
      updated_at  INTEGER NOT NULL
    );
  `);
}

export function getDb() {
  if (!_db) throw new Error('DB not initialised – call initDatabase() first.');
  return _db;
}
