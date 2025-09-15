import {
  DataWeeklyCommonApiType,
  GetAverageWeeklyWeatherPropsType,
  GetAverageWeeklyWeatherResultType,
  WeeklyValuesAccumulator,
} from '@/Types';
import { averageValue } from '@/Utils/math';
import { getIcon } from '@/helpers/getIcon';

export default function getAverageWeeklyWeather({
  dataWeeklyWeather,
  sunset,
  sunrise,
  timezone,
}: GetAverageWeeklyWeatherPropsType): GetAverageWeeklyWeatherResultType {
  const arrValuesdataWeeklyWeather: Record<string, WeeklyValuesAccumulator> =
    Object.values(dataWeeklyWeather).reduce(
      (
        acc: Record<string, WeeklyValuesAccumulator>,
        source: DataWeeklyCommonApiType[] | null
      ) => {
        if (source === null) return acc;

        source.forEach((item) => {
          const { srcIcon, altIcon } = getIcon({
            code: item.code,
            sunset,
            sunrise,
            timezone,
            time: null,
            date: item.date,
          });
          const date = item.date;
          const temp = item.temp;
          const alt = altIcon;
          const src = srcIcon;
          const code = item.code;

          if (!acc[date]) acc[date] = { temp: [], alt: [], src: [], code: [] };

          temp !== null && acc[date].temp.push(temp);
          !acc[date].alt.length && acc[date].alt.push(alt);
          !acc[date].src.length && acc[date].src.push(src);
          !acc[date].code.length && code !== null && acc[date].code.push(code);
        });

        return acc;
      },
      {}
    );

  const averageWeeklyWeather = Object.entries(arrValuesdataWeeklyWeather)
    .sort(([dateA], [dateB]) => dateA.localeCompare(dateB))
    .map(([date, value]) => {
      return {
        date,
        temp: averageValue(value.temp),
        alt: value.alt[0],
        src: value.src[0],
      };
    });

  return averageWeeklyWeather;
}
