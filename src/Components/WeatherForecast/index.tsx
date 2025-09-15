'use client';

import { useContext, useEffect, useState } from 'react';
import { WeatherForecastPropsType } from '@/Types';
import HourlyForecast from '../HourlyForecast';
import WeeklyForecast from '../WeeklyForecast';
import BtnShowHourly from './Components/BtnShowHourly';
import BtnShowWeekly from './Components/BtnShowWeekly';
import { BgContext } from '@/Context/BgContext';
import { DateContext } from '@/Context/DateContext';

export default function WeatherForecast({
  dataWeeklyWeather,
  dataHourlyWeather,
}: WeatherForecastPropsType) {
  const { bg } = useContext(BgContext);
  const { setCountAvailableDates } = useContext(DateContext);

  const maxLength = Math.max(
    ...Object.values(dataWeeklyWeather).map((arr) => arr?.length || 0)
  );

  const [isActive, setIsActive] = useState(true);
  const handleIsActiveClick = () => setIsActive((prev) => !prev);

  const containerClass = `my-10 text-[1.2rem] ${
    bg === 'rain-day' && 'text-gray-200'
  }`;

  useEffect(() => {
    setCountAvailableDates(maxLength);
  }, [maxLength]);

  return (
    <>
      <div
        className={`${containerClass} col-span-1 sm:row-start-4 sm:col-span-6 lg:col-span-3 lg:col-start-2 lg:row-start-2 xl:col-span-3 xl:col-start-3 lg:justify-self-end`}
      >
        <BtnShowHourly
          isActive={isActive}
          handleIsActiveClick={handleIsActiveClick}
        />
      </div>
      <div
        className={`${containerClass} col-span-1 row-start-6 sm:row-start-6 sm:col-span-6 lg:col-span-3 lg:col-start-6 lg:row-start-2 xl:col-start-7 xl:col-span-3 xl:row-start-2 lg:justify-self-start`}
      >
        <BtnShowWeekly
          maxLength={maxLength}
          isActive={!isActive}
          handleIsActiveClick={handleIsActiveClick}
        />
      </div>

      <div className='block lg:hidden sm:row-start-5 sm:col-span-6 lg:col-span-9 lg:row-start-3'>
        <HourlyForecast dataHourlyWeather={dataHourlyWeather} />
      </div>
      <div className='block lg:hidden sm:row-start-7 sm:col-span-6 lg:col-span-9 lg:row-start-5 mb-10'>
        <WeeklyForecast dataWeeklyWeather={dataWeeklyWeather} />
      </div>

      <div className='hidden lg:block lg:col-span-9 xl:col-span-11'>
        {isActive ? (
          <HourlyForecast dataHourlyWeather={dataHourlyWeather} />
        ) : (
          <WeeklyForecast dataWeeklyWeather={dataWeeklyWeather} />
        )}
      </div>
    </>
  );
}
