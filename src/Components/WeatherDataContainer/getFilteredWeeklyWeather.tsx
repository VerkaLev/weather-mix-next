import {
  DataFilteredWeeklyWeatherType,
  DataWeeklyCommonApiType,
  GetFilteredWeeklyWeatherPropsType,
} from '@/Types';
import getCurrentDate from '../../helpers/getCurrentDate';

export const getFilteredWeeklyWeather = ({
  obj,
  date,
  timezone,
}: GetFilteredWeeklyWeatherPropsType): DataFilteredWeeklyWeatherType => {
  const { nowDateIso } = getCurrentDate(timezone);
  const ourDate = date || nowDateIso;
  if (!obj) {
    return {
      dataWeeklyWeatherAPI: null,
      dataWeeklyWeatherbit: null,
      dataWeeklyTomorrowIo: null,
      dataWeeklyVisualCrossing: null,
    };
  }

  const dataFilteredWeeklyWeather = Object.fromEntries(
    Object.entries(obj).map(([key, value]) => {
      if (value === null) return [key, null];

      const filteredItem = value.find(
        (item: DataWeeklyCommonApiType) => item.date === ourDate
      );

      return [key, filteredItem || null];
    })
  ) as DataFilteredWeeklyWeatherType;

  return dataFilteredWeeklyWeather;
};
