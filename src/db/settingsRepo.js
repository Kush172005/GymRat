import { getDb } from './client';

const DEFAULTS = {
  units: 'kg',
  theme_mode: 'system',
  onboarding_done: 'false',
};

export const settingsRepo = {
  get(key) {
    const db = getDb();
    const row = db.getFirstSync(
      'SELECT value FROM settings WHERE key = ?',
      [key],
    );
    return row?.value ?? DEFAULTS[key] ?? '';
  },

  set(key, value) {
    const db = getDb();
    db.runSync(
      'INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)',
      [key, value],
    );
  },

  getAll() {
    const db = getDb();
    const rows = db.getAllSync('SELECT key, value FROM settings');
    const result = { ...DEFAULTS };
    for (const row of rows) result[row.key] = row.value;
    return result;
  },

  // ── Convenience helpers ──────────────────────────────────────────────────────
  getUnits() {
    return this.get('units') === 'lb' ? 'lb' : 'kg';
  },

  getThemeMode() {
    const v = this.get('theme_mode');
    if (v === 'dark' || v === 'light') return v;
    return 'system';
  },

  isOnboardingDone() {
    return this.get('onboarding_done') === 'true';
  },

  setOnboardingDone() {
    this.set('onboarding_done', 'true');
  },

  clearAll() {
    const db = getDb();
    // Preserve onboarding state on full data-clear; only wipe user data keys.
    db.runSync(
      `DELETE FROM settings WHERE key NOT IN ('onboarding_done', 'theme_mode', 'units')`,
    );
  },
};
