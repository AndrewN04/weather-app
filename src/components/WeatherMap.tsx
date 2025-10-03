'use client';

import { useEffect, useRef } from 'react';
import { useAppSelector } from '@/store/hooks';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

export default function WeatherMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const { selectedLocation, currentWeather } = useAppSelector((state) => state.weather);

  useEffect(() => {
    if (!MAPBOX_TOKEN || !mapContainer.current) return;

    const lat = selectedLocation?.latitude || currentWeather?.location.latitude || 40.7128;
    const lon = selectedLocation?.longitude || currentWeather?.location.longitude || -74.0060;

    if (!map.current) {
      mapboxgl.accessToken = MAPBOX_TOKEN;
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/dark-v11',
        center: [lon, lat],
        zoom: 8,
      });

      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

      map.current.on('load', () => {
        if (!map.current) return;

        // Add weather radar layer from OpenWeatherMap
        map.current.addSource('openweather', {
          type: 'raster',
          tiles: [
            `https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`,
          ],
          tileSize: 256,
        });

        map.current.addLayer({
          id: 'openweather-precipitation',
          type: 'raster',
          source: 'openweather',
          paint: {
            'raster-opacity': 0.6,
          },
        });
      });
    }

    // Update map center when location changes
    if (map.current) {
      map.current.setCenter([lon, lat]);
      
      // Remove existing markers
      const markers = document.getElementsByClassName('mapboxgl-marker');
      while (markers[0]) {
        markers[0].remove();
      }

      // Add new marker
      new mapboxgl.Marker({ color: '#3B82F6' })
        .setLngLat([lon, lat])
        .addTo(map.current);
    }
  }, [selectedLocation, currentWeather, MAPBOX_TOKEN]);

  if (!MAPBOX_TOKEN) {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Weather Radar</h2>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-800">
            Please add your Mapbox access token to view the weather map.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Weather Radar</h2>
      <div ref={mapContainer} className="w-full h-[400px] rounded-lg overflow-hidden" />
      <div className="mt-4 flex items-center gap-4 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-400 opacity-60 rounded"></div>
          <span>Precipitation</span>
        </div>
      </div>
    </div>
  );
}
