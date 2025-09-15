import { position } from '@/consts';

export type MyLayoutProps = {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
    id: string;
    countrycode: string;
    city: string;
  }>;
};

export type DataContextProviderPropsType = {
  children: React.ReactNode;
};

export type BackgroundKey = keyof typeof position;

export type BgContextProviderPropsType = {
  children: React.ReactNode;
  bgInitial: BackgroundKey;
};

export type ThemeContaiterPropsType = {
  children: React.ReactNode;
};

export type WeatherPagePropsType = {
  searchParams: Promise<{
    lat: string;
    lon: string;
  }>;
  params: Promise<{
    locale: string;
  }>;
};

export type GetSunsetSunrisePropsType = {
  lat: number;
  lon: number;
  timezone: string;
  date: string | null;
};

export type CoordsType = {
  lat: number;
  lon: number;
};

export type DataCurrentCommonApiType = {
  temp: number;
  wind: number;
  humidity: number;
  pressure: number;
  uv: number | null;
  code: number | string;
};

export type DataHourTomorrowIoItemType = DataCurrentCommonApiType;
export type DataHourOpenWeatherMapItemType = DataCurrentCommonApiType;

export type DataHourApiType = {
  time?: string;
  temp: number;
  wind: number;
  humidity: number;
  pressure: number;
  uv: number | null;
  code: number;
};

export type DataHourlyCommonApiType = {
  date: string;
  hours: DataHourApiType[];
};

export type DataHourlyWeatherApiType = DataHourlyCommonApiType;
export type DataHourlyTomorrowIoType = DataHourlyCommonApiType;
export type DataHourlyOpenWeatherMapType = DataHourlyCommonApiType;
export type DataHourlyVisualCrossingType = DataHourlyCommonApiType;

export type DataHourlyWeatherType = {
  dataHourlyWeatherAPI: DataHourlyWeatherApiType[] | null;
  dataHourlyTomorrowIo: DataHourlyTomorrowIoType[] | null;
  dataHourlyOpenWeatherMap: DataHourlyOpenWeatherMapType[] | null;
  dataHourlyVisualCrossing: DataHourlyVisualCrossingType[] | null;
};

export type DataHourWeatherApiItemResponseType = {
  time: string;
  temp_c: number;
  wind_kph: number;
  humidity: number;
  pressure_mb: number;
  uv: number;
  condition: {
    code: number;
  };
};

export type DataHourlyWeatherApiItemResponseType = {
  date: string;
  day: {
    avghumidity: number;
    maxtemp_c: number;
    condition: {
      code: number;
    };
    uv: number;
    maxwind_kph: number;
  };
  hour: DataHourWeatherApiItemResponseType[];
};

export type DataHourlyTomorrowIoItemResponseType = {
  time: string;
  values: {
    temperature: number;
    windSpeed: number;
    humidity: number;
    pressureSurfaceLevel: number;
    uvIndex: number;
    weatherCode: number;
  };
};

