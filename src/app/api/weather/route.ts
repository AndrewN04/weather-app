import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const lat = searchParams.get('lat');
    const lon = searchParams.get('lon');

    if (!lat || !lon) {
      return NextResponse.json(
        { error: 'Latitude and longitude are required' },
        { status: 400 }
      );
    }

    if (!API_KEY) {
      return NextResponse.json(
        { error: 'OpenWeatherMap API key not configured' },
        { status: 500 }
      );
    }

    // Fetch current weather data (Free tier)
    const currentWeatherResponse = await axios.get(
      'https://api.openweathermap.org/data/2.5/weather',
      {
        params: {
          lat,
          lon,
          appid: API_KEY,
          units: 'metric',
        },
      }
    );

    // Fetch 5-day forecast (Free tier - includes 3-hour intervals)
    const forecastResponse = await axios.get(
      'https://api.openweathermap.org/data/2.5/forecast',
      {
        params: {
          lat,
          lon,
          appid: API_KEY,
          units: 'metric',
        },
      }
    );

    // Fetch location name using reverse geocoding
    const geocodeResponse = await axios.get(
      'https://api.openweathermap.org/geo/1.0/reverse',
      {
        params: {
          lat,
          lon,
          limit: 1,
          appid: API_KEY,
        },
      }
    );

    const locationData = geocodeResponse.data[0] || {};
    const currentData = currentWeatherResponse.data;
    const forecastData = forecastResponse.data;

    // Process hourly data from 3-hour forecast
    const hourlyData = forecastData.list.slice(0, 8).map((item: any) => ({
      dt: item.dt,
      temp: item.main.temp,
      feels_like: item.main.feels_like,
      humidity: item.main.humidity,
      wind_speed: item.wind.speed,
      wind_deg: item.wind.deg,
      pop: item.pop || 0,
      weather: item.weather,
    }));

    // Process daily data - group by day
    const dailyMap = new Map();
    forecastData.list.forEach((item: any) => {
      const date = new Date(item.dt * 1000).toDateString();
      if (!dailyMap.has(date)) {
        dailyMap.set(date, []);
      }
      dailyMap.get(date).push(item);
    });

    const dailyData = Array.from(dailyMap.entries()).slice(0, 7).map(([date, items]: [string, any[]]) => {
      const temps = items.map((i: any) => i.main.temp);
      const firstItem = items[0];
      
      return {
        dt: firstItem.dt,
        sunrise: currentData.sys.sunrise,
        sunset: currentData.sys.sunset,
        temp: {
          day: temps.reduce((a: number, b: number) => a + b) / temps.length,
          min: Math.min(...temps),
          max: Math.max(...temps),
          night: temps[temps.length - 1],
          eve: temps[Math.floor(temps.length / 2)],
          morn: temps[0],
        },
        feels_like: {
          day: firstItem.main.feels_like,
          night: items[items.length - 1]?.main.feels_like || firstItem.main.feels_like,
          eve: items[Math.floor(items.length / 2)]?.main.feels_like || firstItem.main.feels_like,
          morn: firstItem.main.feels_like,
        },
        pressure: firstItem.main.pressure,
        humidity: firstItem.main.humidity,
        wind_speed: firstItem.wind.speed,
        wind_deg: firstItem.wind.deg,
        pop: Math.max(...items.map((i: any) => i.pop || 0)),
        weather: firstItem.weather,
        uvi: 0, // UV index not available in free tier
      };
    });

    const response = {
      location: {
        name: locationData.name || currentData.name || 'Unknown',
        country: locationData.country || currentData.sys?.country || '',
        latitude: parseFloat(lat),
        longitude: parseFloat(lon),
        timezone: currentData.timezone ? `UTC${currentData.timezone / 3600}` : 'UTC',
      },
      current: {
        dt: currentData.dt,
        sunrise: currentData.sys.sunrise,
        sunset: currentData.sys.sunset,
        temp: currentData.main.temp,
        feels_like: currentData.main.feels_like,
        pressure: currentData.main.pressure,
        humidity: currentData.main.humidity,
        clouds: currentData.clouds.all,
        uvi: 0, // UV index not available in free tier
        visibility: currentData.visibility,
        wind_speed: currentData.wind.speed,
        wind_deg: currentData.wind.deg,
        weather: currentData.weather,
      },
      hourly: hourlyData,
      daily: dailyData,
      alerts: [], // Alerts not available in free tier
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch weather data' },
      { status: 500 }
    );
  }
}
