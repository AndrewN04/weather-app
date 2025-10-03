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
