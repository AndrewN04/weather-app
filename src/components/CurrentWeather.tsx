'use client';

import { useAppSelector } from '@/store/hooks';
import { getTemperature, getWindSpeed, getWindDirection, getUVIndexLevel } from '@/utils/weather';
import { formatDate } from '@/utils/date';
import { 
  Droplets, 
  Wind, 
  Eye, 
  Gauge, 
  Sun, 
  Sunrise, 
  Sunset,
  Navigation
} from 'lucide-react';

export default function CurrentWeather() {
  const { currentWeather, selectedLocation } = useAppSelector((state) => state.weather);
  const { units } = useAppSelector((state) => state.preferences);

  if (!currentWeather) {
    return null;
  }

  const { current, location } = currentWeather;
  const weatherIcon = current.weather[0]?.icon;
  const weatherDescription = current.weather[0]?.description || '';

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            {selectedLocation?.name || location.name}
          </h1>
          <p className="text-gray-700 font-medium mt-1">{formatDate(current.dt)}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div className="flex items-center gap-6">
          {weatherIcon && (
            <img
              src={`https://openweathermap.org/img/wn/${weatherIcon}@4x.png`}
              alt={weatherDescription}
              className="w-32 h-32"
            />
          )}
          <div>
            <div className="text-6xl font-bold text-gray-900">
              {getTemperature(current.temp, units)}
            </div>
            <p className="text-xl text-gray-800 font-semibold capitalize mt-2">
              {weatherDescription}
            </p>
            <p className="text-gray-700 font-medium mt-1">
              Feels like {getTemperature(current.feels_like, units)}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <WeatherDetail
            icon={<Droplets className="w-5 h-5" />}
            label="Humidity"
            value={`${current.humidity}%`}
          />
          <WeatherDetail
            icon={<Gauge className="w-5 h-5" />}
            label="Pressure"
            value={`${current.pressure} hPa`}
          />
          <WeatherDetail
            icon={<Wind className="w-5 h-5" />}
            label="Wind Speed"
            value={getWindSpeed(current.wind_speed, units)}
          />
          <WeatherDetail
            icon={<Navigation className="w-5 h-5" />}
            label="Wind Direction"
            value={getWindDirection(current.wind_deg)}
          />
          <WeatherDetail
            icon={<Eye className="w-5 h-5" />}
            label="Visibility"
            value={`${(current.visibility / 1000).toFixed(1)} km`}
          />
          <WeatherDetail
            icon={<Sun className="w-5 h-5" />}
            label="UV Index"
            value={`${current.uvi} (${getUVIndexLevel(current.uvi)})`}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 pt-6 border-t border-gray-200">
        <div className="flex items-center gap-3">
          <Sunrise className="w-8 h-8 text-orange-500" />
          <div>
            <p className="text-sm text-gray-500">Sunrise</p>
            <p className="text-lg font-semibold text-gray-800">
              {new Date(current.sunrise * 1000).toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Sunset className="w-8 h-8 text-purple-500" />
          <div>
            <p className="text-sm text-gray-500">Sunset</p>
            <p className="text-lg font-semibold text-gray-800">
              {new Date(current.sunset * 1000).toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function WeatherDetail({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-2">
      <div className="text-blue-600 mt-1">{icon}</div>
      <div>
        <p className="text-sm font-medium text-gray-600">{label}</p>
        <p className="font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
}
