import { DateTime } from 'luxon';
import { GetFormattedHourType } from '@/Types';

export const getFormattedHour = ({
  initialHour,
  lang,
  numMinutes,
}: GetFormattedHourType): string => {
  const isShortMinutes = numMinutes === '2-digit';
  const date = DateTime.fromISO(`1970-01-01T${initialHour}`);
  const formattedHour = date.toJSDate().toLocaleTimeString(lang, {
    hour: 'numeric',
    minute: isShortMinutes ? '2-digit' : undefined,
  });
  return formattedHour;
};
