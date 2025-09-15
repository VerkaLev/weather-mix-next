import { DateTime } from 'luxon';
import { GetFormattedDateType } from '@/Types';

export const getFormattedDate = ({
  initialDate,
  lang,
}: GetFormattedDateType) => {
  const date = DateTime.fromISO(initialDate);
  const dayOfMonth = date.day;
  const weekDay = date.setLocale(lang).toFormat('ccc');
  const formattedDate =
    weekDay.charAt(0).toUpperCase() + weekDay.slice(1) + ' ' + dayOfMonth;

  return { formattedDate };
};
