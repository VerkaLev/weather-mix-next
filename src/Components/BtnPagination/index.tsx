'use client';

import { getColorAccent } from '@/helpers/getColorAccent';
import { BtnPaginationPropsType } from '@/Types';

export default function BtnPagination({
  handleShowClick,
  isShowBtn,
  direction,
}: BtnPaginationPropsType) {
  const { borderAccent } = getColorAccent();
  const btnMargin = direction === 'prev' ? 'mr-[30px]' : 'ml-[30px]';
  const arrowBtn = direction === 'prev' ? '<—' : '—>';
  return (
    <button
      style={{ boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)' }}
      onClick={handleShowClick}
      className={`w-10 h-10 ${btnMargin} border-[3px] rounded-full ${borderAccent} bg-[var(--bg-color)] cursor-pointer ${
        !isShowBtn ? `opacity-0 pointer-events-none` : ''
      }`}
    >
      {arrowBtn}
    </button>
  );
}
