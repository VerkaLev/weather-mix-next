import tz_lookup from 'tz-lookup';
import { DateTime } from 'luxon';
import getData from './getData';
import { API_KEYS } from '@/consts';
import {
  CoordsType,
  DataDayVisualCrossingItemResponseType,
  DataWeeklyTomorrowIoItemResponseType,
  DataWeeklyWeatherApiItemResponseType,
  DataWeeklyWeatherbitItemResponseType,
  DataWeeklyWeatherType,
} from '@/Types';

export default async function getWeeklyWeather({ lat, lon }: CoordsType) {
  const dataWeeklyWeather = {} as DataWeeklyWeatherType;

  const dataWeeklyWeatherAPI = await getData(
    `https://api.weatherapi.com/v1/forecast.json?key=${API_KEYS.weatherAPI}&q=${lat},${lon}&days=7`,
    { next: { revalidate: 21600 } }
  );

  dataWeeklyWeather.dataWeeklyWeatherAPI = dataWeeklyWeatherAPI?.forecast
    ?.forecastday
    ? dataWeeklyWeatherAPI.forecast.forecastday.map(
        (item: DataWeeklyWeatherApiItemResponseType) => ({
          date: item.date,
          temp: item.day.maxtemp_c,
          wind: item.day.maxwind_kph / 3.6,
          humidity: item.day.avghumidity * 0.75006,
          pressure: null,
          uv: item.day.uv,
          code: item.day.condition.code,
        })
      )
    : null;

  const dataWeeklyWeatherbit = await getData(
    `https://api.weatherbit.io/v2.0/forecast/daily?key=${API_KEYS.weatherbit}&lat=${lat}&lon=${lon}&days=7`,
    { next: { revalidate: 21600 } }
  );

  dataWeeklyWeather.dataWeeklyWeatherbit = dataWeeklyWeatherbit?.data
    ? dataWeeklyWeatherbit.data.map(
        (item: DataWeeklyWeatherbitItemResponseType) => ({
          date: item.datetime,
          temp: item.high_temp,
          wind: item.wind_spd,
          humidity: item.rh,
          pressure: item.pres * 0.75006,
          uv: item.uv,
          code: item.weather.code,
        })
      )
    : null;

  const dataWeeklyTomorrowIo = await getData(
    `https://api.tomorrow.io/v4/weather/forecast?location=${lat},${lon}&timesteps=daily&apikey=${API_KEYS.tomorrowIo}`,
    {
      next: { revalidate: 21600 },
      method: 'GET',
      headers: {
        accept: 'application/json',
        'accept-encoding': 'deflate, gzip, br',
      },
    }
  );

  let timezone: string;
  try {
    timezone = tz_lookup(
      dataWeeklyTomorrowIo.location.lat,
      dataWeeklyTomorrowIo.location.lon
    );
  } catch {
    timezone = 'UTC';
  }

  dataWeeklyWeather.dataWeeklyTomorrowIo = dataWeeklyTomorrowIo?.timelines
    ?.daily
    ? dataWeeklyTomorrowIo.timelines.daily.map(
        (item: DataWeeklyTomorrowIoItemResponseType) => {
          return {
            date: DateTime.fromISO(item.time, { zone: 'utc' })
              .setZone(timezone)
              .toFormat('yyyy-MM-dd'),
            temp: item.values.temperatureMax,
            wind: item.values.windSpeedAvg,
            humidity: item.values.humidityAvg,
            pressure: item.values.pressureSurfaceLevelAvg * 0.75006,
            uv: item.values.uvIndexAvg,
            code: item.values.weatherCodeMax,
          };
        }
      )
    : null;

  const dataWeeklyVisualCrossing = await getData(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${lon}?unitGroup=metric&key=${API_KEYS.visualCrossing}`,
    {
      next: { revalidate: 21600 },
    }
  );

  dataWeeklyWeather.dataWeeklyVisualCrossing = dataWeeklyVisualCrossing?.days
    ? dataWeeklyVisualCrossing.days.map(
        (item: DataDayVisualCrossingItemResponseType) => ({
          date: item.datetime,
          temp: item.tempmax,
          wind: item.windspeed / 3.6,
          humidity: item.humidity,
          pressure: item.pressure * 0.75006,
          uv: item.uvindex,
          code: item.icon,
        })
      )
    : null;

  return dataWeeklyWeather;
}
