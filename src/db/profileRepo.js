import { getDb } from './client';

const KEY = 'user_profile';

export const profileRepo = {
  get() {
    const raw = getDb().getFirstSync(
      'SELECT value FROM settings WHERE key = ?',
      [KEY],
    );
    if (!raw?.value) return null;
    try {
      return JSON.parse(raw.value);
    } catch {
      return null;
    }
  },

  save(profile) {
    getDb().runSync(
      'INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)',
      [KEY, JSON.stringify(profile)],
    );
  },

  clear() {
    getDb().runSync('DELETE FROM settings WHERE key = ?', [KEY]);
  },
};
