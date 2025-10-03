'use client';

import { useAppSelector } from '@/store/hooks';
import { getAQILevel } from '@/utils/weather';
import { Wind } from 'lucide-react';

export default function AirQuality() {
  const { airQuality } = useAppSelector((state) => state.weather);

  if (!airQuality) {
    return null;
  }

  const { level, color, description } = getAQILevel(airQuality.aqi);
  const { components } = airQuality;

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <Wind className="w-6 h-6 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-900">Air Quality Index</h2>
      </div>

      <div className="mb-6">
        <div className="flex items-center gap-4 mb-2">
          <div className={`w-16 h-16 rounded-full ${color} flex items-center justify-center`}>
            <span className="text-2xl font-bold text-white">{airQuality.aqi}</span>
          </div>
          <div>
            <p className="text-xl font-bold text-gray-900">{level}</p>
            <p className="text-sm font-medium text-gray-700">{description}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <PollutantCard label="PM2.5" value={components.pm2_5.toFixed(1)} unit="μg/m³" />
        <PollutantCard label="PM10" value={components.pm10.toFixed(1)} unit="μg/m³" />
        <PollutantCard label="O₃" value={components.o3.toFixed(1)} unit="μg/m³" />
        <PollutantCard label="NO₂" value={components.no2.toFixed(1)} unit="μg/m³" />
      </div>

      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm font-medium text-gray-800">
          <strong>Health Advice:</strong>{' '}
          {airQuality.aqi <= 2
            ? 'Air quality is ideal for outdoor activities.'
            : airQuality.aqi === 3
            ? 'Sensitive groups should consider reducing prolonged outdoor activities.'
            : 'Everyone should reduce outdoor activities.'}
        </p>
      </div>
    </div>
  );
}

function PollutantCard({ label, value, unit }: { label: string; value: string; unit: string }) {
  return (
    <div className="bg-gradient-to-br from-gray-100 to-white rounded-lg p-3 border border-gray-300">
      <p className="text-xs font-semibold text-gray-700 mb-1">{label}</p>
      <p className="text-lg font-bold text-gray-900">{value}</p>
      <p className="text-xs font-medium text-gray-600">{unit}</p>
    </div>
  );
}
