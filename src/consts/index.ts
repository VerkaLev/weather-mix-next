export const API_KEYS = {
  weatherAPI: process.env.WEATHER_API_KEY || '',
  tomorrowIo: process.env.TOMORROW_IO_API_KEY || '',
  openWeatherMap: process.env.OPEN_WEATHER_MAP_API_KEY || '',
  visualCrossing: process.env.VISUAL_CROSSING_API_KEY || '',
  weatherbit: process.env.WEATHERBIT_IO_API_KEY || '',
};

export const position = {
  'sunny-day': 'center 50%',
  'sunny-night': 'center top',
  'cloudy-day': 'center top',
  'cloudy-night': 'center top',
  'mist-day': 'center top',
  'mist-night': 'center 30%',
  'rain-day': 'center bottom',
  'rain-night': 'center bottom',
  'snow-day': 'center bottom',
  'snow-night': 'center bottom',
  'storm-day': 'center bottom',
  'storm-night': 'center 48%',
};

export const bgColor = {
  'sunny-day': '#6a85b8',
  'sunny-night': '#0b1431',
  'cloudy-day': ' #c9cedf',
  'cloudy-night': '#41343d',
  'mist-day': ' #ada290',
  'mist-night': '#545e6a',
  'rain-day': '#627368',
  'rain-night': '#2f4636',
  'snow-day': '#dae1e7',
  'snow-night': '#69666a',
  'storm-day': '#a7b1ae',
  'storm-night': '#474e4e',
};

export const valenciaInfo = {
  name: 'Valencia',
  lat: 39.4699,
  lon: -0.3763,
  countryCode: 'ES',
  id: '2509954',
};

