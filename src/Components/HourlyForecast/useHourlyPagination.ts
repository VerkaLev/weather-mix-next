'use client';

import { useEffect, useState } from 'react';
import useCurrentHour from '@/hooks/useCurrentHour';
import { UseHourlyPaginationPropsType } from '@/Types';

export const useHourlyPagination = ({
  timezone,
  selectedDate,
  averageHourlyWeather,
  setSelectedHour,
}: UseHourlyPaginationPropsType) => {
  const time = useCurrentHour(timezone);
  const startTime = selectedDate ? '00:00' : time;

  let indexOfTime = averageHourlyWeather.findIndex(
    (item) => item.time > startTime
  );
  if (indexOfTime === -1) {
    indexOfTime = averageHourlyWeather.length - 1;
  } else {
    indexOfTime -= 1;
  }

  const getStartIndex = () => {
    const ininitalStartIndex =
      averageHourlyWeather.length - 7 > indexOfTime
        ? indexOfTime
        : averageHourlyWeather.length - 7;

    return ininitalStartIndex;
  };

  const [startIndex, setStartIndex] = useState(getStartIndex());

  const actualData =
    averageHourlyWeather.slice(startIndex, startIndex + 7) || [];

  const currentTime = averageHourlyWeather[indexOfTime].time;

  const handleShowPrevTimeClick = () => {
    setStartIndex((prev) => Math.max(prev - 7, 0));
  };

  const handleShowNextTimeClick = () => {
    setStartIndex((prev) =>
      Math.min(prev + 7, averageHourlyWeather.length - 7)
    );
  };

  const isShowBtnPrevTemp = startIndex > 0;
  const isShowBtnNextTemp = startIndex < averageHourlyWeather.length - 7;

  const handleSelectHourClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    const selectedHour = target.id;

    setSelectedHour(selectedHour);
  };

  useEffect(() => {
    setStartIndex(getStartIndex());
  }, [startTime]);

  return {
    actualData,
    handleShowPrevTimeClick,
    handleShowNextTimeClick,
    isShowBtnPrevTemp,
    isShowBtnNextTemp,
    handleSelectHourClick,
    currentTime,
  };
};
