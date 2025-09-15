'use client';

import { useState } from 'react';
import { DataContextProviderPropsType } from '@/Types';
import { DateContext } from './DateContext';

export const DateContextProvider = ({
  children,
}: DataContextProviderPropsType) => {
  const [selectedDate, setSelectedDate] = useState<null | string>(null);
  const [selectedHour, setSelectedHour] = useState<null | string>(null);
  const [countAvailableDates, setCountAvailableDates] = useState<
    undefined | number
  >(undefined);

  return (
    <DateContext.Provider
      value={{
        selectedDate,
        selectedHour,
        countAvailableDates,
        setSelectedDate,
        setSelectedHour,
        setCountAvailableDates,
      }}
    >
      {children}
    </DateContext.Provider>
  );
};
