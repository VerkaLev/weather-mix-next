'use client';

import { useContext } from 'react';
import { getColorAccent } from '@/helpers/getColorAccent';
import { BtnClosePropsType } from '@/Types';
import { BgContext } from '@/Context/BgContext';

export default function BtnClose({
  handleCloseSourceClick,
}: BtnClosePropsType) {
  const { bg } = useContext(BgContext);
  const btnTextClass =
    bg === 'rain-day' ? 'text-black sm:text-[var(--text-color)]' : '';
  const { borderAccent } = getColorAccent();
  return (
    <button
      onClick={handleCloseSourceClick}
      className={`absolute right-[-40] top-[-10] w-[30px] h-[30px] my-2 border-[2.5] ${borderAccent} rounded-full bg-[var(--bg-color)] ${btnTextClass} cursor-pointer`}
    >
      X
    </button>
  );
}
