'use client';

import { useEffect, useState } from 'react';
import { UseWeeklyPaginationPropsType } from '@/Types';
import useCurrentDate from '@/hooks/useCurrentDate';

export const useWeeklyPagination = ({
  timezone,
  averageWeeklyWeather,
  setSelectedDate,
  setSelectedHour,
}: UseWeeklyPaginationPropsType) => {
  if (!averageWeeklyWeather || averageWeeklyWeather.length === 0) {
    return {
      actualData: [],
      currentDate: '',
      error: 'noData',
      handleShowPrevDateClick: () => {},
      handleShowNextDateClick: () => {},
      isShowBtnPrevDate: false,
      isShowBtnNextDate: false,
      handleSelectDateClick: () => {},
    };
  }

  const { currentDate } = useCurrentDate(timezone);

  let indexOfDate = averageWeeklyWeather.findIndex(
    (item) => item.date === currentDate
  );

  const getStartIndex = () => {
    const ininitalStartIndex =
      averageWeeklyWeather.length - 7 > indexOfDate
        ? indexOfDate
        : averageWeeklyWeather.length - 7;

    return ininitalStartIndex;
  };

  const [startIndex, setStartIndex] = useState(getStartIndex());

  const actualData =
    averageWeeklyWeather.slice(startIndex, startIndex + 7) || [];

  const handleShowPrevDateClick = () => {
    setStartIndex((prev) => Math.max(prev - 7, 0));
  };

  const handleShowNextDateClick = () => {
    setStartIndex((prev) =>
      Math.min(prev + 7, averageWeeklyWeather.length - 7)
    );
  };

  const isShowBtnPrevDate = startIndex > 0;
  const isShowBtnNextDate = startIndex < averageWeeklyWeather.length - 7;

  const handleSelectDateClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    const selectedDate = target.id;
    setSelectedDate(selectedDate);
    setSelectedHour(null);
  };

  useEffect(() => {
    setStartIndex(getStartIndex());
  }, [currentDate]);

  return {
    actualData,
    handleShowPrevDateClick,
    handleShowNextDateClick,
    isShowBtnPrevDate,
    isShowBtnNextDate,
    handleSelectDateClick,
    currentDate,
  };
};
