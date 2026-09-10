import { getDb } from './client';
import { generateId } from '../utils/uuid';
import { toDateKey, todayKey, getLast7DateKeys } from '../utils/date';

export const workoutRepo = {
  // Sessions ─────────────────────────────────────────────────────────────────

  createSession() {
    const db = getDb();
    const id = generateId();
    const now = Date.now();
    db.runSync('INSERT INTO workout_sessions (id, started_at) VALUES (?, ?)', [id, now]);
    return { id, started_at: now, finished_at: null, duration_seconds: null, notes: null };
  },

  /**
   * Starts a session pre-filled with a plan's exercise checklist. Each exercise starts
   * unlogged — the user just fills in the weight/reps they actually hit for each one
   * (see logSet), instead of pre-creating empty sets to fill in one by one.
   */
  startFromPlan(exercises) {
    const session = this.createSession();
    exercises.forEach((ex, i) => {
      this.addExercise(session.id, ex.exerciseId, ex.name, i);
    });
    return session;
  },

  getInProgressSession() {
    const db = getDb();
    return (
      db.getFirstSync(
        'SELECT * FROM workout_sessions WHERE finished_at IS NULL ORDER BY started_at DESC LIMIT 1',
      ) ?? null
    );
  },

  finishSession(id) {
    const db = getDb();
    const session = db.getFirstSync(
      'SELECT * FROM workout_sessions WHERE id = ?',
      [id],
    );
    if (!session) return;
    const now = Date.now();
    const dur = Math.round((now - session.started_at) / 1000);
    db.runSync(
      'UPDATE workout_sessions SET finished_at = ?, duration_seconds = ? WHERE id = ?',
      [now, dur, id],
    );
  },

  discardSession(id) {
    getDb().runSync('DELETE FROM workout_sessions WHERE id = ?', [id]);
  },

  getCompletedSessions(limit = 50) {
    const db = getDb();
    return db.getAllSync(
      'SELECT * FROM workout_sessions WHERE finished_at IS NOT NULL ORDER BY started_at DESC LIMIT ?',
      [limit],
    );
  },

  getSessionById(id) {
    return (
      getDb().getFirstSync(
        'SELECT * FROM workout_sessions WHERE id = ?',
        [id],
      ) ?? null
    );
  },

  getFullSession(id) {
    const db = getDb();
    const session = db.getFirstSync(
      'SELECT * FROM workout_sessions WHERE id = ?',
      [id],
    );
    if (!session) return null;

    const exercises = db.getAllSync(
      'SELECT * FROM workout_exercises WHERE session_id = ? ORDER BY order_index',
      [id],
    );

    const fullExercises = exercises.map((ex) => ({
      ...ex,
      sets: db.getAllSync(
        'SELECT * FROM sets WHERE workout_exercise_id = ? ORDER BY rowid',
        [ex.id],
      ),
    }));

    return { ...session, exercises: fullExercises };
  },

  getLastFinishedSession() {
    const db = getDb();
    const session = db.getFirstSync(
      'SELECT * FROM workout_sessions WHERE finished_at IS NOT NULL ORDER BY started_at DESC LIMIT 1',
    );
    return session ? this.getFullSession(session.id) : null;
  },

  deleteSession(id) {
    getDb().runSync('DELETE FROM workout_sessions WHERE id = ?', [id]);
  },

  getSessionCount() {
    const row = getDb().getFirstSync(
      'SELECT COUNT(*) as n FROM workout_sessions WHERE finished_at IS NOT NULL',
    );
    return row?.n ?? 0;
  },

  // Exercises within session ─────────────────────────────────────────────────

  addExercise(sessionId, exerciseId, exerciseName, orderIndex) {
    const db = getDb();
    const id = generateId();
    db.runSync(
      'INSERT INTO workout_exercises (id, session_id, exercise_id, exercise_name, order_index) VALUES (?, ?, ?, ?, ?)',
      [id, sessionId, exerciseId, exerciseName, orderIndex],
    );
    return { id, session_id: sessionId, exercise_id: exerciseId, exercise_name: exerciseName, order_index: orderIndex };
  },

  getExercisesForSession(sessionId) {
    return getDb().getAllSync(
      'SELECT * FROM workout_exercises WHERE session_id = ? ORDER BY order_index',
      [sessionId],
    );
  },

  removeExercise(workoutExerciseId) {
    getDb().runSync('DELETE FROM workout_exercises WHERE id = ?', [workoutExerciseId]);
  },

  // Sets ─────────────────────────────────────────────────────────────────────

  addSet(weId, weightKg, reps) {
    const db = getDb();
    const id = generateId();
    db.runSync(
      'INSERT INTO sets (id, workout_exercise_id, weight_kg, reps) VALUES (?, ?, ?, ?)',
      [id, weId, weightKg, reps],
    );
    return { id, workout_exercise_id: weId, weight_kg: weightKg, reps, completed: 0, completed_at: null };
  },

  updateSet(id, weightKg, reps) {
    getDb().runSync('UPDATE sets SET weight_kg = ?, reps = ? WHERE id = ?', [weightKg, reps, id]);
  },

  /** Returns the new completed state */
  toggleSetComplete(id) {
    const db = getDb();
    const set = db.getFirstSync('SELECT * FROM sets WHERE id = ?', [id]);
    if (!set) return false;
    const next = set.completed === 1 ? 0 : 1;
    db.runSync('UPDATE sets SET completed = ?, completed_at = ? WHERE id = ?', [
      next,
      next === 1 ? Date.now() : null,
      id,
    ]);
    return next === 1;
  },

  /**
   * Simplified logger: one exercise = one best-effort weight × reps entry for the day,
   * always marked done the moment it's logged (there's no partial/incomplete state).
   * Pass the exercise's current set id (if it already has one) to update it in place;
   * omit it to create the exercise's first entry.
   */
  logSet(workoutExerciseId, weightKg, reps, existingSetId) {
    if (existingSetId) {
      this.updateSet(existingSetId, weightKg, reps);
      const db = getDb();
      db.runSync(
        'UPDATE sets SET completed = 1, completed_at = COALESCE(completed_at, ?) WHERE id = ?',
        [Date.now(), existingSetId],
      );
      return {
        id: existingSetId,
        workout_exercise_id: workoutExerciseId,
        weight_kg: weightKg,
        reps,
        completed: 1,
        completed_at: Date.now(),
      };
    }
    const set = this.addSet(workoutExerciseId, weightKg, reps);
    this.toggleSetComplete(set.id);
    return { ...set, completed: 1 };
  },

  // PRs & last weights ───────────────────────────────────────────────────────

  /** Best completed set ever for an exercise (highest weight, then reps) */
  getPR(exerciseId) {
    return (
      getDb().getFirstSync(
        `SELECT s.weight_kg, s.reps
         FROM sets s
         JOIN workout_exercises we ON s.workout_exercise_id = we.id
         JOIN workout_sessions ws  ON we.session_id = ws.id
         WHERE we.exercise_id = ?
           AND ws.finished_at IS NOT NULL
           AND s.completed = 1
         ORDER BY s.weight_kg DESC, s.reps DESC
         LIMIT 1`,
        [exerciseId],
      ) ?? null
    );
  },

  getAllPRs() {
    const rows = getDb().getAllSync(
      `SELECT we.exercise_id, we.exercise_name, s.weight_kg, s.reps
       FROM sets s
       JOIN workout_exercises we ON s.workout_exercise_id = we.id
       JOIN workout_sessions ws  ON we.session_id = ws.id
       WHERE we.exercise_id IS NOT NULL
         AND ws.finished_at IS NOT NULL
         AND s.completed = 1
       ORDER BY we.exercise_name COLLATE NOCASE ASC, s.weight_kg DESC, s.reps DESC`,
    );
    const seen = new Set();
    const prs = [];
    for (const row of rows) {
      if (seen.has(row.exercise_id)) continue;
      seen.add(row.exercise_id);
      prs.push(row);
    }
    return prs;
  },

  getProgressStats() {
    const db = getDb();
    const totalWorkouts = this.getSessionCount();

    const weekStart = new Date();
    weekStart.setHours(0, 0, 0, 0);
    weekStart.setDate(weekStart.getDate() - 6);
    const weekStartMs = weekStart.getTime();

    const weekRow = db.getFirstSync(
      `SELECT
         COUNT(DISTINCT ws.id) as sessions,
         COALESCE(SUM(CASE WHEN s.completed = 1 THEN 1 ELSE 0 END), 0) as sets,
         COALESCE(SUM(CASE WHEN s.completed = 1 THEN s.weight_kg * s.reps ELSE 0 END), 0) as volume
       FROM workout_sessions ws
       LEFT JOIN workout_exercises we ON we.session_id = ws.id
       LEFT JOIN sets s ON s.workout_exercise_id = we.id
       WHERE ws.finished_at IS NOT NULL AND ws.finished_at >= ?`,
      [weekStartMs],
    );
    const durationRow = db.getFirstSync(
      `SELECT COALESCE(SUM(duration_seconds), 0) as duration
       FROM workout_sessions
       WHERE finished_at IS NOT NULL AND finished_at >= ?`,
      [weekStartMs],
    );

    const trainedDates = db.getAllSync(
      `SELECT DISTINCT date(finished_at / 1000, 'unixepoch', 'localtime') as d
       FROM workout_sessions
       WHERE finished_at IS NOT NULL
       ORDER BY d DESC`,
    );
    const trainedSet = new Set(trainedDates.map((r) => r.d));
    const last7Days = getLast7DateKeys().map((date) => ({
      date,
      trained: trainedSet.has(date),
    }));

    let streak = 0;
    const today = todayKey();
    const cursor = new Date();
    if (!trainedSet.has(today)) {
      cursor.setDate(cursor.getDate() - 1);
      if (!trainedSet.has(toDateKey(cursor))) {
        return {
          totalWorkouts,
          streak: 0,
          weekSessions: weekRow?.sessions ?? 0,
          weekSets: weekRow?.sets ?? 0,
          weekVolumeKg: weekRow?.volume ?? 0,
          weekDuration: durationRow?.duration ?? 0,
          last7Days,
        };
      }
    }
    while (trainedSet.has(toDateKey(cursor))) {
      streak += 1;
      cursor.setDate(cursor.getDate() - 1);
    }

    return {
      totalWorkouts,
      streak,
      weekSessions: weekRow?.sessions ?? 0,
      weekSets: weekRow?.sets ?? 0,
      weekVolumeKg: weekRow?.volume ?? 0,
      weekDuration: durationRow?.duration ?? 0,
      last7Days,
    };
  },

  // Export / clear ───────────────────────────────────────────────────────────

  getAllForExport() {
    const db = getDb();
    return {
      sessions: db.getAllSync('SELECT * FROM workout_sessions ORDER BY started_at'),
      exercises: db.getAllSync('SELECT * FROM workout_exercises ORDER BY session_id, order_index'),
      sets: db.getAllSync('SELECT * FROM sets ORDER BY workout_exercise_id'),
    };
  },

  /**
   * Creates a new session pre-filled with the last session's exercise checklist, each
   * one seeded with the weight × reps it was logged at last time — so repeating a
   * workout starts with yesterday's numbers ready to beat instead of a blank slate.
   * Returns null if there is no previous session.
   */
  repeatLastWorkout() {
    const last = this.getLastFinishedSession();
    if (!last || last.exercises.length === 0) return null;

    const newSession = this.createSession();
    for (const ex of last.exercises) {
      const we = this.addExercise(newSession.id, ex.exercise_id, ex.exercise_name, ex.order_index);
      const best = ex.sets
        .filter((s) => s.completed === 1)
        .reduce(
          (a, b) => (!a || b.weight_kg > a.weight_kg || (b.weight_kg === a.weight_kg && b.reps > a.reps) ? b : a),
          null,
        );
      if (best) this.logSet(we.id, best.weight_kg, best.reps);
    }
    return newSession;
  },

  clearAll() {
    const db = getDb();
    // FK cascade handles exercises + sets
    db.runSync('DELETE FROM workout_sessions');
  },
};
