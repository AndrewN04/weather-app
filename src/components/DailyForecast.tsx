'use client';

import { useAppSelector } from '@/store/hooks';
import { getTemperature } from '@/utils/weather';
import { formatShortDate, formatTime } from '@/utils/date';
import { Droplets, Wind, Sunrise, Sunset } from 'lucide-react';

export default function DailyForecast() {
  const { currentWeather } = useAppSelector((state) => state.weather);
  const { units } = useAppSelector((state) => state.preferences);

  if (!currentWeather) {
    return null;
  }

  const { daily } = currentWeather;

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">7-Day Forecast</h2>
      
      <div className="space-y-2 sm:space-y-3">
        {daily.slice(0, 7).map((day, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 rounded-lg bg-gradient-to-r from-blue-100 to-white border border-blue-200 hover:from-blue-200 hover:to-blue-100 transition-colors gap-2 sm:gap-0"
          >
            <div className="flex items-center gap-2 sm:gap-4 flex-1 w-full sm:w-auto">
              <p className="text-xs sm:text-sm font-bold text-gray-900 w-16 sm:w-24">
                {index === 0 ? 'Today' : formatShortDate(day.dt)}
              </p>
              
              {day.weather[0]?.icon && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                  alt={day.weather[0]?.description}
                  className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0"
                  width={48}
                  height={48}
                  loading="lazy"
                />
              )}
              
              <p className="text-sm font-medium text-gray-800 capitalize flex-1">
                {day.weather[0]?.description}
              </p>
            </div>

            <div className="flex items-center gap-3 sm:gap-6 w-full sm:w-auto justify-between sm:justify-start">
              <div className="flex items-center gap-1 sm:gap-2 text-blue-600">
                <Droplets className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="text-xs sm:text-sm font-semibold">{Math.round(day.pop * 100)}%</span>
              </div>
              
              <div className="flex items-center gap-1 sm:gap-2">
                <Wind className="w-3 h-3 sm:w-4 sm:h-4 text-gray-700" />
                <span className="text-xs sm:text-sm font-semibold text-gray-800">{Math.round(day.wind_speed)} m/s</span>
              </div>
              
              <div className="flex gap-2 sm:gap-3 min-w-[100px] sm:min-w-[120px] justify-end">
                <span className="text-xs sm:text-sm font-bold text-gray-900">
                  {getTemperature(day.temp.max, units)}
                </span>
                <span className="text-xs sm:text-sm font-semibold text-gray-700">
                  {getTemperature(day.temp.min, units)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">Sunrise & Sunset Times</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4">
          {currentWeather.daily.slice(0, 4).map((day, index) => (
            <div key={index} className="bg-gradient-to-br from-orange-100 to-yellow-100 rounded-lg p-3 border border-orange-200">
              <p className="text-xs font-semibold text-gray-700 mb-2">
                {index === 0 ? 'Today' : formatShortDate(day.dt)}
              </p>
              <div className="flex items-center gap-2 mb-1">
                <Sunrise className="w-4 h-4 text-orange-600" />
                <span className="text-sm font-semibold text-gray-900">{formatTime(day.sunrise)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Sunset className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-semibold text-gray-900">{formatTime(day.sunset)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
