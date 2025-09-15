import getData from './getData';
import getCurrentDate from '@/helpers/getCurrentDate';
import { API_KEYS } from '@/consts';
import {
  CoordsType,
  DataCurrentWeatherType,
  DataHourVisualCrossingItemResponseType,
  DataVisualCrossingResponseType,
} from '@/Types';

export default async function getCurrentWeather({ lat, lon }: CoordsType) {
  const dataCurrentWeather = {} as DataCurrentWeatherType;

  const dataCurrentWeatherAPI = await getData(
    `https://api.weatherapi.com/v1/current.json?key=${API_KEYS.weatherAPI}&q=${lat},${lon}`,
    { next: { revalidate: 3000 } }
  );

  dataCurrentWeather.dataCurrentWeatherAPI = dataCurrentWeatherAPI?.current
    ? {
        temp: dataCurrentWeatherAPI.current.temp_c,
        wind: dataCurrentWeatherAPI.current.wind_kph / 3.6,
        humidity: dataCurrentWeatherAPI.current.humidity,
        pressure: dataCurrentWeatherAPI.current.pressure_mb * 0.75006,
        uv: dataCurrentWeatherAPI.current.uv,
        code: dataCurrentWeatherAPI.current.condition.code,
      }
    : null;

  const dataCurrentWeatherbit = await getData(
    `https://api.weatherbit.io/v2.0/current?key=${API_KEYS.weatherbit}&lat=${lat}&lon=${lon}`,
    { next: { revalidate: 3000 } }
  );
  dataCurrentWeather.dataCurrentWeatherbit = dataCurrentWeatherbit?.data?.[0]
    ? {
        temp: dataCurrentWeatherbit.data[0].temp,
        wind: dataCurrentWeatherbit.data[0].wind_spd,
        humidity: dataCurrentWeatherbit.data[0].rh,
        pressure: dataCurrentWeatherbit.data[0].pres * 0.75006,
        uv: dataCurrentWeatherbit.data[0].uv,
        code: dataCurrentWeatherbit.data[0].weather.code,
      }
    : null;

  const dataCurrentTomorrowIo = await getData(
    `https://api.tomorrow.io/v4/weather/realtime?location=${lat},${lon}&units=metric&apikey=${API_KEYS.tomorrowIo}`,
    {
      next: { revalidate: 3000 },
      method: 'GET',
      headers: {
        accept: 'application/json',
        'accept-encoding': 'deflate, gzip, br',
      },
    }
  );
  dataCurrentWeather.dataCurrentTomorrowIo = dataCurrentTomorrowIo?.data?.values
    ? {
        temp: dataCurrentTomorrowIo.data.values.temperature,
        wind: dataCurrentTomorrowIo.data.values.windSpeed,
        humidity: dataCurrentTomorrowIo.data.values.humidity,
        pressure:
          dataCurrentTomorrowIo.data.values.pressureSurfaceLevel * 0.75006,
        uv: dataCurrentTomorrowIo.data.values.uvIndex,
        code: dataCurrentTomorrowIo.data.values.weatherCode,
      }
    : null;

  const dataCurrentOpenWeatherMap = await getData(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEYS.openWeatherMap}`,
    { next: { revalidate: 3000 } }
  );
  dataCurrentWeather.dataCurrentOpenWeatherMap = dataCurrentOpenWeatherMap
    ? {
        temp: dataCurrentOpenWeatherMap.main.temp,
        wind: dataCurrentOpenWeatherMap.wind.speed,
        humidity: dataCurrentOpenWeatherMap.main.humidity,
        pressure: dataCurrentOpenWeatherMap.main.pressure * 0.75006,
        uv: null,
        code: dataCurrentOpenWeatherMap.weather[0].id,
      }
    : null;

  const dataVisualCrossing = await getData(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${lon}?unitGroup=metric&key=${API_KEYS.visualCrossing}`,
    {
      next: { revalidate: 3000 },
    }
  );

  if (dataVisualCrossing?.days?.length) {
    const timezone = dataVisualCrossing.timezone;
    const { nowDateIso, nowTime } = getCurrentDate(timezone);

    const dataCurrentDayVisualCrossing = dataVisualCrossing.days.find(
      (item: DataVisualCrossingResponseType) => item.datetime === nowDateIso
    );

    if (dataCurrentDayVisualCrossing?.hours?.length) {
      let indexOfNowTime = dataCurrentDayVisualCrossing.hours.findIndex(
        (item: DataHourVisualCrossingItemResponseType) =>
          item.datetime > nowTime
      );

      if (indexOfNowTime === -1) {
        indexOfNowTime = dataCurrentDayVisualCrossing.hours.length - 1;
      } else {
        indexOfNowTime -= 1;
      }

      const dataCurrentVisualCrossing =
        dataCurrentDayVisualCrossing.hours[indexOfNowTime];

      dataCurrentWeather.dataCurrentVisualCrossing = {
        temp: dataCurrentVisualCrossing.temp,
        wind: dataCurrentVisualCrossing.windspeed / 3.6,
        humidity: dataCurrentVisualCrossing.humidity,
        pressure: dataCurrentVisualCrossing.pressure * 0.75006,
        uv: dataCurrentVisualCrossing.uvindex,
        code: dataCurrentVisualCrossing.icon,
      };
    } else {
      dataCurrentWeather.dataCurrentVisualCrossing = null;
    }
  } else {
    dataCurrentWeather.dataCurrentVisualCrossing = null;
  }

  return dataCurrentWeather;
}
