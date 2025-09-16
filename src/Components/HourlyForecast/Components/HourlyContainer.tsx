'use client';

import { useTranslations } from 'next-intl';
import { useContext, useEffect, useRef } from 'react';
import { getFormattedHour } from '@/helpers/getFormattedHour';
import { HourlyContainerPropsType } from '@/Types';
import ForecastCell from '@/Components/ForecastCell';
import { DateContext } from '@/Context/DateContext';

export default function HourlyContainer({
  actualData,
  currentTime,
  handleSelectHourClick,
  error,
}: HourlyContainerPropsType) {
  const { selectedDate } = useContext(DateContext);
  const t = useTranslations('HourlyForecast');
  const selectedRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleScroll() {
      if (!selectedRef.current) return;

      const position = selectedRef.current.getBoundingClientRect();
      const isVisible =
        position.top < window.innerHeight && position.bottom > 0;

      if (isVisible) {
        selectedRef.current.scrollIntoView({
          behavior: 'smooth',
          inline: 'start',
          block: 'nearest',
        });

        window.removeEventListener('scroll', handleScroll);
      }
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (error === 'noData') {
    return (
      <div className='col-start-1 col-span-7 content-center mx-auto '>
        {t('wrong')}
      </div>
    );
  }
  return (
    <>
      {actualData.map((item, i) => {
        const isCurrent =
          (item.time === currentTime && !selectedDate) ||
          (selectedDate && i === 0);
        const formattedHour = getFormattedHour({
          initialHour: item.time,
          lang: t('lang'),
          numMinutes: t('numMinutes'),
        });
        return (
          <div
            key={item.time}
            ref={isCurrent ? selectedRef : null}
            className='flex-none min-w-[70px] flex justify-center'
          >
            <ForecastCell
              key={item.time}
              item={item}
              isColorAccent={item.time === currentTime && !selectedDate}
              handleSelectClick={handleSelectHourClick}
              formattedInfo={formattedHour}
            />
          </div>
        );
      })}
    </>
  );
}
