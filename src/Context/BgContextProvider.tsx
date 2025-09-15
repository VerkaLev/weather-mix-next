'use client';

import { useState } from 'react';
import { BackgroundKey, BgContextProviderPropsType } from '@/Types';
import { BgContext } from './BgContext';

export const BgContextProvider = ({
  children,
  bgInitial,
}: BgContextProviderPropsType) => {
  const [bg, setBg] = useState<BackgroundKey>(bgInitial);

  return (
    <BgContext.Provider value={{ bg, setBg }}>{children}</BgContext.Provider>
  );
};
