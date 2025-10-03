import { Units } from '@/types/weather';

export const getTemperature = (temp: number, units: Units): string => {
  if (units === 'imperial') {
    return `${Math.round((temp * 9) / 5 + 32)}°F`;
  }
  return `${Math.round(temp)}°C`;
};

export const getWindSpeed = (speed: number, units: Units): string => {
  if (units === 'imperial') {
    return `${Math.round(speed * 2.237)} mph`;
  }
  return `${Math.round(speed * 3.6)} km/h`;
};

export const getWindDirection = (deg: number): string => {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const index = Math.round(deg / 45) % 8;
  return directions[index];
};

export const getVisibility = (visibility: number, units: Units): string => {
  if (units === 'imperial') {
    return `${(visibility / 1609).toFixed(1)} mi`;
  }
  return `${(visibility / 1000).toFixed(1)} km`;
};

export const getPrecipitation = (mm: number, units: Units): string => {
  if (units === 'imperial') {
    return `${(mm / 25.4).toFixed(2)} in`;
  }
  return `${mm.toFixed(1)} mm`;
};

export const getUVIndexLevel = (uvi: number): string => {
  if (uvi <= 2) return 'Low';
  if (uvi <= 5) return 'Moderate';
  if (uvi <= 7) return 'High';
  if (uvi <= 10) return 'Very High';
  return 'Extreme';
};

export const getAQILevel = (aqi: number): { level: string; color: string; description: string } => {
  const levels = [
    { level: 'Good', color: 'bg-green-500', description: 'Air quality is satisfactory' },
    { level: 'Fair', color: 'bg-yellow-500', description: 'Air quality is acceptable' },
    { level: 'Moderate', color: 'bg-orange-500', description: 'Unhealthy for sensitive groups' },
    { level: 'Poor', color: 'bg-red-500', description: 'Unhealthy air quality' },
    { level: 'Very Poor', color: 'bg-purple-500', description: 'Very unhealthy air quality' },
  ];
  return levels[aqi - 1] || levels[0];
};

export const getWeatherBackground = (weatherId: number, isDay: boolean): string => {
  // Thunderstorm
  if (weatherId >= 200 && weatherId < 300) {
    return 'from-gray-800 via-gray-700 to-gray-900';
  }
  // Drizzle
  if (weatherId >= 300 && weatherId < 400) {
    return isDay
      ? 'from-blue-300 via-blue-200 to-gray-300'
      : 'from-blue-900 via-gray-800 to-gray-900';
  }
  // Rain
  if (weatherId >= 500 && weatherId < 600) {
    return isDay
      ? 'from-gray-400 via-gray-500 to-blue-400'
      : 'from-gray-800 via-gray-900 to-blue-900';
  }
  // Snow
  if (weatherId >= 600 && weatherId < 700) {
    return isDay
      ? 'from-blue-100 via-blue-200 to-white'
      : 'from-blue-900 via-gray-800 to-gray-900';
  }
  // Atmosphere (mist, fog, etc.)
  if (weatherId >= 700 && weatherId < 800) {
    return isDay
      ? 'from-gray-300 via-gray-400 to-gray-500'
      : 'from-gray-700 via-gray-800 to-gray-900';
  }
  // Clear
  if (weatherId === 800) {
    return isDay
      ? 'from-blue-400 via-blue-300 to-cyan-200'
      : 'from-indigo-900 via-blue-900 to-gray-900';
  }
  // Clouds
  if (weatherId > 800) {
    return isDay
      ? 'from-gray-400 via-gray-300 to-blue-300'
      : 'from-gray-700 via-gray-800 to-blue-900';
  }
  return isDay
    ? 'from-blue-400 via-blue-300 to-cyan-200'
    : 'from-indigo-900 via-blue-900 to-gray-900';
};

/**
 * Calculate dew point temperature using Magnus formula
 * @param temp Temperature in Celsius
 * @param humidity Relative humidity (0-100)
 * @returns Dew point in Celsius
 */
export const calculateDewPoint = (temp: number, humidity: number): number => {
  const a = 17.27;
  const b = 237.7;
  const alpha = ((a * temp) / (b + temp)) + Math.log(humidity / 100);
  const dewPoint = (b * alpha) / (a - alpha);
  return Math.round(dewPoint * 10) / 10;
};

/**
 * Calculate moon phase from timestamps
 * @param dt Current timestamp
 * @returns Moon phase value between 0 and 1
 */
export const calculateMoonPhase = (dt: number): number => {
  // Known new moon date: January 6, 2000, 18:14 UTC
  const knownNewMoon = new Date('2000-01-06T18:14:00Z').getTime() / 1000;
  const lunarCycle = 29.53058867; // days
  const daysSinceNewMoon = (dt - knownNewMoon) / 86400;
  const phase = (daysSinceNewMoon % lunarCycle) / lunarCycle;
  return Math.round(phase * 100) / 100;
};

/**
 * Get moon phase description
 * @param phase Moon phase value (0-1)
 * @returns Phase name and emoji
 */
export const getMoonPhaseDescription = (phase: number): { name: string; emoji: string } => {
  if (phase < 0.03 || phase > 0.97) return { name: 'New Moon', emoji: '🌑' };
  if (phase < 0.22) return { name: 'Waxing Crescent', emoji: '🌒' };
  if (phase < 0.28) return { name: 'First Quarter', emoji: '🌓' };
  if (phase < 0.47) return { name: 'Waxing Gibbous', emoji: '🌔' };
  if (phase < 0.53) return { name: 'Full Moon', emoji: '🌕' };
  if (phase < 0.72) return { name: 'Waning Gibbous', emoji: '🌖' };
  if (phase < 0.78) return { name: 'Last Quarter', emoji: '🌗' };
  return { name: 'Waning Crescent', emoji: '🌘' };
};

/**
 * Calculate wind chill temperature (feels colder due to wind)
 * Only applicable when temp is below 10°C and wind speed > 4.8 km/h
 * @param temp Temperature in Celsius
 * @param windSpeed Wind speed in m/s
 * @returns Wind chill in Celsius or null if not applicable
 */
export const calculateWindChill = (temp: number, windSpeed: number): number | null => {
  const windKmh = windSpeed * 3.6;
  if (temp > 10 || windKmh <= 4.8) return null;
  
  const windChill = 13.12 + (0.6215 * temp) - (11.37 * Math.pow(windKmh, 0.16)) + (0.3965 * temp * Math.pow(windKmh, 0.16));
  return Math.round(windChill * 10) / 10;
};

/**
 * Calculate heat index (feels hotter due to humidity)
 * Only applicable when temp is above 27°C
 * @param temp Temperature in Celsius
 * @param humidity Relative humidity (0-100)
 * @returns Heat index in Celsius or null if not applicable
 */
export const calculateHeatIndex = (temp: number, humidity: number): number | null => {
  if (temp < 27) return null;
  
  const T = (temp * 9/5) + 32; // Convert to Fahrenheit for calculation
  const RH = humidity;
  
  let HI = -42.379 + (2.04901523 * T) + (10.14333127 * RH) - (0.22475541 * T * RH);
  HI += -0.00683783 * T * T - 0.05481717 * RH * RH + 0.00122874 * T * T * RH;
  HI += 0.00085282 * T * RH * RH - 0.00000199 * T * T * RH * RH;
  
  const heatIndexC = (HI - 32) * 5/9; // Convert back to Celsius
  return Math.round(heatIndexC * 10) / 10;
};