export const conditionsWeather = [
  {
    mainCode: 1000,
    condition: 'sunny',
    text: 'sunny / clear',
    codes: [1000, 800, 'clear-day', 'clear-night'],
  },
  {
    mainCode: 1003,
    condition: 'sunny',
    text: 'partly cloudy',
    codes: [1003, 801, 802, 1100, 'partly-cloudy-day', 'partly-cloudy-night'],
  },
  {
    mainCode: 1006,
    condition: 'cloudy',
    text: 'cloudy',
    codes: [1006, 803, 1101, 1102, 'cloudy'],
  },

  {
    mainCode: 1009,
    condition: 'cloudy',
    text: 'overcast',
    codes: [1009, 804, 1001, 'overcast', 'wind'],
  },

  {
    mainCode: 1030,
    condition: 'mist',
    text: 'mist',
    codes: [1030, 700, 701, 721, 731, 2000],
  },
  {
    mainCode: 1135,
    condition: 'mist',
    text: 'fog',
    codes: [1135, 711, 741, 2100, 'fog'],
  },
  {
    mainCode: 1147,
    condition: 'mist',
    text: 'freezing fog',
    codes: [1147, 751, 761, 762, 771, 781],
  },

  {
    mainCode: 1063,
    condition: 'rain',
    text: 'patchy rain possible',
    codes: [1063, 4000, 4200, 'showers-day', 'showers-night'],
  },
  {
    mainCode: 1072,
    condition: 'rain',
    text: 'patchy freezing drizzle possible',
    codes: [1072],
  },
  {
    mainCode: 1150,
    condition: 'rain',
    text: 'patchy light drizzle',
    codes: [1150, 310],
  },
  {
    mainCode: 1153,
    condition: 'rain',
    text: 'light drizzle',
    codes: [1153, 311],
  },
  {
    mainCode: 1168,
    condition: 'rain',
    text: 'freezing drizzle',
    codes: [1168, 312],
  },
  {
    mainCode: 1180,
    condition: 'rain',
    text: 'patchy light rain',
    codes: [1180],
  },
  {
    mainCode: 1183,
    condition: 'rain',
    text: 'light rain',
    codes: [1183, 300, 500, 4200, 500],
  },
  {
    mainCode: 1186,
    condition: 'rain',
    text: 'moderate rain at times',
    codes: [1186],
  },
  {
    mainCode: 1189,
    condition: 'rain',
    text: 'moderate rain',
    codes: [1189, 301, 501, 4001],
  },
  {
    mainCode: 1198,
    condition: 'rain',
    text: 'light freezing rain',
    codes: [1198, 511],
  },
  {
    mainCode: 1240,
    condition: 'rain',
    text: 'light rain shower',
    codes: [1240, 520],
  },
  {
    mainCode: 1249,
    condition: 'rain',
    text: 'light sleet showers',
    codes: [1249, 6000, 6001, 6200, 615, 616, 313, 'sleet'],
  },
  {
    mainCode: 1171,
    condition: 'rain',
    text: 'heavy freezing drizzle',
    codes: [1171, 6201, 314, 321],
  },
  {
    mainCode: 1192,
    condition: 'rain',
    text: 'heavy rain at times',
    codes: [1192, 4201, 531],
  },
  {
    mainCode: 1195,
    condition: 'rain',
    text: 'heavy rain',
    codes: [1195, 302, 502, 503, 504, 900, 'rain'],
  },
  {
    mainCode: 1201,
    condition: 'rain',
    text: 'moderate or heavy freezing rain',
    codes: [1201],
  },
  {
    mainCode: 1243,
    condition: 'rain',
    text: 'moderate or heavy rain shower',
    codes: [1243, 521],
  },
  {
    mainCode: 1246,
    condition: 'rain',
    text: 'torrential rain shower',
    codes: [1246, 522],
  },
  {
    mainCode: 1252,
    condition: 'rain',
    text: 'moderate or heavy sleet showers',
    codes: [1252],
  },

  {
    mainCode: 1066,
    condition: 'snow',
    text: 'patchy snow possible',
    codes: [1066, 5000],
  },
  {
    mainCode: 1069,
    condition: 'snow',
    text: 'patchy sleet possible',
    codes: [1069],
  },
  { mainCode: 1117, condition: 'snow', text: 'blizzard', codes: [1117] },
  {
    mainCode: 1204,
    condition: 'snow',
    text: 'light sleet',
    codes: [1204, 610],
  },
  {
    mainCode: 1207,
    condition: 'snow',
    text: 'moderate or heavy sleet',
    codes: [1207],
  },
  {
    mainCode: 1210,
    condition: 'snow',
    text: 'patchy light snow',
    codes: [1210, 5001, 5100],
  },
  {
    mainCode: 1213,
    condition: 'snow',
    text: 'light snow',
    codes: [1213, 600, 620],
  },
  {
    mainCode: 1216,
    condition: 'snow',
    text: 'patchy moderate snow',
    codes: [1216],
  },
  {
    mainCode: 1219,
    condition: 'snow',
    text: 'moderate snow',
    codes: [1219, 601, 'snow'],
  },
  {
    mainCode: 1255,
    condition: 'snow',
    text: 'light snow showers',
    codes: [1255, 621],
  },
  {
    mainCode: 1258,
    condition: 'snow',
    text: 'moderate or heavy snow showers',
    codes: [1258],
  },
  {
    mainCode: 1279,
    condition: 'snow',
    text: 'patchy light snow with thunder',
    codes: [1279],
  },
  {
    mainCode: 1222,
    condition: 'snow',
    text: 'patchy heavy snow',
    codes: [1222, 622, 623, 5101],
  },
  { mainCode: 1225, condition: 'snow', text: 'heavy snow', codes: [1225, 602] },
  {
    mainCode: 1282,
    condition: 'snow',
    text: 'moderate or heavy snow with thunder',
    codes: [1282],
  },
  { mainCode: 611, condition: 'snow', text: 'sleet', codes: [611, 612, 613] },

  {
    mainCode: 1087,
    condition: 'storm',
    text: 'thundery outbreaks possible',
    codes: [1087, 211, 221],
  },
  {
    mainCode: 1273,
    condition: 'storm',
    text: 'patchy light rain with thunder',
    codes: [1273, 200, 201, 210, 230, 231, 8000],
  },

  {
    mainCode: 1276,
    condition: 'storm',
    text: 'moderate or heavy rain with thunder',
    codes: [1276, 202, 232, 212, 'thunderstorm'],
  },
  {
    mainCode: 1237,
    condition: 'storm',
    text: 'ice pellets',
    codes: [1237, 7000, 'hail'],
  },
  {
    mainCode: 1261,
    condition: 'storm',
    text: 'light showers of ice pellets',
    codes: [1261, 7102],
  },
  {
    mainCode: 1264,
    condition: 'storm',
    text: 'moderate or heavy showers of ice pellets',
    codes: [1264, 7101],
  },
  {
    mainCode: 233,
    condition: 'storm',
    text: 'thunderstorm with hail',
    codes: [233, 'tornado', 'hurricane'],
  },
];
