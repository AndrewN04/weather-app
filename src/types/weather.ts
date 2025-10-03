export interface WeatherData {
  location: {
    name: string;
    country: string;
    latitude: number;
    longitude: number;
    timezone: string;
  };
  current: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
    wind_speed: number;
    wind_deg: number;
    wind_gust?: number;
    visibility: number;
    uvi: number;
    clouds: number;
    dt: number;
    sunrise: number;
    sunset: number;
    rain_1h?: number;
    rain_3h?: number;
    snow_1h?: number;
    snow_3h?: number;
    sea_level?: number;
    grnd_level?: number;
    weather: {
      id: number;
      main: string;
      description: string;
      icon: string;
    }[];
  };
  hourly: HourlyWeather[];
  daily: DailyWeather[];
  alerts?: WeatherAlert[];
  airQuality?: AirQualityData;
}

export interface HourlyWeather {
  dt: number;
  temp: number;
  feels_like: number;
  humidity: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust?: number;
  pop: number;
  rain?: number;
  snow?: number;
  clouds?: number;
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
}

export interface DailyWeather {
  dt: number;
  sunrise: number;
  sunset: number;
  moonrise: number;
  moonset: number;
  moon_phase?: number;
  temp: {
    day: number;
    min: number;
    max: number;
    night: number;
    eve: number;
    morn: number;
  };
  feels_like: {
    day: number;
    night: number;
    eve: number;
    morn: number;
  };
  pressure: number;
  humidity: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust?: number;
  pop: number;
  rain?: number;
  snow?: number;
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  uvi: number;
}

export interface WeatherAlert {
  sender_name: string;
  event: string;
  start: number;
  end: number;
  description: string;
  tags: string[];
}

export interface AirQualityData {
  aqi: number;
  components: {
    co: number;
    no: number;
    no2: number;
    o3: number;
    so2: number;
    pm2_5: number;
    pm10: number;
    nh3: number;
  };
  dt: number;
}

export interface Location {
  name: string;
  country: string;
  state?: string;
  latitude: number;
  longitude: number;
}

export type Units = 'metric' | 'imperial';

export interface UserPreferences {
  units: Units;
}
