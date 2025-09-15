import { getIcon } from '@/helpers/getIcon';
import { averageValue } from '@/Utils/math';
import {
  DataHourlyCommonApiType,
  GetAverageHourlyWeatherPropsType,
  GetAverageHourlyWeatherResultType,
  HourlyValuesAccumulator,
} from '@/Types';

export default function getAverageHourlyWeather({
  dataHourlyWeather,
  sunset,
  sunrise,
  timezone,
}: GetAverageHourlyWeatherPropsType): GetAverageHourlyWeatherResultType {
  const arrValuesDataHourlyWeather: Record<string, HourlyValuesAccumulator> =
    Object.values(dataHourlyWeather).reduce(
      (
        acc: Record<string, HourlyValuesAccumulator>,
        source: DataHourlyCommonApiType | null
      ) => {
        if (source === null) return acc;

        source.hours.forEach((item) => {
          if (!item.time) return;

          const { srcIcon, altIcon } = getIcon({
            code: item.code,
            sunset,
            sunrise,
            timezone,
            time: item.time,
            date: null,
          });

          const time = item.time;
          const temp = item.temp;
          const wind = item.wind;
          const humidity = item.humidity;
          const pressure = item.pressure;
          const uv = item.uv;
          const alt = altIcon;
          const src = srcIcon;
          const code = item.code;

          if (!acc[time])
            acc[time] = {
              temp: [],
              wind: [],
              humidity: [],
              pressure: [],
              uv: [],
              alt: [],
              src: [],
              code: [],
            };

          temp !== null && acc[time].temp.push(temp);
          wind !== null && acc[time].wind.push(wind);
          humidity !== null && acc[time].humidity.push(humidity);
          pressure !== null && acc[time].pressure.push(pressure);
          uv !== null && acc[time].uv.push(uv);

          !acc[item.time].alt.length && acc[item.time].alt.push(alt);
          !acc[time].src.length && acc[time].src.push(src);
          !acc[time].code.length && code !== null && acc[time].code.push(code);
        });

        return acc;
      },
      {}
    );

  const averageHourlyWeather = Object.entries(arrValuesDataHourlyWeather)
    .sort(([timeA], [timeB]) => timeA.localeCompare(timeB))
    .map(([time, value]) => {
      return {
        time,
        temp: averageValue(value.temp),
        wind: averageValue(value.wind),
        humidity: averageValue(value.humidity),
        pressure: averageValue(value.pressure),
        uv: averageValue(value.uv),
        alt: value.alt[0],
        src: value.src[0],
        code: value.code[0],
      };
    });

  return averageHourlyWeather;
}
