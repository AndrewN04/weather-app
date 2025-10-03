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

    const url = new URL('https://api.openweathermap.org/data/2.5/air_pollution');
    url.searchParams.append('lat', lat);
    url.searchParams.append('lon', lon);
    url.searchParams.append('appid', API_KEY);

    const response = await fetch(url.toString());
    
    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }
    
    const data = await response.json();
    const airQualityData = data.list[0];
    
    return NextResponse.json({
      aqi: airQualityData.main.aqi,
      components: airQualityData.components,
      dt: airQualityData.dt,
    });
  } catch (error) {
    console.error('Error fetching air quality data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch air quality data' },
      { status: 500 }
    );
  }
}
