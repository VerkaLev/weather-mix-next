'use client';

import { useContext } from 'react';
import { useWeeklyPagination } from './useWeeklyPagination';
import getAverageWeeklyWeather from './getAverageWeeklyWeather';
import { WeeklyTemperaturePropsType } from '@/Types';
import WeeklyContainer from './Components/WeeklyContainer';
import BtnPagination from '../BtnPagination';
import { DateContext } from '@/Context/DateContext';
import { WeatherParamsContext } from '@/Context/WeatherParamsContext';

export default function WeeklyForecast({
  dataWeeklyWeather,
}: WeeklyTemperaturePropsType) {
  const { sunset, sunrise, timezone } = useContext(WeatherParamsContext);
  const { setSelectedDate, setSelectedHour } = useContext(DateContext);

  const averageWeeklyWeather = getAverageWeeklyWeather({
    dataWeeklyWeather,
    sunset,
    sunrise,
    timezone,
  });

  const {
    actualData,
    handleShowPrevDateClick,
    handleShowNextDateClick,
    isShowBtnPrevDate,
    isShowBtnNextDate,
    handleSelectDateClick,
    currentDate,
    error,
  } = useWeeklyPagination({
    timezone,
    averageWeeklyWeather,
    setSelectedDate,
    setSelectedHour,
  });

  return (
    <>
      <div className='hidden lg:block'>
        <div className='flex justify-center items-center'>
          <BtnPagination
            handleShowClick={handleShowPrevDateClick}
            isShowBtn={isShowBtnPrevDate}
            direction='prev'
          />
          <div
            style={{ boxShadow: '10px 10px 8px rgba(0, 0, 0, 0.1)' }}
            className='grid grid-cols-7 w-[800px] h-[100px] bg-[var(--bg-color)]'
          >
            <WeeklyContainer
              error={error}
              actualData={actualData}
              currentDate={currentDate}
              handleSelectDayClick={handleSelectDateClick}
            />
          </div>
          <BtnPagination
            handleShowClick={handleShowNextDateClick}
            isShowBtn={isShowBtnNextDate}
            direction='next'
          />
        </div>
      </div>
      <div className='relative lg:hidden w-full'>
        <div className='relative w-screen scroll-container overflow-x-auto overflow-y-hidden scroll-smooth touch-action-pan-x overscroll-contain no-scrollbar'>
          <div
            style={{ boxShadow: '10px 10px 8px rgba(0, 0, 0, 0.1)' }}
            className='flex flex-nowrap gap-10 min-w-max items-center h-[100px] bg-[var(--bg-color)]'
          >
            <WeeklyContainer
              error={error}
              actualData={averageWeeklyWeather}
              currentDate={currentDate}
              handleSelectDayClick={handleSelectDateClick}
            />
          </div>
        </div>
      </div>
    </>
  );
}
