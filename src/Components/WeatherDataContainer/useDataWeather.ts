'use client';

import { useMemo } from 'react';
import { getFilteredByHourSelectedWeather } from '@/Components/WeatherDataContainer/getFilteredByHourSelectedWeather ';
import { getFilteredHourlyWeather } from '@/Components/WeatherDataContainer/getFilteredHourlyWeather ';
import { getFilteredWeeklyWeather } from '@/Components/WeatherDataContainer/getFilteredWeeklyWeather';
import { UseDataWeatherType } from '@/Types';

export const useDataWeather = ({
  dataCurrentWeather,
  dataWeeklyWeather,
  dataHourlyWeather,
  timezone,
  selectedDate,
  selectedHour,
}: UseDataWeatherType) => {
  const dataFilteredHourlyWeather = getFilteredHourlyWeather({
    obj: dataHourlyWeather,
    date: selectedDate,
    timezone,
  });
  const dataFilteredByHourWeather = useMemo(() => {
    return getFilteredByHourSelectedWeather({
      obj: dataFilteredHourlyWeather,
      hour: selectedHour,
    });
  }, [dataFilteredHourlyWeather, selectedHour]);

  const dataFilteredWeeklyWeather = useMemo(() => {
    return getFilteredWeeklyWeather({
      obj: dataWeeklyWeather,
      date: selectedDate,
      timezone,
    });
  }, [dataWeeklyWeather, selectedDate]);

  const dataWeather = useMemo(() => {
    return selectedDate && selectedHour
      ? dataFilteredByHourWeather
      : selectedDate
      ? dataFilteredWeeklyWeather
      : selectedHour
      ? dataFilteredByHourWeather
      : dataCurrentWeather;
  }, [
    selectedDate,
    selectedHour,
    dataFilteredWeeklyWeather,
    dataCurrentWeather,
    dataFilteredByHourWeather,
  ]);

  return { dataWeather, dataFilteredHourlyWeather };
};
