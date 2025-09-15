'use client';

import { useEffect, useState } from 'react';
import { DateTime } from 'luxon';

export default function useCurrentHour(timezone: string | undefined) {
  const getNow = () =>
    timezone ? DateTime.now().setZone(timezone) : DateTime.now();
  const getCurrentHour = () => {
    return getNow().toFormat('HH:mm');
  };

  const [time, setTime] = useState(getCurrentHour);

  useEffect(() => {
    const now = getNow();
    const updateTime = () => setTime(getCurrentHour());
    updateTime();
    const millisecondsUntilNextHour =
      (60 - now.minute) * 60 * 1000 - now.second * 1000 - now.millisecond;

    let intervalId: NodeJS.Timeout;

    const timeoutId = setTimeout(() => {
      updateTime();

      intervalId = setInterval(updateTime, 60 * 60 * 1000);
    }, millisecondsUntilNextHour);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [timezone]);

  return time;
}
