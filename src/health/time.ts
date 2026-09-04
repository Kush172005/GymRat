import { toDateKey } from '../utils/date';

export function dayBounds(offsetDays: number, now = new Date()): { start: Date; end: Date; key: string } {
  const start = new Date(now);
  start.setHours(0, 0, 0, 0);
  start.setDate(start.getDate() - offsetDays);
  const end = new Date(start);
  end.setDate(end.getDate() + 1);
  const rangeEnd = end > now && offsetDays === 0 ? now : end;
  return { start, end: rangeEnd, key: toDateKey(start) };
}

export function iso(d: Date): string {
  return d.toISOString();
}
