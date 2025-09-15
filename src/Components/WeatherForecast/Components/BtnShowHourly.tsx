'use client';

import { DateTime } from 'luxon';
import { useTranslations } from 'next-intl';
import { useContext } from 'react';
import useCurrentDate from '@/hooks/useCurrentDate';
import { BtnShowHourlyPropsType } from '@/Types';
import { DateContext } from '@/Context/DateContext';
import { WeatherParamsContext } from '@/Context/WeatherParamsContext';

export default function BtnShowHourly({
  isActive,
  handleIsActiveClick,
}: BtnShowHourlyPropsType) {
  const { timezone } = useContext(WeatherParamsContext);
  const { selectedDate } = useContext(DateContext);
  const t = useTranslations('BtnShowHourly');
  const { currentDate } = useCurrentDate(timezone);

  const displayDate = selectedDate
    ? DateTime.fromISO(selectedDate).toFormat(t('format'))
    : `${t('today')} ${DateTime.fromISO(currentDate).toFormat(t('format'))}`;

  return (
    <button
      disabled={isActive}
      onClick={handleIsActiveClick}
      className={`${
        isActive ? 'lg:font-bold' : 'lg:font-normal'
      } font-bold cursor-pointer`}
    >
      {t('temp_hours')} <br />
      {displayDate}
    </button>
  );
}