export type DataHourlyOpenWeatherMapItemResponseType = {
  dt_txt: string;
  main: {
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  weather: [{ id: number }];
  wind: { speed: number };
};

export type DataHourVisualCrossingItemResponseType = {
  datetime: string;
  temp: number;
  windspeed: number;
  humidity: number;
  pressure: number;
  uvindex: number;
  icon: string;
};

export type DataDayVisualCrossingItemResponseType = {
  datetime: string;
  tempmax: number;
  windspeed: number;
  humidity: number;
  pressure: number;
  uvindex: number;
  icon: string;
};

export type DataVisualCrossingResponseType =
  DataDayVisualCrossingItemResponseType & {
    hours: DataHourVisualCrossingItemResponseType[];
  };

export type DataWeeklyCommonApiType = {
  date: string;
  temp: number;
  wind: number;
  humidity: number;
  pressure: null | number;
  uv: number;
  code: number;
};

export type DataWeeklyWeatherApiType = DataWeeklyCommonApiType;
export type DataWeeklyWeatherbitType = DataWeeklyCommonApiType;
export type DataWeeklyTomorrowIoType = DataWeeklyCommonApiType;
export type DataWeeklyVisualCrossingType = DataWeeklyCommonApiType;

export type DataWeeklyWeatherType = {
  dataWeeklyWeatherAPI: DataWeeklyWeatherApiType[] | null;
  dataWeeklyWeatherbit: DataWeeklyWeatherbitType[] | null;
  dataWeeklyTomorrowIo: DataWeeklyTomorrowIoType[] | null;
  dataWeeklyVisualCrossing: DataWeeklyVisualCrossingType[] | null;
};

export type DataWeeklyWeatherApiItemResponseType =
  DataHourlyWeatherApiItemResponseType;

export type DataWeeklyWeatherbitItemResponseType = {
  datetime: string;
  wind_spd: number;
  high_temp: number;
  pres: number;
  rh: number;
  weather: {
    code: number;
  };
  uv: number;
};

export type DataWeeklyTomorrowIoItemResponseType = {
  time: string;
  values: {
    temperatureMax: number;
    windSpeedAvg: number;
    humidityAvg: number;
    pressureSurfaceLevelAvg: number;
    uvIndexAvg: number;
    weatherCodeMax: number;
  };
};

export type DataCurrentWeatherApiType = DataCurrentCommonApiType;
export type DataCurrentWeatherbitType = DataCurrentCommonApiType;
export type DataCurrentTomorrowIoType = DataCurrentCommonApiType;
export type DataCurrentOpenWeatherMapType = DataCurrentCommonApiType;
export type DataCurrentVisualCrossingType = DataCurrentCommonApiType;

export type DataCurrentWeatherType = {
  dataCurrentWeatherAPI: DataCurrentWeatherApiType | null;
  dataCurrentWeatherbit: DataCurrentWeatherbitType | null;
  dataCurrentTomorrowIo: DataCurrentTomorrowIoType | null;
  dataCurrentOpenWeatherMap: DataCurrentOpenWeatherMapType | null;
  dataCurrentVisualCrossing: DataCurrentVisualCrossingType | null;
};

export type GetIconPropsType = {
  code: number | string;
  sunset: string;
  sunrise: string;
  timezone: string;
  time?: string | null;
  date?: string | null;
};

export type WeatherDataContainerType = {
  initialDataCurrentWeather: DataCurrentWeatherType;
  initialDataWeeklyWeather: DataWeeklyWeatherType;
  initialDataHourlyWeather: DataHourlyWeatherType;
  timezone: string;
  lat: number;
  lon: number;
  locale: string;
  sunset: string;
  sunrise: string;
};

export type UseDataWeatherType = {
  dataCurrentWeather: DataCurrentWeatherType;
  dataWeeklyWeather: DataWeeklyWeatherType;
  dataHourlyWeather: DataHourlyWeatherType;
  timezone: string;
  selectedDate: string | null;
  selectedHour: string | null;
};

export type GetFilteredHourlyWeatherPropsType = {
  obj: DataHourlyWeatherType | null | undefined;
  date: string | null | undefined;
  timezone: string;
};

export type DataFilteredHourlyWeatherType = {
  dataHourlyWeatherAPI: DataHourlyWeatherApiType | null;
  dataHourlyTomorrowIo: DataHourlyTomorrowIoType | null;
  dataHourlyOpenWeatherMap: DataHourlyOpenWeatherMapType | null;
  dataHourlyVisualCrossing: DataHourlyVisualCrossingType | null;
};

export type GetFilteredByHourSelectedWeatherType = {
  obj: DataFilteredHourlyWeatherType;
  hour: string | null | undefined;
};

export type DataFilteredByHourWeatherType = {
  dataHourlyWeatherAPI: DataHourApiType | null;
  dataHourlyTomorrowIo: DataHourApiType | null;
  dataHourlyOpenWeatherMap: DataHourApiType | null;
  dataHourlyVisualCrossing: DataHourApiType | null;
};

export type GetFilteredWeeklyWeatherPropsType = {
  obj: DataWeeklyWeatherType;
  date: string | null | undefined;
  timezone: string;
};

export type DataFilteredWeeklyWeatherType = {
  dataWeeklyWeatherAPI: DataWeeklyWeatherApiType | null;
  dataWeeklyWeatherbit: DataWeeklyWeatherbitType | null;
  dataWeeklyTomorrowIo: DataWeeklyTomorrowIoType | null;
  dataWeeklyVisualCrossing: DataWeeklyVisualCrossingType | null;
};

export type MainHeaderPropsType = {
  t: (key: string, values?: Record<string, any>) => string;
};

export type MainInfoWeatherPropsType = {
  dataWeather:
    | DataCurrentWeatherType
    | DataFilteredWeeklyWeatherType
    | DataFilteredByHourWeatherType;
};

export type GetAverageWeatherPropsType = MainInfoWeatherPropsType;

export type AverageValuesWeatherType = {
  averageTemp: number | string;
  arrTemp: number[];
  averageWind: number | string;
  averageHumidity: number | string;
  averagePressure: number | string;
  averageUV: number | string;
  code: (number | string)[];
};

export type AverageHourlyValuesType = {
  temp: number | string;
  wind: number | string;
  humidity: number | string;
  pressure: number | string;
  uv: number | string;
  time: string;
  alt: string;
  src: string;
  code: number;
};

export type AverageWeeklyValuesType = {
  temp: number | string;
  date: string;
  alt: string;
  src: string;
};
export type GetAverageHourlyWeatherResultType = AverageHourlyValuesType[];

export type GetAverageWeeklyWeatherResultType = AverageWeeklyValuesType[];

export type HourlyValuesAccumulator = {
  temp: number[];
  wind: number[];
  humidity: number[];
  pressure: number[];
  uv: number[];
  alt: string[];
  src: string[];
  code: number[];
};

export type AccAverageWeatherType = {
  temp: number[];
  wind: number[];
  humidity: number[];
  pressure: number[];
  uv: number[];
  code: (number | string)[];
};

export type WeeklyValuesAccumulator = {
  temp: number[];
  alt: string[];
  src: string[];
  code: (number | string)[];
};

export type MainInfoWeatherHeaderType = {
  selectedHour: string | null;
  selectedDate: string | null;
  arrTemp: number[];
  timezone: string;
  t: (key: string, values?: Record<string, any>) => string;
};

export type RealTimePropsType = {
  timezone: string;
};

export type WeatherTempIconPropsType = {
  averageTemp: number | string;
  altIcon: string;
  srcIcon: string;
};

export type WeatherIndicatorsPropsType = {
  averageWind: number | string;
  averageHumidity: number | string;
  averagePressure: number | string;
  averageUV: number | string;
  sunrise: string;
  sunset: string;
  t: (key: string, values?: Record<string, any>) => string;
};

export type SourcesWeatherPropsType = MainInfoWeatherPropsType;
export type UseWeatherPropsType = SourcesWeatherPropsType;

export type WeatherIndicatorsType = {
  temp: string;
  wind: string;
  humidity: string;
  pressure: string;
  uv: string;
  code: number | string;
};

export type DataWeatherType =
  | DataCurrentCommonApiType
  | DataWeeklyCommonApiType
  | DataHourApiType
  | null;

export type UseWeatherSourceIndicatorsResultType = {
  getIndicators: (id: string) => WeatherIndicatorsType;
  dataWeatherAPI: DataWeatherType;
  dataWeatherbit: DataWeatherType;
  dataTomorrowIo: DataWeatherType;
  dataOpenWeatherMap: DataWeatherType;
  dataVisualCrossing: DataWeatherType;
};

export type DataSourcePropsType = {
  indicators: WeatherIndicatorsType;
  t: (key: string, values?: Record<string, any>) => string;
  handleCloseSourceClick: () => void;
  isLast: boolean;
};

export type WeatherForecastPropsType = {
  dataWeeklyWeather: DataWeeklyWeatherType;
  dataHourlyWeather: DataFilteredHourlyWeatherType;
};

export type BtnShowHourlyPropsType = {
  isActive: boolean;
  handleIsActiveClick: () => void;
};

export type BtnShowWeeklyPropsType = {
  maxLength: number;
  isActive: boolean;
  handleIsActiveClick: () => void;
};

export type HourlyTemperaturePropsType = {
  dataHourlyWeather: DataFilteredHourlyWeatherType;
};

export type WeeklyTemperaturePropsType = {
  dataWeeklyWeather: DataWeeklyWeatherType;
};

export type GetAverageHourlyWeatherPropsType = {
  dataHourlyWeather: DataFilteredHourlyWeatherType;
  sunset: string;
  sunrise: string;
  timezone: string;
};

export type GetAverageWeeklyWeatherPropsType = {
  dataWeeklyWeather: DataWeeklyWeatherType;
  sunset: string;
  sunrise: string;
  timezone: string;
};

export type UseHourlyPaginationPropsType = {
  timezone: string;
  selectedDate: string | null;
  averageHourlyWeather: GetAverageHourlyWeatherResultType;
  setSelectedHour: React.Dispatch<React.SetStateAction<null | string>>;
};

export type UseWeeklyPaginationPropsType = {
  timezone: string;
  averageWeeklyWeather: GetAverageWeeklyWeatherResultType;
  setSelectedDate: React.Dispatch<React.SetStateAction<null | string>>;
  setSelectedHour: React.Dispatch<React.SetStateAction<null | string>>;
};

export type BtnPaginationPropsType = {
  handleShowClick: () => void;
  isShowBtn: boolean;
  direction: 'prev' | 'next';
};

export type HourlyContainerPropsType = {
  actualData: AverageHourlyValuesType[];
  currentTime: string;
  handleSelectHourClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export type GetFormattedHourType = {
  initialHour: string;
  lang: string;
  numMinutes: string;
};

export type GetFormattedDateType = {
  initialDate: string;
  lang: string;
};

export type ForecastCellPropsType = {
  item: AverageHourlyValuesType | AverageWeeklyValuesType;
  handleSelectClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isColorAccent: boolean;
  formattedInfo: string;
};

export type WeeklyContainerPropsType = {
  actualData: GetAverageWeeklyWeatherResultType;
  currentDate: string;
  handleSelectDayClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export type NavPagePropsType = {
  initialCityName: string;
  initialCountryCode: string;
  initialId: string;
};

export type SelectedCityType = {
  name: string;
  lat: string;
  lon: string;
  countryCode: string;
  id: string;
  toponymname: string;
};

export type SearchCityPropsType = NavPagePropsType;

export type CityButtonPropsType = {
  handleSearchClick: () => void;
  selectedCity: SelectedCityType;
};

export type InputCityPropsType = {
  refInput: React.RefObject<HTMLInputElement | null>;
  selectedCity: SelectedCityType;
  handleCityChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleEnterKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleInputFocus: React.FocusEventHandler<HTMLInputElement>;
};

export type ListAvailableCityNamesPropsType = {
  selectedCity: SelectedCityType;
  setSelectedCity: React.Dispatch<React.SetStateAction<SelectedCityType>>;
  setIsSearchCity: React.Dispatch<React.SetStateAction<boolean>>;
};

export type UseListCitiesPropsType = ListAvailableCityNamesPropsType;

export type InfoCity = {
  name: string;
  countryCode: string;
  lng: number;
  lat: number;
  geonameId: string;
  toponymName: string;
};
