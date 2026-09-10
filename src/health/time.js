import { toDateKey } from '../utils/date';

export function dayBounds(offsetDays, now = new Date()) {
  const start = new Date(now);
  start.setHours(0, 0, 0, 0);
  start.setDate(start.getDate() - offsetDays);
  const end = new Date(start);
  end.setDate(end.getDate() + 1);
  const rangeEnd = end > now && offsetDays === 0 ? now : end;
  return { start, end: rangeEnd, key: toDateKey(start) };
}

export function iso(d) {
  return d.toISOString();
}
