import SunCalc from 'suncalc';
import { DateTime } from 'luxon';
import { GetSunsetSunrisePropsType } from '@/Types';

export const getSunsetSunrise = ({
  lat,
  lon,
  timezone,
  date,
}: GetSunsetSunrisePropsType) => {
  const nowDate = DateTime.now().setZone(timezone).toJSDate();

  const selectedDate =
    date && DateTime.fromISO(date).setZone(timezone).toJSDate();

  const ourDate = selectedDate || nowDate;
  const sunTimes = SunCalc.getTimes(ourDate, lat, lon);

  const sunrise = DateTime.fromJSDate(sunTimes.sunrise)
    .setZone(timezone)
    .toFormat('HH:mm');
  const sunset = DateTime.fromJSDate(sunTimes.sunset)
    .setZone(timezone)
    .toFormat('HH:mm');

  return { sunset, sunrise };
};
