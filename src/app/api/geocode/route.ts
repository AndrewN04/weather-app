import { NextRequest, NextResponse } from 'next/server';

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query) {
      return NextResponse.json(
        { error: 'Search query is required' },
        { status: 400 }
      );
    }

    if (!API_KEY) {
      return NextResponse.json(
        { error: 'OpenWeatherMap API key not configured' },
        { status: 500 }
      );
    }

    const url = new URL('https://api.openweathermap.org/geo/1.0/direct');
    url.searchParams.append('q', query);
    url.searchParams.append('limit', '5');
    url.searchParams.append('appid', API_KEY);

    const response = await fetch(url.toString());
    
    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }
    
    const data = await response.json();

    const locations = data.map((item: {
      name: string;
      country: string;
      state?: string;
      lat: number;
      lon: number;
    }) => ({
      name: item.name,
      country: item.country,
      state: item.state,
      latitude: item.lat,
      longitude: item.lon,
    }));

    return NextResponse.json(locations);
  } catch (error) {
    console.error('Error searching locations:', error);
    return NextResponse.json(
      { error: 'Failed to search locations' },
      { status: 500 }
    );
  }
}
