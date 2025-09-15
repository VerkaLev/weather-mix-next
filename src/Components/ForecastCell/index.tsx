'use client';

import { getColorAccent } from '@/helpers/getColorAccent';
import { ForecastCellPropsType } from '@/Types';

export default function ForecastCell({
  item,
  handleSelectClick,
  isColorAccent,
  formattedInfo,
}: ForecastCellPropsType) {
  const { colorAccent } = getColorAccent();
  const { hoverColorAccent } = getColorAccent('hover');
  const id = 'date' in item ? item.date : item.time;

  return (
    <div
      className={`flex flex-col items-center gap-[5px] ${
        isColorAccent ? `${colorAccent} font-bold` : ''
      }`}
    >
      <button
        onClick={handleSelectClick}
        id={id}
        className={`${hoverColorAccent} hover:underline hover:font-bold cursor-pointer`}
      >
        {formattedInfo}
      </button>
      <div>
        <img className='w-[40px] h-[40px]' alt={item.alt} src={item.src} />
      </div>
      <div>{typeof item.temp === 'number' && item.temp}</div>
    </div>
  );
}
