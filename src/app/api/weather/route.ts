import { NextRequest, NextResponse } from 'next/server';
import { calculateMoonPhase } from '@/utils/weather';

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

    // Fetch current weather
    const currentWeatherUrl = new URL('https://api.openweathermap.org/data/2.5/weather');
    currentWeatherUrl.searchParams.append('lat', lat);
    currentWeatherUrl.searchParams.append('lon', lon);
    currentWeatherUrl.searchParams.append('units', 'metric');
    currentWeatherUrl.searchParams.append('appid', API_KEY);

    const currentWeatherResponse = await fetch(currentWeatherUrl.toString());
    if (!currentWeatherResponse.ok) {
      throw new Error(`Current weather API responded with status: ${currentWeatherResponse.status}`);
    }
    const currentData = await currentWeatherResponse.json();

    // Fetch 5-day forecast (3-hour intervals)
    const forecastUrl = new URL('https://api.openweathermap.org/data/2.5/forecast');
    forecastUrl.searchParams.append('lat', lat);
    forecastUrl.searchParams.append('lon', lon);
    forecastUrl.searchParams.append('units', 'metric');
    forecastUrl.searchParams.append('appid', API_KEY);

    const forecastResponse = await fetch(forecastUrl.toString());
    if (!forecastResponse.ok) {
      throw new Error(`Forecast API responded with status: ${forecastResponse.status}`);
    }
    const forecastData = await forecastResponse.json();

    // Fetch location name from reverse geocoding
    const geocodeUrl = new URL('https://api.openweathermap.org/geo/1.0/reverse');
    geocodeUrl.searchParams.append('lat', lat);
    geocodeUrl.searchParams.append('lon', lon);
    geocodeUrl.searchParams.append('limit', '1');
    geocodeUrl.searchParams.append('appid', API_KEY);

    const geocodeResponse = await fetch(geocodeUrl.toString());
    const geocodeData = await geocodeResponse.json();
    const locationData = geocodeData[0] || {};

    // Process hourly data from 3-hour forecast
    interface ForecastItem {
      dt: number;
      main: { 
        temp: number; 
        feels_like: number; 
        humidity: number; 
        pressure: number;
        sea_level?: number;
        grnd_level?: number;
      };
      wind: { 
        speed: number; 
        deg: number;
        gust?: number;
      };
      pop?: number;
      rain?: { '1h'?: number; '3h'?: number };
      snow?: { '1h'?: number; '3h'?: number };
      clouds?: { all: number };
      weather: Array<{ id: number; main: string; description: string; icon: string }>;
    }

    const hourlyData = forecastData.list.slice(0, 8).map((item: ForecastItem) => ({
      dt: item.dt,
      temp: item.main.temp,
      feels_like: item.main.feels_like,
      humidity: item.main.humidity,
      pressure: item.main.pressure,
      wind_speed: item.wind.speed,
      wind_deg: item.wind.deg,
      wind_gust: item.wind.gust,
      pop: item.pop || 0,
      weather: item.weather,
      rain_1h: item.rain?.['1h'],
      rain_3h: item.rain?.['3h'],
      snow_1h: item.snow?.['1h'],
      snow_3h: item.snow?.['3h'],
      sea_level: item.main.sea_level,
      grnd_level: item.main.grnd_level,
      clouds: item.clouds?.all,
    }));

    // Process daily data - group by day
    const dailyMap = new Map<string, ForecastItem[]>();
    forecastData.list.forEach((item: ForecastItem) => {
      const dateKey = new Date(item.dt * 1000).toDateString();
      if (!dailyMap.has(dateKey)) {
        dailyMap.set(dateKey, []);
      }
      dailyMap.get(dateKey)!.push(item);
    });

    const dailyData = Array.from(dailyMap.entries()).slice(0, 7).map(([, items]: [string, ForecastItem[]]) => {
      const temps = items.map((i: ForecastItem) => i.main.temp);
      const firstItem = items[0];
      
      // Aggregate rain/snow data for the day
      const totalRain = items.reduce((sum, i) => sum + (i.rain?.['3h'] || 0), 0);
      const totalSnow = items.reduce((sum, i) => sum + (i.snow?.['3h'] || 0), 0);
      const avgTemp = temps.reduce((a: number, b: number) => a + b) / temps.length;
      const avgHumidity = items.reduce((sum, i) => sum + i.main.humidity, 0) / items.length;
      
      return {
        dt: firstItem.dt,
        sunrise: currentData.sys.sunrise,
        sunset: currentData.sys.sunset,
        temp: {
          day: avgTemp,
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
        humidity: avgHumidity,
        wind_speed: firstItem.wind.speed,
        wind_deg: firstItem.wind.deg,
        wind_gust: items.reduce((max, i) => Math.max(max, i.wind.gust || 0), 0) || undefined,
        pop: Math.max(...items.map((i: ForecastItem) => i.pop || 0)),
        weather: firstItem.weather,
        uvi: 0, // UV index not available in free tier
        rain_3h: totalRain > 0 ? totalRain : undefined,
        snow_3h: totalSnow > 0 ? totalSnow : undefined,
        sea_level: firstItem.main.sea_level,
        grnd_level: firstItem.main.grnd_level,
        moon_phase: calculateMoonPhase(firstItem.dt),
        clouds: items.reduce((sum, i) => sum + (i.clouds?.all || 0), 0) / items.length,
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
        wind_gust: currentData.wind.gust,
        weather: currentData.weather,
        rain_1h: currentData.rain?.['1h'],
        rain_3h: currentData.rain?.['3h'],
        snow_1h: currentData.snow?.['1h'],
        snow_3h: currentData.snow?.['3h'],
        sea_level: currentData.main.sea_level,
        grnd_level: currentData.main.grnd_level,
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
