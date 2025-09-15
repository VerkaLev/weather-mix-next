'use client';

import { createContext } from 'react';

type DateContextType = {
  selectedDate: null | string;
  selectedHour: null | string;
  countAvailableDates: undefined | number;
  setSelectedDate: React.Dispatch<React.SetStateAction<null | string>>;
  setSelectedHour: React.Dispatch<React.SetStateAction<null | string>>;
  setCountAvailableDates: React.Dispatch<
    React.SetStateAction<undefined | number>
  >;
};

export const DateContext = createContext<DateContextType>({
  selectedDate: null,
  selectedHour: null,
  countAvailableDates: undefined,
  setSelectedDate: () => {},
  setSelectedHour: () => {},
  setCountAvailableDates: () => {},
});
