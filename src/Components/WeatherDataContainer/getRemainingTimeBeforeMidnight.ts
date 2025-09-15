import { DateTime } from 'luxon';

export const getRemainingTimeBeforeMidnight = (timezone: string) => {
  const now = DateTime.now().setZone(timezone);
  const midnight = now.plus({ days: 1 }).startOf('day');
  return midnight.toMillis() - now.toMillis();
};
