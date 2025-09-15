'use client';

import { useContext } from 'react';
import { useHourlyPagination } from './useHourlyPagination';
import getAverageHourlyWeather from './getAverageHourlyWeather';
import { HourlyTemperaturePropsType } from '@/Types';
import BtnPagination from '../BtnPagination';
import HourlyContainer from './Components/HourlyContainer';
import { WeatherParamsContext } from '@/Context/WeatherParamsContext';
import { DateContext } from '@/Context/DateContext';

export default function HourlyForecast({
  dataHourlyWeather,
}: HourlyTemperaturePropsType) {
  const { sunset, sunrise, timezone } = useContext(WeatherParamsContext);
  const { selectedDate, setSelectedHour } = useContext(DateContext);

  const averageHourlyWeather = getAverageHourlyWeather({
    dataHourlyWeather,
    sunset,
    sunrise,
    timezone,
  });
  const {
    actualData,
    handleShowPrevTimeClick,
    handleShowNextTimeClick,
    isShowBtnPrevTemp,
    isShowBtnNextTemp,
    handleSelectHourClick,
    currentTime,
  } = useHourlyPagination({
    timezone,
    selectedDate,
    averageHourlyWeather,
    setSelectedHour,
  });

  return (
    <>
      <div className='hidden lg:block'>
        <div className='flex justify-center items-center'>
          <BtnPagination
            handleShowClick={handleShowPrevTimeClick}
            isShowBtn={isShowBtnPrevTemp}
            direction='prev'
          />
          <div
            style={{ boxShadow: '10px 10px 8px rgba(0, 0, 0, 0.1)' }}
            className='grid grid-cols-7 w-[800px] h-[100px] bg-[var(--bg-color)]'
          >
            <HourlyContainer
              actualData={actualData}
              currentTime={currentTime}
              handleSelectHourClick={handleSelectHourClick}
            />
          </div>

          <BtnPagination
            handleShowClick={handleShowNextTimeClick}
            isShowBtn={isShowBtnNextTemp}
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
            <HourlyContainer
              actualData={averageHourlyWeather}
              currentTime={currentTime}
              handleSelectHourClick={handleSelectHourClick}
            />
          </div>
        </div>
      </div>
    </>
  );
}
