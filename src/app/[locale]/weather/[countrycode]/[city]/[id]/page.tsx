import tzLookup from 'tz-lookup';
import getWeeklyWeather from '@/api/getWeeklyWeather';
import getHourlyWeather from '@/api/getHourlyWeather';
import getCurrentWeather from '@/api/getCurrentWeather';
import { getIcon } from '@/helpers/getIcon';
import { getSunsetSunrise } from '@/helpers/getSunsetSunrise';
import { valenciaInfo } from '@/consts';
import { BackgroundKey, WeatherPagePropsType } from '@/Types';
import DinamicBg from '@/Components/DynamicBg';
import ThemeContaiter from '@/Components/ThemeContainer';
import WeatherDataContainer from '@/Components/WeatherDataContainer';
import { BgContextProvider } from '@/Context/BgContextProvider';
import { WeatherParamsContextProvider } from '@/Context/WeatherParamsContextProvider';

export default async function WeatherPage({
  searchParams,
  params,
}: WeatherPagePropsType) {
  const { lat, lon } = searchParams;
  const { locale } = params;
  const latFin = lat ? parseFloat(lat) : valenciaInfo.lat;
  const lonFin = lon ? parseFloat(lon) : valenciaInfo.lon;

  let timezone: string;
  try {
    timezone = tzLookup(latFin, lonFin);
  } catch {
    timezone = 'UTC';
  }

  const { sunset, sunrise } = getSunsetSunrise({
    lat: latFin,
    lon: lonFin,
    timezone,
    date: null,
  });

  const [dataHourlyWeather, dataWeeklyWeather, dataCurrentWeather] =
    await Promise.all([
      getHourlyWeather({ lat: latFin, lon: lonFin }),
      getWeeklyWeather({ lat: latFin, lon: lonFin }),
      getCurrentWeather({ lat: latFin, lon: lonFin }),
    ]);

  const { dataCurrentWeatherAPI } = dataCurrentWeather;

  const initialCode = dataCurrentWeatherAPI?.code || 1000;

  const { conditionBg } = getIcon({
    code: initialCode,
    sunset,
    sunrise,
    timezone,
    time: undefined,
    date: undefined,
  });
  const bgInitial = conditionBg as BackgroundKey;
  const weatherParams = {
    lat: latFin,
    lon: lonFin,
    locale,
    timezone,
    sunset,
    sunrise,
  };

  return (
    <BgContextProvider bgInitial={bgInitial}>
      <ThemeContaiter>
        <main className='relative min-h-screen max-w-[2560px] mx-auto overflow-hidden text-[var(--text-color)]'>
          <DinamicBg />
          <div className={`relative z-20 text-[1.2rem]`}>
            <WeatherParamsContextProvider
              value={{
                timezone,
                sunset,
                sunrise,
              }}
            >
              <WeatherDataContainer
                initialDataCurrentWeather={dataCurrentWeather}
                initialDataWeeklyWeather={dataWeeklyWeather}
                initialDataHourlyWeather={dataHourlyWeather}
                {...weatherParams}
              />
            </WeatherParamsContextProvider>
          </div>
        </main>
      </ThemeContaiter>
    </BgContextProvider>
  );
}
