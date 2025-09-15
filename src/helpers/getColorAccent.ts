'use client';

import { useContext } from 'react';
import { BgContext } from '@/Context/BgContext';

export const getColorAccent = (hover?: string | undefined) => {
  const { bg } = useContext(BgContext);
  if (!hover)
    return {
      colorAccent: bg.includes('day') ? 'text-emerald-600' : 'text-emerald-400',
      bgColorAccent: bg.includes('day')
        ? 'bg-emerald-600/50'
        : 'bg-emerald-400/50',
      borderAccent: bg.includes('day')
        ? 'border-emerald-600'
        : 'border-emerald-400',
    };
  return {
    hoverColorAccent: bg.includes('day')
      ? 'hover:text-emerald-600'
      : 'hover:text-emerald-400',
    hoverBgColorAccent: bg.includes('day')
      ? 'hover:bg-emerald-600/50'
      : 'hover:bg-emerald-400/50',
  };
};
