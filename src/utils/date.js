/** Returns YYYY-MM-DD for any Date */
export function toDateKey(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/** Today as YYYY-MM-DD */
export function todayKey() {
  return toDateKey(new Date());
}

export function getLastNDateKeys(n) {
  const keys = [];
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    keys.push(toDateKey(d));
  }
  return keys;
}

/**
 * Returns the last 7 date keys (oldest → newest, today is last).
 * Each entry is a YYYY-MM-DD string.
 */
export function getLast7DateKeys() {
  return getLastNDateKeys(7);
}

/** Short weekday label from a YYYY-MM-DD key */
export function dayLabel(dateKey) {
  if (dateKey === todayKey()) return 'Today';
  const [y, m, d] = dateKey.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString(undefined, { weekday: 'short' });
}

export function formatDate(ts) {
  return new Date(ts).toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}

export function formatTime(ts) {
  return new Date(ts).toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatDateTime(ts) {
  const d = new Date(ts);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  if (d.toDateString() === today.toDateString())
    return `Today · ${formatTime(ts)}`;
  if (d.toDateString() === yesterday.toDateString())
    return `Yesterday · ${formatTime(ts)}`;
  return formatDate(ts);
}

/** e.g. "1h 23m" or "45m" or "30s" */
export function formatDuration(seconds) {
  if (seconds < 60) return `${seconds}s`;
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}
