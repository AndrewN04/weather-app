'use client';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setUnits } from '@/store/slices/preferencesSlice';
import { Cloud } from 'lucide-react';

export default function Header() {
  const dispatch = useAppDispatch();
  const { units } = useAppSelector((state) => state.preferences);

  const toggleUnits = () => {
    dispatch(setUnits(units === 'metric' ? 'imperial' : 'metric'));
  };

  return (
    <header className="bg-white/90 backdrop-blur-sm shadow-md">
      <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2 sm:gap-3">
            <Cloud className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500 flex-shrink-0" />
            <h1 className="text-lg sm:text-2xl font-bold text-gray-800">Weather Dashboard</h1>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={toggleUnits}
              className="px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 transition-colors whitespace-nowrap"
            >
              <span className="hidden sm:inline">{units === 'metric' ? '°C' : '°F'} | Switch to {units === 'metric' ? '°F' : '°C'}</span>
              <span className="sm:hidden">{units === 'metric' ? '°C → °F' : '°F → °C'}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
