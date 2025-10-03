'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchWeatherData, fetchAirQuality } from '@/store/slices/weatherSlice';
import { getWeatherBackground } from '@/utils/weather';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import CurrentWeather from '@/components/CurrentWeather';
import HourlyForecast from '@/components/HourlyForecast';
import DailyForecast from '@/components/DailyForecast';
import AirQuality from '@/components/AirQuality';
import WeatherAlerts from '@/components/WeatherAlerts';
import WeatherMap from '@/components/WeatherMap';
import TemperatureChart from '@/components/TemperatureChart';
import AdditionalDetails from '@/components/AdditionalDetails';
import { Loader2 } from 'lucide-react';

export default function Home() {
  const dispatch = useAppDispatch();
  const { currentWeather, loading } = useAppSelector((state) => state.weather);

  useEffect(() => {
    // Get user's location on mount
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          dispatch(fetchWeatherData({ lat: latitude, lon: longitude }));
          dispatch(fetchAirQuality({ lat: latitude, lon: longitude }));
        },
        () => {
          // Geolocation denied or failed - use default location
          console.warn('Geolocation denied or unavailable. Using default location (New York).');
          dispatch(fetchWeatherData({ lat: 40.7128, lon: -74.0060 }));
          dispatch(fetchAirQuality({ lat: 40.7128, lon: -74.0060 }));
        },
        {
          enableHighAccuracy: false,
          timeout: 5000,
          maximumAge: 0
        }
      );
    } else {
      // Default to New York if geolocation is not supported
      console.warn('Geolocation not supported. Using default location (New York).');
      dispatch(fetchWeatherData({ lat: 40.7128, lon: -74.0060 }));
      dispatch(fetchAirQuality({ lat: 40.7128, lon: -74.0060 }));
    }
  }, [dispatch]);

  const weatherId = currentWeather?.current.weather[0]?.id || 800;
  const isDay = currentWeather
    ? currentWeather.current.dt > currentWeather.current.sunrise &&
      currentWeather.current.dt < currentWeather.current.sunset
    : true;
  const backgroundGradient = getWeatherBackground(weatherId, isDay);

  return (
    <div className={`min-h-screen bg-gradient-to-br ${backgroundGradient}`}>
      <Header />
      
      <main className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
        <div className="mb-4 sm:mb-8">
          <SearchBar />
        </div>

        {loading && !currentWeather ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <Loader2 className="w-12 h-12 text-white animate-spin mx-auto mb-4" />
              <p className="text-white text-lg">Loading weather data...</p>
            </div>
          </div>
        ) : currentWeather ? (
          <div className="space-y-3 sm:space-y-6">
            <WeatherAlerts />
            
            <CurrentWeather />
            
            <AdditionalDetails 
              current={currentWeather.current}
              moonPhase={currentWeather.daily[0]?.moon_phase}
            />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-6">
              <HourlyForecast />
              <TemperatureChart />
            </div>

            <DailyForecast />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-6">
              <AirQuality />
              <WeatherMap />
            </div>
          </div>
        ) : (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 text-center">
            <p className="text-gray-600 text-lg">
              Search for a location or enable location services to view weather data.
            </p>
          </div>
        )}
      </main>

      <footer className="bg-black/20 backdrop-blur-sm text-white py-4 sm:py-6 mt-6 sm:mt-12">
        <div className="container mx-auto px-3 sm:px-4 text-center">
          <p className="text-xs sm:text-sm">
            Weather data provided by{' '}
            <a
              href="https://openweathermap.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-blue-300"
            >
              OpenWeatherMap
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
