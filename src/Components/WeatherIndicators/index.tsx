import { WeatherIndicatorsPropsType } from '@/Types';

export default function WeatherIndicators({
  averageWind,
  averageHumidity,
  averagePressure,
  averageUV,
  sunrise,
  sunset,
  t,
}: WeatherIndicatorsPropsType) {
  return (
    <div className='flex flex-col min-w-[210px]'>
      <div className='flex justify-between'>
        {t('wind')}
        <span>
          {averageWind} {t('speed')}
        </span>
      </div>
      <div className='flex justify-between'>
        {t('humidity')}
        <span>{averageHumidity} %</span>
      </div>
      <div className='flex justify-between'>
        {t('pressure')}
        <span>
          {averagePressure} {t('mm')}
        </span>
      </div>
      <div className='flex justify-between'>
        {t('uv')} <span>{averageUV}</span>
      </div>
      <div className='flex justify-between mt-[20px]'>
        {t('sunrise')} <span>{sunrise}</span>
      </div>
      <div className='flex justify-between'>
        {t('sunset')} <span>{sunset}</span>
      </div>
    </div>
  );
}
