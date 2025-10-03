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
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Cloud className="w-8 h-8 text-blue-500" />
            <h1 className="text-2xl font-bold text-gray-800">Weather Dashboard</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={toggleUnits}
              className="px-4 py-2 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 transition-colors"
            >
              {units === 'metric' ? '°C' : '°F'} | Switch to {units === 'metric' ? '°F' : '°C'}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
