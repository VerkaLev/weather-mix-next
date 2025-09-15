'use client';

import { ReactNode, useState } from 'react';
import { WeatherParamsContext } from './WeatherParamsContext';

type WeatherParamsContextProviderPropsType = {
  children: ReactNode;
  value: {
    timezone: string;
    sunset: string;
    sunrise: string;
  };
};

export const WeatherParamsContextProvider = ({
  children,
  value: { timezone, sunset, sunrise },
}: WeatherParamsContextProviderPropsType) => {
  const [timezoneState, setTimezone] = useState<string>(timezone);
  const [sunsetState, setSunset] = useState<string>(sunset);
  const [sunriseState, setSunrise] = useState<string>(sunrise);

  return (
    <WeatherParamsContext.Provider
      value={{
        timezone: timezoneState,
        setTimezone,
        sunset: sunsetState,
        setSunset,
        sunrise: sunriseState,
        setSunrise,
      }}
    >
      {children}
    </WeatherParamsContext.Provider>
  );
};
