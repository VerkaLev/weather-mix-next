import getCurrentDate from '../../helpers/getCurrentDate';
import {
  DataFilteredHourlyWeatherType,
  GetFilteredHourlyWeatherPropsType,
  DataHourlyCommonApiType,
} from '@/Types';

export const getFilteredHourlyWeather = ({
  obj,
  date,
  timezone,
}: GetFilteredHourlyWeatherPropsType): DataFilteredHourlyWeatherType => {
  const { nowDateIso } = getCurrentDate(timezone);
  const ourDate = date || nowDateIso;
  if (!obj) {
    return {
      dataHourlyWeatherAPI: null,
      dataHourlyTomorrowIo: null,
      dataHourlyOpenWeatherMap: null,
      dataHourlyVisualCrossing: null,
    };
  }

  const dataFilteredHourlyWeather = Object.fromEntries(
    Object.entries(obj).map(([key, value]) => {
      if (value === null) return [key, null];

      const filteredValue = value.find(
        (item: DataHourlyCommonApiType) => item.date === ourDate
      );

      return [key, filteredValue || null];
    })
  ) as DataFilteredHourlyWeatherType;

  return dataFilteredHourlyWeather;
};
