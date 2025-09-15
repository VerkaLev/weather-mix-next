import { DateTime } from 'luxon';
import { GetIconPropsType } from '@/Types';
import { conditionsWeather } from '@/consts';

export const getIcon = ({
  code,
  sunset,
  sunrise,
  timezone,
  time,
  date,
}: GetIconPropsType) => {
  let isDay;
  if (time) {
    isDay = time > sunrise && time < sunset ? 'day' : 'night';
  } else if (date) {
    isDay = 'day';
  } else {
    const hourNow = DateTime.now().setZone(timezone).toFormat('HH:mm');
    isDay = hourNow > sunrise && hourNow < sunset ? 'day' : 'night';
  }

  const foundConditions =
    conditionsWeather.find((item) => item.codes.includes(code)) ||
    conditionsWeather[0];
  const srcIcon = `/images/${isDay}/${foundConditions.mainCode}.svg`;
  const altIcon = foundConditions.text;
  const conditionBg = `${foundConditions.condition}-${isDay}`;

  return { srcIcon, altIcon, conditionBg };
};
