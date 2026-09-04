import { getDb } from './client';
import { ThemeMode } from '../theme/ThemeContext';

const DEFAULTS: Record<string, string> = {
  units: 'kg',
  rest_default: '90',
  theme_mode: 'system',
  onboarding_done: 'false',
};

export const settingsRepo = {
  get(key: string): string {
    const db = getDb();
    const row = db.getFirstSync<{ value: string }>(
      'SELECT value FROM settings WHERE key = ?',
      [key],
    );
    return row?.value ?? DEFAULTS[key] ?? '';
  },

  set(key: string, value: string): void {
    const db = getDb();
    db.runSync(
      'INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)',
      [key, value],
    );
  },

  getAll(): Record<string, string> {
    const db = getDb();
    const rows = db.getAllSync<{ key: string; value: string }>(
      'SELECT key, value FROM settings',
    );
    const result: Record<string, string> = { ...DEFAULTS };
    for (const row of rows) result[row.key] = row.value;
    return result;
  },

  // ── Typed helpers ────────────────────────────────────────────────────────────
  getUnits(): 'kg' | 'lb' {
    return this.get('units') === 'lb' ? 'lb' : 'kg';
  },

  getThemeMode(): ThemeMode {
    const v = this.get('theme_mode');
    if (v === 'dark' || v === 'light') return v;
    return 'system';
  },

  isOnboardingDone(): boolean {
    return this.get('onboarding_done') === 'true';
  },

  setOnboardingDone(): void {
    this.set('onboarding_done', 'true');
  },

  clearAll(): void {
    const db = getDb();
    // Preserve onboarding state on full data-clear; only wipe user data keys.
    db.runSync(
      `DELETE FROM settings WHERE key NOT IN ('onboarding_done', 'theme_mode', 'units', 'rest_default')`,
    );
  },
};
