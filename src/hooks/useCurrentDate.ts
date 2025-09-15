'use client';

import { DateTime } from 'luxon';
import { useContext, useEffect, useState } from 'react';
import getCurrentDate from '@/helpers/getCurrentDate';
import { DateContext } from '@/Context/DateContext';

export default function useCurrentDate(timezone: string) {
  const { countAvailableDates } = useContext(DateContext);
  const { nowDateIso, lastDateOfWeek } = getCurrentDate(timezone);

  const [currentDate, setCurrentDate] = useState(nowDateIso);
  const [lastAvailablelDate, setLastAvailablelDate] = useState(
    lastDateOfWeek(countAvailableDates)
  );

  useEffect(() => {
    setLastAvailablelDate(lastDateOfWeek(countAvailableDates));
  }, [countAvailableDates]);

  useEffect(() => {
    if (!timezone) return;

    const updateDates = () => {
      const { nowDateIso, lastDateOfWeek } = getCurrentDate(timezone);
      setCurrentDate(nowDateIso);
      setLastAvailablelDate(lastDateOfWeek(countAvailableDates));
    };

    updateDates();
    const now = DateTime.now().setZone(timezone);

    let intervalId: NodeJS.Timeout;

    const remainingTime =
      24 * 60 * 60 * 1000 -
      now.hour * 60 * 60 * 1000 -
      now.minute * 60 * 1000 -
      now.second * 1000 -
      now.millisecond;

    const timeoutId = setTimeout(() => {
      const { nowDateIso, lastDateOfWeek } = getCurrentDate(timezone);
      setCurrentDate(nowDateIso);
      setLastAvailablelDate(lastDateOfWeek(countAvailableDates));

      intervalId = setInterval(() => {
        const { nowDateIso, lastDateOfWeek } = getCurrentDate(timezone);
        setCurrentDate(nowDateIso);
        setLastAvailablelDate(lastDateOfWeek(countAvailableDates));
      }, 24 * 60 * 60 * 1000);
    }, remainingTime);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [timezone]);

  return { currentDate, lastAvailablelDate };
}
