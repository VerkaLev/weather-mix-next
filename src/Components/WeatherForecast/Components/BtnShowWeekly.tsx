'use client';

import { useTranslations } from 'next-intl';
import { useContext } from 'react';
import { BtnShowWeeklyPropsType } from '@/Types';
import { BgContext } from '@/Context/BgContext';

export default function BtnShowWeekly({
  maxLength,
  isActive,
  handleIsActiveClick,
}: BtnShowWeeklyPropsType) {
  const { bg } = useContext(BgContext);

  const textClass =
    bg === 'cloudy-day'
      ? 'text-gray-200 lg:text-[var(--text-color)]'
      : bg === 'snow-night'
      ? 'text-black lg:text-[var(--text-color)]'
      : '';
  const t = useTranslations('BtnShowWeekly');
  const days = maxLength === 1 ? t('day') : t('days');
  return (
    <button
      disabled={isActive}
      onClick={handleIsActiveClick}
      className={`${
        isActive ? 'lg:font-bold' : 'lg:font-normal'
      } font-bold ${textClass} cursor-pointer`}
    >
      {t('temp_week')} <br /> {maxLength + ' ' + days}
    </button>
  );
}
