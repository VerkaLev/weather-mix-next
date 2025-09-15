'use client';

import { createContext } from 'react';
import { BackgroundKey } from '@/Types';

type BgContextType = {
  bg: BackgroundKey;
  setBg: React.Dispatch<React.SetStateAction<BackgroundKey>>;
};

export const BgContext = createContext<BgContextType>({
  bg: 'sunny-day',
  setBg: () => {},
});
