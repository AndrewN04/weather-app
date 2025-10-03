'use client';

import { useAppSelector } from '@/store/hooks';
import { getTemperature } from '@/utils/weather';
import { formatHour } from '@/utils/date';
import { Droplets, Wind } from 'lucide-react';

export default function HourlyForecast() {
  const { currentWeather } = useAppSelector((state) => state.weather);
  const { units } = useAppSelector((state) => state.preferences);

  if (!currentWeather) {
    return null;
  }

  const { hourly } = currentWeather;

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 overflow-hidden">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">24-Hour Forecast</h2>
      
      <div className="-mx-4 sm:-mx-6 px-4 sm:px-6">
        <div className="flex overflow-x-auto gap-3 sm:gap-6 pb-3 sm:pb-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          {hourly.slice(0, 24).map((hour, index) => (
          <div
            key={index}
            className="flex flex-col items-center min-w-[90px] sm:min-w-[110px] p-3 sm:p-4 rounded-lg bg-gradient-to-b from-blue-100 to-white border border-blue-200"
          >
            <p className="text-base sm:text-lg font-semibold text-gray-800 mb-2">
              {index === 0 ? 'Now' : formatHour(hour.dt)}
            </p>
            
            {hour.weather[0]?.icon && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}.png`}
                alt={hour.weather[0]?.description}
                className="w-14 h-14 sm:w-16 sm:h-16"
              />
            )}
            
            <p className="text-xl sm:text-2xl font-bold text-gray-900 my-2">
              {getTemperature(hour.temp, units)}
            </p>
            
            <div className="flex items-center gap-1 text-blue-600 mb-1">
              <Droplets className="w-4 h-4" />
              <span className="text-sm font-semibold">{Math.round(hour.pop * 100)}%</span>
            </div>
            
            <div className="flex items-center gap-1 text-gray-700">
              <Wind className="w-4 h-4" />
              <span className="text-sm font-semibold">{Math.round(hour.wind_speed)} m/s</span>
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}
