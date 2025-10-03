import { NextRequest, NextResponse } from 'next/server';

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
      main: { temp: number; feels_like: number; humidity: number; pressure: number };
      wind: { speed: number; deg: number };
      pop?: number;
      weather: Array<{ id: number; main: string; description: string; icon: string }>;
    }

    const hourlyData = forecastData.list.slice(0, 8).map((item: ForecastItem) => ({
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
        pop: Math.max(...items.map((i: ForecastItem) => i.pop || 0)),
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
