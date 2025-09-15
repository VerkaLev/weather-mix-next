import { DateTime } from 'luxon';
import { getColorAccent } from '@/helpers/getColorAccent';
import { getFormattedHour } from '@/helpers/getFormattedHour';
import { MainInfoWeatherHeaderType } from '@/Types';
import RealTime from '../RealTime';

export default function MainInfoWeatherHeader({
  selectedHour,
  selectedDate,
  arrTemp,
  timezone,
  t,
}: MainInfoWeatherHeaderType) {
  const { colorAccent } = getColorAccent();

  const isHour = !!selectedHour;
  const isDate = !selectedHour && selectedDate;
  const dateFormatted =
    selectedDate &&
    DateTime.fromISO(selectedDate).setLocale(t('locale')).toFormat(t('format'));

  const hourFormatted =
    selectedHour &&
    getFormattedHour({
      initialHour: selectedHour,
      lang: t('lang'),
      numMinutes: t('numMinutes'),
    });

  const dateToHour = dateFormatted || t('today');
  return (
    <>
      {isDate ? (
        <div className={`${colorAccent} font-bold`}>{dateFormatted}</div>
      ) : isHour ? (
        <div className={`${colorAccent} font-bold`}>
          {dateToHour + ' ' + t('at') + ' ' + hourFormatted}{' '}
        </div>
      ) : (
        <RealTime timezone={timezone} />
      )}

      <p className='text-center'>
        {t('line_1')} <br /> {arrTemp.length} {t('line_2')}
        {arrTemp.length === 1 ? t('final_1') : t('final_2')}:
      </p>
    </>
  );
}
