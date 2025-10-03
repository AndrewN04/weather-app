'use client';

import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { useAppSelector } from '@/store/hooks';
import { formatHour } from '@/utils/date';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function TemperatureChart() {
  const { currentWeather } = useAppSelector((state) => state.weather);
  const { units } = useAppSelector((state) => state.preferences);

  if (!currentWeather?.hourly) {
    return null;
  }

  const hourlyData = currentWeather.hourly.slice(0, 24);
  
  const labels = hourlyData.map((hour, index) => 
    index === 0 ? 'Now' : formatHour(hour.dt)
  );

  const temperatures = hourlyData.map((hour) => {
    if (units === 'imperial') {
      return (hour.temp * 9) / 5 + 32;
    }
    return hour.temp;
  });

  const feelsLike = hourlyData.map((hour) => {
    if (units === 'imperial') {
      return (hour.feels_like * 9) / 5 + 32;
    }
    return hour.feels_like;
  });

  const data = {
    labels,
    datasets: [
      {
        label: 'Temperature',
        data: temperatures,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Feels Like',
        data: feelsLike,
        borderColor: 'rgb(249, 115, 22)',
        backgroundColor: 'rgba(249, 115, 22, 0.1)',
        fill: true,
        tension: 0.4,
        borderDash: [5, 5],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context: { dataset: { label?: string }; parsed: { y: number } }) {
            return `${context.dataset.label || ''}: ${Math.round(context.parsed.y)}°${
              units === 'imperial' ? 'F' : 'C'
            }`;
          },
        },
      },
    },
    scales: {
      y: {
        ticks: {
          callback: function (value: string | number) {
            return `${Math.round(Number(value))}°${units === 'imperial' ? 'F' : 'C'}`;
          },
        },
      },
    },
  } as const;

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 overflow-hidden">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Temperature Trend</h2>
      <div className="h-[200px] sm:h-[250px] md:h-[300px] w-full">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
