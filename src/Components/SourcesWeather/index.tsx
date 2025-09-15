'use client';

import { useTranslations } from 'next-intl';
import { useContext, useState } from 'react';
import { useWeatherSourceIndicators } from './useWeatherSourceIndicators.ts';
import { getColorAccent } from '@/helpers/getColorAccent';
import { getIcon } from '@/helpers/getIcon';
import { SourcesWeatherPropsType } from '@/Types';
import DataSource from '../DataSource';
import { WeatherParamsContext } from '@/Context/WeatherParamsContext';
import { DateContext } from '@/Context/DateContext';
import { BgContext } from '@/Context/BgContext';

export default function SourcesWeather({
  dataWeather,
}: SourcesWeatherPropsType) {
  const {
    getIndicators,
    dataWeatherAPI,
    dataWeatherbit,
    dataTomorrowIo,
    dataOpenWeatherMap,
    dataVisualCrossing,
  } = useWeatherSourceIndicators({ dataWeather });
  const { hoverBgColorAccent } = getColorAccent('hover');
  const tDataSource = useTranslations('DataSource');

  const sources = [
    { id: 'dataWeatherAPI', name: 'WeatherAPI.com', source: dataWeatherAPI },
    { id: 'dataWeatherbit', name: 'Weatherbit.io', source: dataWeatherbit },
    {
      id: 'dataOpenWeatherMap',
      name: 'OpenWeatherMap',
      source: dataOpenWeatherMap,
    },
    { id: 'dataTomorrowIo', name: 'Tomorrow.io', source: dataTomorrowIo },
    {
      id: 'VisualCrossing',
      name: 'VisualCrossing.com',
      source: dataVisualCrossing,
    },
  ];

  const { sunset, sunrise, timezone } = useContext(WeatherParamsContext);
  const { selectedHour, selectedDate } = useContext(DateContext);
  const { bg } = useContext(BgContext);

  const textClass =
    bg === 'rain-day' ? 'text-gray-200 sm:text-[var(--text-color)]' : '';

  const [active, setActive] = useState<string | null>(null);

  const handleSourceClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLButtonElement;

    if (target.nodeName === 'BUTTON') {
      if (!target.id) return;
      if (active === target.id) return;
      setActive(target.id);
    }
  };

  const handleCloseSourceClick = () => {
    setActive(null);
  };

  return (
    <div onClick={handleSourceClick} className='space-y-3 mx-10'>
      {sources.map((item, i) => {
        const isLast = i >= sources.length - 3;
        const indicators = getIndicators(item.id);
        const { srcIcon, altIcon } = getIcon({
          code: indicators.code,
          sunset,
          sunrise,
          timezone,
          time: selectedHour,
          date: selectedDate,
        });

        return (
          <div
            className={`relative ${textClass} ${
              active && active !== item.id
                ? 'opacity-0 pointer-events-none'
                : ''
            }`}
            key={item.id}
          >
            <div className='flex justify-between min-w-[270px] lg:min-w-[280px] xl:min-w-[290px]'>
              <button
                className={`cursor-pointer ${hoverBgColorAccent}`}
                id={item.id}
              >
                {item.name}
              </button>
              <div className='flex items-center'>
                <div className='font-bold'>{indicators.temp}</div>
                {indicators.code !== 0 ? (
                  <img alt={altIcon} src={srcIcon} className='w-10 h-10' />
                ) : (
                  <div className='w-10 h-10' />
                )}
              </div>
              {active && (
                <DataSource
                  isLast={isLast}
                  handleCloseSourceClick={handleCloseSourceClick}
                  indicators={indicators}
                  t={tDataSource}
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
