import { getDb } from './client';
import { UserProfile } from '../domain/profile';

const KEY = 'user_profile';

export const profileRepo = {
  get(): UserProfile | null {
    const raw = getDb().getFirstSync<{ value: string }>(
      'SELECT value FROM settings WHERE key = ?',
      [KEY],
    );
    if (!raw?.value) return null;
    try {
      return JSON.parse(raw.value) as UserProfile;
    } catch {
      return null;
    }
  },

  save(profile: UserProfile): void {
    getDb().runSync(
      'INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)',
      [KEY, JSON.stringify(profile)],
    );
  },

  clear(): void {
    getDb().runSync('DELETE FROM settings WHERE key = ?', [KEY]);
  },
};
