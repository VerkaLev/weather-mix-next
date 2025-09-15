'use client';

import { useContext, useEffect, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { getIcon } from '@/helpers/getIcon';
import { getColorAccent } from '@/helpers/getColorAccent';
import getAverageWeather from '@/Components/MainInfoWeather/getAverageWeather';
import { BackgroundKey, MainInfoWeatherPropsType } from '@/Types';
import SourcesWeather from '../SourcesWeather';
import WeatherIndicators from '../WeatherIndicators';
import WeatherTempIcon from '../WeatherTempIcon';
import MainInfoWeatherHeader from '../MainInfoWeatherHeader';
import ReturnToNowButton from '../ReturnToNowButton';
import { BgContext } from '@/Context/BgContext';
import { WeatherParamsContext } from '@/Context/WeatherParamsContext';
import { DateContext } from '@/Context/DateContext';

export default function MainInfoWeather({
  dataWeather,
}: MainInfoWeatherPropsType) {
  const { setBg } = useContext(BgContext);
  const { sunset, sunrise, timezone } = useContext(WeatherParamsContext);
  const { selectedDate, selectedHour } = useContext(DateContext);

  const { borderAccent } = getColorAccent();

  const { ...averageValues } = useMemo(
    () => getAverageWeather({ dataWeather }),
    [dataWeather]
  );

  const tMainInfoHeader = useTranslations('MainInfoWeatherHeader');
  const tIndicators = useTranslations('WeatherIndicators');

  const { code, arrTemp, averageTemp } = averageValues;

  const { srcIcon, altIcon, conditionBg } = useMemo(
    () =>
      getIcon({
        code: code[0],
        sunset,
        sunrise,
        timezone,
        time: selectedHour,
        date: selectedDate,
      }),
    [code, sunset, sunrise, timezone, selectedHour, selectedDate]
  );

  useEffect(() => {
    setBg(conditionBg as BackgroundKey);
  }, [conditionBg]);

  return (
    <>
      <div
        className={`relative flex flex-col items-center 
          col-span-1 sm:col-span-3 sm:row-span-3 lg:row-span-1 lg:col-span-3 xl:col-span-3 w-full ${
            selectedDate || selectedHour ? 'mt-10' : 'mt-0'
          } sm:mt-0 py-6 text-[1.2rem] bg-[var(--bg-color)]`}
      >
        <div className='absolute -top-15 sm:left-[105%] sm:top-[32%] lg:top-auto lg:right-[105%] lg:left-auto'>
          {(selectedDate || selectedHour) && <ReturnToNowButton />}
        </div>
        <MainInfoWeatherHeader
          selectedHour={selectedHour}
          selectedDate={selectedDate}
          arrTemp={arrTemp}
          timezone={timezone}
          t={tMainInfoHeader}
        />
        <WeatherTempIcon
          averageTemp={averageTemp}
          altIcon={altIcon}
          srcIcon={srcIcon}
        />
        <WeatherIndicators
          {...averageValues}
          sunrise={sunrise}
          sunset={sunset}
          t={tIndicators}
        />
      </div>
      <div
        className={`flex justify-center col-span-1 sm:col-span-3 sm:row-span-2 lg:col-span-3 xl:col-span-4 lg:row-span-1 py-10 sm:py-0 border-b-3 sm:border-none ${borderAccent}`}
      >
        <SourcesWeather dataWeather={dataWeather} />
      </div>
    </>
  );
}
