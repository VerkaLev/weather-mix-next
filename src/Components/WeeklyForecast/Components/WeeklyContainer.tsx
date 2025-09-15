'use client';

import { useTranslations } from 'next-intl';
import { getFormattedDate } from '@/helpers/getFormattedDate';
import { WeeklyContainerPropsType } from '@/Types';
import ForecastCell from '@/Components/ForecastCell';

export default function WeeklyContainer({
  actualData,
  currentDate,
  handleSelectDayClick,
}: WeeklyContainerPropsType) {
  const t = useTranslations('WeeklyForecast');

  return (
    <>
      {actualData.map((item) => {
        const { formattedDate } = getFormattedDate({
          initialDate: item.date,
          lang: t('lang'),
        });

        return (
          <div
            key={item.date}
            className='flex-none min-w-[70px] flex justify-center'
          >
            <ForecastCell
              key={item.date}
              item={item}
              handleSelectClick={handleSelectDayClick}
              isColorAccent={currentDate === item.date}
              formattedInfo={formattedDate}
            />
          </div>
        );
      })}
    </>
  );
}
