import { DateTime } from 'luxon';
import tz_lookup from 'tz-lookup';
import getData from './getData';
import {
  CoordsType,
  DataHourApiType,
  DataHourlyOpenWeatherMapItemResponseType,
  DataHourlyTomorrowIoItemResponseType,
  DataHourlyWeatherApiItemResponseType,
  DataHourlyWeatherType,
  DataVisualCrossingResponseType,
} from '@/Types';
import { API_KEYS } from '@/consts';

export default async function getHourlyWeather({ lat, lon }: CoordsType) {
  const dataHourlyWeather = {} as DataHourlyWeatherType;

  const dataHourlyWeatherAPI = await getData(
    `https://api.weatherapi.com/v1/forecast.json?key=${API_KEYS.weatherAPI}&q=${lat},${lon}&days=7`,
    { next: { revalidate: 21600 } }
  );

  dataHourlyWeather.dataHourlyWeatherAPI = dataHourlyWeatherAPI?.forecast
    ?.forecastday
    ? dataHourlyWeatherAPI.forecast.forecastday.map(
        (item: DataHourlyWeatherApiItemResponseType) => ({
          date: item.date,
          hours: item.hour.map((hour) => ({
            time: DateTime.fromFormat(hour.time, 'yyyy-MM-dd HH:mm').toFormat(
              'HH:mm'
            ),
            temp: hour.temp_c,
            wind: hour.wind_kph / 3.6,
            humidity: hour.humidity,
            pressure: hour.pressure_mb * 0.75006,
            uv: hour.uv,
            code: hour.condition.code,
          })),
        })
      )
    : null;

  const dataHourlyTomorrowIo = await getData(
    `https://api.tomorrow.io/v4/weather/forecast?location=${lat},${lon}&timesteps=hourly&apikey=${API_KEYS.tomorrowIo}`,
    {
      next: { revalidate: 21600 },
      method: 'GET',
      headers: {
        accept: 'application/json',
        'accept-encoding': 'deflate, gzip, br',
      },
    }
  );

  dataHourlyWeather.dataHourlyTomorrowIo = dataHourlyTomorrowIo?.timelines
    ?.hourly
    ? Object.values(
        dataHourlyTomorrowIo.timelines.hourly.reduce(
          (
            acc: Record<string, { date: string; hours: DataHourApiType[] }>,
            item: DataHourlyTomorrowIoItemResponseType
          ) => {
            let timezone: string;
            try {
              timezone = tz_lookup(
                dataHourlyTomorrowIo.location.lat,
                dataHourlyTomorrowIo.location.lon
              );
            } catch {
              timezone = 'UTC';
            }
            const date = DateTime.fromISO(item.time, { zone: 'utc' })
              .setZone(timezone)
              .toFormat('yyyy-MM-dd');

            const time = DateTime.fromISO(item.time, { zone: 'utc' })
              .setZone(timezone)
              .toFormat('HH:mm');

            const hourData = {
              time,
              temp: item.values.temperature,
              wind: item.values.windSpeed,
              humidity: item.values.humidity,
              pressure: item.values.pressureSurfaceLevel,
              uv: item.values.uvIndex,
              code: item.values.weatherCode,
            };

            if (!acc[date]) acc[date] = { date, hours: [] };
            acc[date].hours.push(hourData);

            return acc;
          },
          {}
        )
      )
    : null;

  const dataHourlyOpenWeatherMap = await getData(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEYS.openWeatherMap}`,
    { next: { revalidate: 21600 } }
  );

  dataHourlyWeather.dataHourlyOpenWeatherMap = dataHourlyOpenWeatherMap?.list
    ? Object.values(
        dataHourlyOpenWeatherMap.list.reduce(
          (
            acc: Record<
              string,
              {
                date: string;
                hours: DataHourApiType[];
              }
            >,
            item: DataHourlyOpenWeatherMapItemResponseType
          ) => {
            const date = DateTime.fromFormat(
              item.dt_txt,
              'yyyy-MM-dd HH:mm:ss'
            ).toFormat('yyyy-MM-dd');

            const time = DateTime.fromFormat(
              item.dt_txt,
              'yyyy-MM-dd HH:mm:ss'
            ).toFormat('HH:mm');

            const hourData = {
              time,
              temp: item.main.temp_max,
              wind: item.wind.speed,
              humidity: item.main.humidity,
              pressure: item.main.pressure,
              uv: null,
              code: item.weather[0].id,
            };

            if (!acc[date]) acc[date] = { date, hours: [] };
            acc[date].hours.push(hourData);

            return acc;
          },
          {}
        )
      )
    : null;

  const dataHourlyVisualCrossing = await getData(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${lon}?unitGroup=metric&key=${API_KEYS.visualCrossing}`,
    {
      next: { revalidate: 21600 },
    }
  );

  dataHourlyWeather.dataHourlyVisualCrossing = dataHourlyVisualCrossing?.days
    ? dataHourlyVisualCrossing.days.map(
        (item: DataVisualCrossingResponseType) => ({
          date: item.datetime,
          hours: item.hours.map((hour) => ({
            time: DateTime.fromFormat(hour.datetime, 'HH:mm:ss').toFormat(
              'HH:mm'
            ),
            temp: hour.temp,
            wind: hour.windspeed / 3.6,
            humidity: hour.humidity,
            pressure: hour.pressure * 0.75006,
            uv: hour.uvindex,
            code: hour.icon,
          })),
        })
      )
    : null;

  return dataHourlyWeather;
}
