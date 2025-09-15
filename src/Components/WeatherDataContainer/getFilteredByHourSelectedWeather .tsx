import {
  DataFilteredByHourWeatherType,
  DataHourApiType,
  GetFilteredByHourSelectedWeatherType,
} from '@/Types';

export const getFilteredByHourSelectedWeather = ({
  obj,
  hour,
}: GetFilteredByHourSelectedWeatherType): DataFilteredByHourWeatherType => {
  if (!obj || !hour) {
    return {
      dataHourlyWeatherAPI: null,
      dataHourlyTomorrowIo: null,
      dataHourlyOpenWeatherMap: null,
      dataHourlyVisualCrossing: null,
    };
  }

  const dataFilteredByHourSelectedWeather = Object.fromEntries(
    Object.entries(obj).map(([key, value]) => {
      if (value === null) return [key, null];

      const filteredValue = value.hours.find(
        (item: DataHourApiType) => item.time === hour
      );

      return [key, filteredValue || null];
    })
  ) as DataFilteredByHourWeatherType;

  return dataFilteredByHourSelectedWeather;
};
