'use client';

import { useMemo } from 'react';
import { roundedValue } from '@/Utils/math';
import {
  DataWeatherType,
  UseWeatherPropsType,
  UseWeatherSourceIndicatorsResultType,
  WeatherIndicatorsType,
} from '@/Types';
import { useTranslations } from 'next-intl';

export const useWeatherSourceIndicators = ({
  dataWeather,
}: UseWeatherPropsType): UseWeatherSourceIndicatorsResultType => {
  const t = useTranslations('DataSource');

  const getDataWeatherAPI = (): DataWeatherType => {
    if (!dataWeather) return null;
    if (
      'dataCurrentWeatherAPI' in dataWeather &&
      dataWeather.dataCurrentWeatherAPI
    )
      return dataWeather.dataCurrentWeatherAPI;
    if (
      'dataWeeklyWeatherAPI' in dataWeather &&
      dataWeather.dataWeeklyWeatherAPI
    )
      return dataWeather.dataWeeklyWeatherAPI;
    if (
      'dataHourlyWeatherAPI' in dataWeather &&
      dataWeather.dataHourlyWeatherAPI
    )
      return dataWeather.dataHourlyWeatherAPI;

    return null;
  };

  const getDataWeatherbit = (): DataWeatherType => {
    if (
      dataWeather &&
      'dataCurrentWeatherbit' in dataWeather &&
      dataWeather.dataCurrentWeatherbit
    )
      return dataWeather.dataCurrentWeatherbit;
    if (
      dataWeather &&
      'dataWeeklyWeatherbit' in dataWeather &&
      dataWeather.dataWeeklyWeatherbit
    )
      return dataWeather.dataWeeklyWeatherbit;
    return null;
  };

  const getDataTomorrowIo = (): DataWeatherType => {
    if (!dataWeather) return null;
    if (
      'dataCurrentTomorrowIo' in dataWeather &&
      dataWeather.dataCurrentTomorrowIo
    )
      return dataWeather.dataCurrentTomorrowIo;
    if (
      'dataWeeklyTomorrowIo' in dataWeather &&
      dataWeather.dataWeeklyTomorrowIo
    )
      return dataWeather.dataWeeklyTomorrowIo;
    if (
      'dataHourlyTomorrowIo' in dataWeather &&
      dataWeather.dataHourlyTomorrowIo
    )
      return dataWeather.dataHourlyTomorrowIo;
    return null;
  };

  const getDataOpenWeatherMap = (): DataWeatherType => {
    if (!dataWeather) return null;
    if (
      'dataCurrentOpenWeatherMap' in dataWeather &&
      dataWeather.dataCurrentOpenWeatherMap
    )
      return dataWeather.dataCurrentOpenWeatherMap;
    if (
      'dataHourlyOpenWeatherMap' in dataWeather &&
      dataWeather.dataHourlyOpenWeatherMap
    )
      return dataWeather.dataHourlyOpenWeatherMap;

    return null;
  };

  const getDataVisualCrossing = (): DataWeatherType => {
    if (!dataWeather) return null;
    if (
      'dataCurrentVisualCrossing' in dataWeather &&
      dataWeather.dataCurrentVisualCrossing
    )
      return dataWeather.dataCurrentVisualCrossing;
    if (
      'dataWeeklyVisualCrossing' in dataWeather &&
      dataWeather.dataWeeklyVisualCrossing
    )
      return dataWeather.dataWeeklyVisualCrossing;
    if (
      'dataHourlyVisualCrossing' in dataWeather &&
      dataWeather.dataHourlyVisualCrossing
    )
      return dataWeather.dataHourlyVisualCrossing;

    return null;
  };

  const dataWeatherAPI = useMemo(() => getDataWeatherAPI(), [dataWeather]);
  const dataWeatherbit = useMemo(() => getDataWeatherbit(), [dataWeather]);
  const dataTomorrowIo = useMemo(() => getDataTomorrowIo(), [dataWeather]);
  const dataOpenWeatherMap = useMemo(
    () => getDataOpenWeatherMap(),
    [dataWeather]
  );
  const dataVisualCrossing = useMemo(
    () => getDataVisualCrossing(),
    [dataWeather]
  );

  const getTempFromSource = (source: DataWeatherType): string => {
    if (!source) return '?';
    if ('temp' in source) return roundedValue(source.temp) + '℃';
    return '? ℃';
  };

  const getWindFromSource = (source: DataWeatherType): string => {
    if (!source) return '?';
    if ('wind' in source) return roundedValue(source.wind) + ' ' + t('speed');

    return '?' + t('speed');
  };

  const getHumidityFromSource = (source: DataWeatherType): string => {
    if (!source) return '?';
    if ('humidity' in source) return roundedValue(source.humidity) + '%';
    return '? %';
  };

  const getPressureFromSource = (source: DataWeatherType): string => {
    if (!source) return '?';
    if ('pressure' in source && source.pressure !== null)
      return roundedValue(source.pressure) + ' ' + t('mm');
    return '? ' + t('mm');
  };

  const getUVFromSource = (source: DataWeatherType): string => {
    if (!source) return '?';
    if ('uv' in source && source.uv !== null)
      return roundedValue(source.uv) + '';
    return '?';
  };

  const getCodeFromSource = (source: DataWeatherType): number | string => {
    if (!source) return 0;
    if ('code' in source) return source.code;
    return 0;
  };

  const getIndicators = (id: string): WeatherIndicatorsType => {
    let source;

    if (id.includes('WeatherAPI')) {
      source = dataWeatherAPI;
    } else if (id.includes('Weatherbit')) {
      source = dataWeatherbit;
    } else if (id.includes('TomorrowIo')) {
      source = dataTomorrowIo;
    } else if (id.includes('OpenWeatherMap')) {
      source = dataOpenWeatherMap;
    } else if (id.includes('VisualCrossing')) {
      source = dataVisualCrossing;
    }

    if (!source)
      return {
        temp: '?',
        wind: '?',
        humidity: '?',
        pressure: '?',
        uv: '?',
        code: 0,
      };

    return {
      temp: getTempFromSource(source),
      wind: getWindFromSource(source),
      humidity: getHumidityFromSource(source),
      pressure: getPressureFromSource(source),
      uv: getUVFromSource(source),
      code: getCodeFromSource(source),
    };
  };

  return {
    getIndicators,
    dataWeatherAPI,
    dataWeatherbit,
    dataTomorrowIo,
    dataOpenWeatherMap,
    dataVisualCrossing,
  };
};
