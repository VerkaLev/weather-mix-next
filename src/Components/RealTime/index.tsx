'use client';

import { useEffect, useState } from 'react';
import { DateTime } from 'luxon';
import { RealTimePropsType } from '@/Types';

export default function RealTime({ timezone }: RealTimePropsType) {
  const [time, setTime] = useState<string | null>(null);
  const [isShowColon, setIsShowColon] = useState<boolean>(true);

  useEffect(() => {
    setTime(DateTime.now().setZone(timezone).toFormat('HH:mm'));

    const intervalId = setInterval(() => {
      setTime(DateTime.now().setZone(timezone).toFormat('HH:mm'));
      setIsShowColon((prev) => !prev);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timezone]);

  if (!time) {
    return <div>--:--</div>;
  }

  const roundedNowHours = time.slice(0, 2);
  const roundedNowSeconds = time.slice(3, 5);
  const colon = isShowColon ? ':' : ' ';
  return (
    <div>
      {roundedNowHours}
      <span className='mx-[5px]'>{colon}</span>
      {roundedNowSeconds}
    </div>
  );
}
