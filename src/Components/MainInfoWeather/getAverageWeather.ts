import {
  AccAverageWeatherType,
  AverageValuesWeatherType,
  DataCurrentCommonApiType,
  GetAverageWeatherPropsType,
} from '@/Types';
import { averageValue } from '@/Utils/math';

export default function getAverageWeather({
  dataWeather,
}: GetAverageWeatherPropsType): AverageValuesWeatherType {
  const initialAcc = {
    temp: [],
    wind: [],
    humidity: [],
    pressure: [],
    uv: [],
    code: [],
  };

  const arrValuesDataWeather: AccAverageWeatherType = Object.values(
    Object.values(dataWeather)
  ).reduce(
    (acc: AccAverageWeatherType, source: DataCurrentCommonApiType | null) => {
      if (source === null) return acc;

      const temp = source.temp;
      const wind = source.wind;
      const humidity = source.humidity;
      const pressure = source.pressure;
      const uv = source.uv;
      const code = source.code;

      temp != null && acc.temp.push(temp);
      wind != null && acc.wind.push(wind);
      humidity != null && acc.humidity.push(humidity);
      pressure != null && acc.pressure.push(pressure);
      uv != null && acc.uv.push(uv);
      code != null && acc.code.push(code);

      return acc;
    },
    initialAcc
  );

  const averageWeather = {
    averageTemp: averageValue(arrValuesDataWeather.temp),
    averageWind: averageValue(arrValuesDataWeather.wind),
    averageHumidity: averageValue(arrValuesDataWeather.humidity),
    averagePressure: averageValue(arrValuesDataWeather.pressure),
    averageUV: averageValue(arrValuesDataWeather.uv),
    arrTemp: arrValuesDataWeather.temp,
    code: arrValuesDataWeather.code,
  };

  return averageWeather;
}
