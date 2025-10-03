'use client';

import { useAppSelector } from '@/store/hooks';
import { AlertTriangle } from 'lucide-react';
import { formatDate, formatTime } from '@/utils/date';

export default function WeatherAlerts() {
  const { currentWeather } = useAppSelector((state) => state.weather);

  if (!currentWeather?.alerts || currentWeather.alerts.length === 0) {
    return null;
  }

  const getSeverityColor = (tags: string[]) => {
    if (tags.includes('Extreme')) return 'bg-red-500';
    if (tags.includes('Severe')) return 'bg-orange-500';
    return 'bg-yellow-500';
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle className="w-6 h-6 text-red-500" />
        <h2 className="text-2xl font-bold text-gray-800">Weather Alerts</h2>
      </div>

      <div className="space-y-4">
        {currentWeather.alerts.map((alert, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg border-l-4 ${
              getSeverityColor(alert.tags)
            } border-l-red-500 bg-red-50`}
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-bold text-gray-800">{alert.event}</h3>
              <span className="text-xs text-gray-500">{alert.sender_name}</span>
            </div>
            <p className="text-sm text-gray-700 mb-2">{alert.description}</p>
            <div className="flex gap-4 text-xs text-gray-600">
              <span>
                <strong>Start:</strong> {formatDate(alert.start)} at {formatTime(alert.start)}
              </span>
              <span>
                <strong>End:</strong> {formatDate(alert.end)} at {formatTime(alert.end)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
