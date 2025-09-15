'use client';

import { useContext, useMemo } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { DateTime } from 'luxon';
import tz_lookup from 'tz-lookup';
import { useParams, useSearchParams } from 'next/navigation';
import useCurrentDate from '@/hooks/useCurrentDate';
import { getLocaleFormat } from './getLocaleFormat';
import { valenciaInfo } from '@/consts';
import { DateContext } from '@/Context/DateContext';

export default function MyDatePicker() {
  const searchParams = useSearchParams();
  const params = useParams();
  const lat = searchParams.get('lat');
  const lon = searchParams.get('lon');
  const { setSelectedDate } = useContext(DateContext);
  const locale = Array.isArray(params.locale)
    ? params.locale[0]
    : params.locale ?? 'es';

  const timezone = useMemo(() => {
    const latFin = lat ? parseFloat(lat) : valenciaInfo.lat;
    const lonFin = lon ? parseFloat(lon) : valenciaInfo.lon;
    return tz_lookup(latFin, lonFin);
  }, [lat, lon]);

  const { currentDate, lastAvailablelDate } = useCurrentDate(timezone);

  const handleChange = (date: Date | null) => {
    date &&
      setSelectedDate(
        DateTime.fromJSDate(date).setZone(timezone).toFormat('yyyy-MM-dd')
      );
  };

  const { currentLocale, currentFormat } = getLocaleFormat(locale);

  return (
    <DatePicker
      className='focus:outline-none'
      dateFormat={currentFormat}
      selected={new Date(currentDate)}
      maxDate={new Date(lastAvailablelDate)}
      minDate={new Date(currentDate)}
      locale={currentLocale}
      onChange={handleChange}
    />
  );
}
