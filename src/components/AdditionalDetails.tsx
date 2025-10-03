'use client';

import { WeatherData } from '@/types/weather';
import { useAppSelector } from '@/store/hooks';
import { 
  getPrecipitation, 
  getMoonPhaseDescription,
  getWindSpeed 
} from '@/utils/weather';
import { 
  Wind, 
  Gauge, 
  CloudRain, 
  CloudSnow, 
  Moon,
  Mountain,
  Waves
} from 'lucide-react';

interface AdditionalDetailsProps {
  current: WeatherData['current'];
  moonPhase?: number;
}

export default function AdditionalDetails({ current, moonPhase }: AdditionalDetailsProps) {
  const units = useAppSelector((state) => state.preferences.units);

  const hasRain = current.rain_1h || current.rain_3h;
  const hasSnow = current.snow_1h || current.snow_3h;
  const hasPressureLevels = current.sea_level || current.grnd_level;

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-lg">
      <h2 className="text-xl font-semibold text-white mb-4">Additional Details</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Wind Gust */}
        {current.wind_gust && (
          <div className="flex items-center gap-3 bg-white/5 rounded-lg p-3">
            <Wind className="w-8 h-8 text-cyan-300" />
            <div>
              <p className="text-white/70 text-sm">Wind Gust</p>
              <p className="text-white font-semibold">
                {getWindSpeed(current.wind_gust, units)}
              </p>
            </div>
          </div>
        )}

        {/* Rain Volume */}
        {hasRain && (
          <div className="flex items-center gap-3 bg-white/5 rounded-lg p-3">
            <CloudRain className="w-8 h-8 text-blue-400" />
            <div>
              <p className="text-white/70 text-sm">
                Rain {current.rain_1h ? '(1h)' : '(3h)'}
              </p>
              <p className="text-white font-semibold">
                {getPrecipitation(current.rain_1h || current.rain_3h || 0, units)}
              </p>
            </div>
          </div>
        )}

        {/* Snow Volume */}
        {hasSnow && (
          <div className="flex items-center gap-3 bg-white/5 rounded-lg p-3">
            <CloudSnow className="w-8 h-8 text-blue-200" />
            <div>
              <p className="text-white/70 text-sm">
                Snow {current.snow_1h ? '(1h)' : '(3h)'}
              </p>
              <p className="text-white font-semibold">
                {getPrecipitation(current.snow_1h || current.snow_3h || 0, units)}
              </p>
            </div>
          </div>
        )}

        {/* Sea Level Pressure */}
        {current.sea_level && (
          <div className="flex items-center gap-3 bg-white/5 rounded-lg p-3">
            <Waves className="w-8 h-8 text-teal-300" />
            <div>
              <p className="text-white/70 text-sm">Sea Level</p>
              <p className="text-white font-semibold">{current.sea_level} hPa</p>
            </div>
          </div>
        )}

        {/* Ground Level Pressure */}
        {current.grnd_level && (
          <div className="flex items-center gap-3 bg-white/5 rounded-lg p-3">
            <Mountain className="w-8 h-8 text-gray-300" />
            <div>
              <p className="text-white/70 text-sm">Ground Level</p>
              <p className="text-white font-semibold">{current.grnd_level} hPa</p>
            </div>
          </div>
        )}

        {/* Moon Phase */}
        {moonPhase !== undefined && (
          <div className="flex items-center gap-3 bg-white/5 rounded-lg p-3">
            <Moon className="w-8 h-8 text-yellow-200" />
            <div>
              <p className="text-white/70 text-sm">Moon Phase</p>
              <p className="text-white font-semibold flex items-center gap-1">
                <span className="text-2xl">{getMoonPhaseDescription(moonPhase).emoji}</span>
                <span className="text-xs">{getMoonPhaseDescription(moonPhase).name}</span>
              </p>
            </div>
          </div>
        )}

        {/* Cloud Coverage */}
        {current.clouds !== undefined && (
          <div className="flex items-center gap-3 bg-white/5 rounded-lg p-3">
            <Gauge className="w-8 h-8 text-gray-400" />
            <div>
              <p className="text-white/70 text-sm">Cloud Cover</p>
              <p className="text-white font-semibold">{current.clouds}%</p>
            </div>
          </div>
        )}
      </div>

      {/* Show message if no additional data available */}
      {!current.wind_gust && !hasRain && !hasSnow && !hasPressureLevels && moonPhase === undefined && (
        <p className="text-white/50 text-center py-4">
          No additional weather details available at this time
        </p>
      )}
    </div>
  );
}
