import { getColorAccent } from '@/helpers/getColorAccent';
import { DataSourcePropsType } from '@/Types';
import BtnClose from '../BtnClose';

export default function DataSource({
  indicators,
  t,
  handleCloseSourceClick,
  isLast,
}: DataSourcePropsType) {
  const { wind, humidity, pressure, uv } = indicators;
  const { bgColorAccent } = getColorAccent();

  return (
    <div
      className={`absolute ${
        isLast ? 'bottom-10 flex-col-reverse' : 'top-10'
      } flex flex-col items-end w-full my-3`}
    >
      <div
        className={`relative flex flex-col w-full space-y-[10px] p-2 ${bgColorAccent}`}
      >
        <div className='flex justify-between'>
          {t('wind')}
          <span>{wind}</span>
        </div>
        <div className='flex justify-between'>
          {t('humidity')} <span>{humidity}</span>
        </div>
        <div className='flex justify-between'>
          {t('pressure')} <span>{pressure}</span>
        </div>
        <div className='flex justify-between'>
          {t('uv')} <span>{uv}</span>
        </div>
      </div>
      <BtnClose handleCloseSourceClick={handleCloseSourceClick} />
    </div>
  );
}
