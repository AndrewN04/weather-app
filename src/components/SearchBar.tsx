'use client';

import { useState, useEffect } from 'react';
import { Search, MapPin, Loader2 } from 'lucide-react';
import { Location } from '@/types/weather';
import { useAppDispatch } from '@/store/hooks';
import { setSelectedLocation } from '@/store/slices/weatherSlice';
import { fetchWeatherData, fetchAirQuality } from '@/store/slices/weatherSlice';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Location[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const searchLocations = async () => {
      if (query.length < 2) {
        setResults([]);
        return;
      }

      setIsSearching(true);
      try {
        const response = await fetch(`/api/geocode?q=${encodeURIComponent(query)}`);
        if (!response.ok) {
          throw new Error('Failed to fetch locations');
        }
        const data = await response.json();
        setResults(data);
        setShowResults(true);
      } catch (error) {
        console.error('Error searching locations:', error);
        setResults([]);
      } finally {
        setIsSearching(false);
      }
    };

    const debounce = setTimeout(searchLocations, 300);
    return () => clearTimeout(debounce);
  }, [query]);

  const handleSelectLocation = (location: Location) => {
    dispatch(setSelectedLocation(location));
    dispatch(fetchWeatherData({ lat: location.latitude, lon: location.longitude }));
    dispatch(fetchAirQuality({ lat: location.latitude, lon: location.longitude }));
    setQuery('');
    setShowResults(false);
  };

  const handleUseCurrentLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          dispatch(fetchWeatherData({ lat: latitude, lon: longitude }));
          dispatch(fetchAirQuality({ lat: latitude, lon: longitude }));
          
          // Get location name
          try {
            const response = await fetch(`/api/geocode?q=${latitude},${longitude}`);
            if (response.ok) {
              const data = await response.json();
              if (data.length > 0) {
                dispatch(setSelectedLocation(data[0]));
              }
            }
          } catch (error) {
            console.error('Error getting location name:', error);
          }
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Unable to get your location. Please search for a city instead.');
        }
      );
    }
  };

  return (
    <div className="relative w-full max-w-2xl">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => query.length >= 2 && setShowResults(true)}
            placeholder="Search for a city or ZIP code..."
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 placeholder:text-gray-500 font-medium"
          />
          {isSearching && (
            <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5 animate-spin" />
          )}
        </div>
        <button
          onClick={handleUseCurrentLocation}
          className="px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
          title="Use current location"
        >
          <MapPin className="w-5 h-5" />
          <span className="hidden sm:inline">Current Location</span>
        </button>
      </div>

      {showResults && results.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50">
          {results.map((location, index) => (
            <button
              key={index}
              onClick={() => handleSelectLocation(location)}
              className="w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors border-b border-gray-100 last:border-b-0"
            >
              <div className="font-semibold text-gray-900">{location.name}</div>
              <div className="text-sm text-gray-600">
                {location.state && `${location.state}, `}
                {location.country}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
