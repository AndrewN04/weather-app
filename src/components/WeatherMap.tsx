'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { useAppSelector } from '@/store/hooks';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Leaflet
const iconDefault = L.Icon.Default.prototype;
if (iconDefault && '_getIconUrl' in iconDefault) {
  delete (iconDefault as { _getIconUrl?: unknown })._getIconUrl;
}
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Component to update map center when location changes
function MapUpdater({ center }: { center: [number, number] }) {
  const map = useMap();
  
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  
  return null;
}

export default function WeatherMap() {
  const { selectedLocation, currentWeather } = useAppSelector((state) => state.weather);

  const lat = selectedLocation?.latitude || currentWeather?.location.latitude || 40.7128;
  const lon = selectedLocation?.longitude || currentWeather?.location.longitude || -74.0060;
  const locationName = selectedLocation?.name || currentWeather?.location.name || 'New York';

  const center: [number, number] = [lat, lon];

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">Weather Radar</h2>
      <div className="w-full h-[250px] sm:h-[400px] rounded-lg overflow-hidden">
        <MapContainer
          center={center}
          zoom={8}
          style={{ height: '100%', width: '100%' }}
          zoomControl={true}
        >
          {/* Base map layer from OpenStreetMap */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {/* Weather radar layer from OpenWeatherMap */}
          <TileLayer
            url={`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`}
            opacity={0.6}
            attribution='Weather data &copy; <a href="https://openweathermap.org/">OpenWeatherMap</a>'
          />
          
          {/* Location marker */}
          <Marker position={center}>
            <Popup>{locationName}</Popup>
          </Marker>
          
          {/* Update map when location changes */}
          <MapUpdater center={center} />
        </MapContainer>
      </div>
      <div className="mt-4 flex items-center gap-4 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-400 opacity-60 rounded"></div>
          <span>Precipitation</span>
        </div>
        <div className="text-xs text-gray-500">
          Powered by OpenStreetMap
        </div>
      </div>
    </div>
  );
}
