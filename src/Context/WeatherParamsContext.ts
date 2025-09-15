'use client';

import { createContext } from 'react';

type WeatherParams = {
  timezone: string;
  sunset: string;
  sunrise: string;
  setTimezone: React.Dispatch<React.SetStateAction<string>>;
  setSunset: React.Dispatch<React.SetStateAction<string>>;
  setSunrise: React.Dispatch<React.SetStateAction<string>>;
};

const defaultValue: WeatherParams = {
  timezone: '',
  sunset: '',
  sunrise: '',
  setTimezone: () => {},
  setSunset: () => {},
  setSunrise: () => {},
};

export const WeatherParamsContext = createContext<WeatherParams>(defaultValue);
