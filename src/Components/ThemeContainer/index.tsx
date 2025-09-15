'use client';

import { useContext } from 'react';
import { ThemeContaiterPropsType } from '@/Types';
import { BgContext } from '@/Context/BgContext';

export default function ThemeContaiter({ children }: ThemeContaiterPropsType) {
  const { bg } = useContext(BgContext);
  const theme = bg.includes('night') ? 'theme-night' : 'theme-day';

  return <div className={theme}>{children}</div>;
}
