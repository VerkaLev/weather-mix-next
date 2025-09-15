import { DateTime } from 'luxon';

export default function getCurrentDate(timezone: string) {
  const nowUTC = DateTime.utc();
  const nowTimezone = nowUTC.setZone(timezone);

  const nowTime = nowTimezone.toFormat('HH:mm');
  const nowDateIso = nowTimezone.toFormat('yyyy-MM-dd');
  const lastDateOfWeek = (count: number | undefined) => {
    if (!count) return nowTimezone.toFormat('yyyy-MM-dd');
    return nowTimezone.plus({ days: count - 1 }).toFormat('yyyy-MM-dd');
  };

  return { nowDateIso, nowTime, lastDateOfWeek };
}
