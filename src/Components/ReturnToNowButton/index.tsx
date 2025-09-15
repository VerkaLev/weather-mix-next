'use client';

import { useContext } from 'react';
import { useTranslations } from 'next-intl';
import { getColorAccent } from '@/helpers/getColorAccent';
import { DateContext } from '@/Context/DateContext';

export default function ReturnToNowButton() {
  const { borderAccent } = getColorAccent();

  const { setSelectedDate, setSelectedHour } = useContext(DateContext);

  const t = useTranslations('ReturnToNowButton');

  const handleReturnClick = () => {
    setSelectedHour(null);
    setSelectedDate(null);
  };

  return (
    <button
      style={{ boxShadow: '5px 5px 5px rgba(54, 49, 49, 0.1)' }}
      onClick={handleReturnClick}
      className={`p-[5px] border-[3px] rounded-full ${borderAccent} bg-[var(--bg-color)] whitespace-nowrap cursor-pointer`}
    >
      {'<—'} {t('now')}
    </button>
  );
}
