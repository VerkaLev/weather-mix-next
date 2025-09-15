'use client';

import { useTranslations } from 'next-intl';
import { useContext, useEffect, useState } from 'react';
import { WeatherDataContainerType } from '@/Types';
import { useDataWeather } from '@/Components/WeatherDataContainer/useDataWeather';
import { getRemainingTimeBeforeMidnight } from '@/Components/WeatherDataContainer/getRemainingTimeBeforeMidnight';
import MainHeader from '../MainHeader';
import MainInfoWeather from '../MainInfoWeather';
import WeatherForecast from '../WeatherForecast';
import { WeatherParamsContext } from '@/Context/WeatherParamsContext';
import { DateContext } from '@/Context/DateContext';

export default function WeatherDataContainer({
  initialDataCurrentWeather,
  initialDataWeeklyWeather,
  initialDataHourlyWeather,
  timezone,
  lat,
  lon,
  sunset,
  sunrise,
}: WeatherDataContainerType) {
  const [weatherData, setWeatherData] = useState({
    current: initialDataCurrentWeather,
    weekly: initialDataWeeklyWeather,
    hourly: initialDataHourlyWeather,
  });

  const tMainHeader = useTranslations('MainHeader');

  const { setSunset, setSunrise, setTimezone } =
    useContext(WeatherParamsContext);

  const { selectedDate, selectedHour } = useContext(DateContext);

  const { dataWeather, dataFilteredHourlyWeather } = useDataWeather({
    selectedDate,
    selectedHour,
    timezone,
    dataCurrentWeather: weatherData.current,
    dataWeeklyWeather: weatherData.weekly,
    dataHourlyWeather: weatherData.hourly,
  });

  useEffect(() => {
    setTimezone(timezone);
    setSunrise(sunrise);
    setSunset(sunset);
  }, [timezone, sunrise, sunset]);

  useEffect(() => {
    const fetchWeather = async (type: 'current' | 'full') => {
      const url =
        type === 'current'
          ? `/api/getCurrent?lat=${lat}&lon=${lon}`
          : `/api/getWeather?lat=${lat}&lon=${lon}`;

      const res = await fetch(url);
      if (!res.ok) throw new Error(`Ошибка запроса: ${res.status}`);
      const data = await res.json();

      if (type === 'current') {
        setWeatherData((prev) => ({
          ...prev,
          current: data.dataCurrentWeather,
        }));
      } else {
        setWeatherData({
          current: data.dataCurrentWeather,
          weekly: data.dataWeeklyWeather,
          hourly: data.dataHourlyWeather,
        });
      }
    };

    fetchWeather('full');

    let intervalId: ReturnType<typeof setInterval>;

    const timerMidnightId = setTimeout(() => {
      fetchWeather('full');
      intervalId = setInterval(() => fetchWeather('full'), 6 * 60 * 60 * 1000);
    }, getRemainingTimeBeforeMidnight(timezone));

    const intervalCurrentId = setInterval(
      () => fetchWeather('current'),
      5 * 60 * 1000
    );

    return () => {
      clearTimeout(timerMidnightId);
      clearInterval(intervalCurrentId);
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  return (
    <div className='grid grid-cols-1 sm:grid-cols-6 lg:grid-cols-9 xl:grid-cols-11 items-center justify-items-center mt-[50px]'>
      <MainHeader t={tMainHeader} />
      <MainInfoWeather dataWeather={dataWeather} />
      <WeatherForecast
        dataWeeklyWeather={weatherData.weekly}
        dataHourlyWeather={dataFilteredHourlyWeather}
      />
    </div>
  );
}
