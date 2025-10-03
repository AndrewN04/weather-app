import { NextRequest, NextResponse } from 'next/server';

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

// Detect if query is a ZIP code (5 digits for US, or postal codes with country code like "10001,US")
function isZipCode(query: string): boolean {
  // Match: 5 digits OR postal_code,country_code format
  return /^\d{5}$/.test(query.trim()) || /^[\w\s-]+,\s*[A-Z]{2}$/i.test(query.trim());
}

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

    let url: URL;
    let response: Response;
    let data: unknown;

    // Check if query is a ZIP code
    if (isZipCode(query)) {
      // Use ZIP code endpoint
      url = new URL('https://api.openweathermap.org/geo/1.0/zip');
      
      // If only 5 digits, assume US
      const zipQuery = /^\d{5}$/.test(query.trim()) ? `${query},US` : query;
      url.searchParams.append('zip', zipQuery);
      url.searchParams.append('appid', API_KEY);

      response = await fetch(url.toString());
      
      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`);
      }
      
      data = await response.json();

      // ZIP endpoint returns a single location object, not an array
      const zipData = data as {
        name: string;
        country: string;
        lat: number;
        lon: number;
        zip?: string;
      };

      const locations = [{
        name: zipData.name,
        country: zipData.country,
        state: undefined,
        latitude: zipData.lat,
        longitude: zipData.lon,
      }];

      return NextResponse.json(locations);
    } else {
      // Use direct geocoding endpoint for city names
      url = new URL('https://api.openweathermap.org/geo/1.0/direct');
      url.searchParams.append('q', query);
      url.searchParams.append('limit', '5');
      url.searchParams.append('appid', API_KEY);

      response = await fetch(url.toString());
      
      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`);
      }
      
      data = await response.json();

      const locations = (data as Array<{
        name: string;
        country: string;
        state?: string;
        lat: number;
        lon: number;
      }>).map((item) => ({
        name: item.name,
        country: item.country,
        state: item.state,
        latitude: item.lat,
        longitude: item.lon,
      }));

      return NextResponse.json(locations);
    }
  } catch (error) {
    console.error('Error searching locations:', error);
    return NextResponse.json(
      { error: 'Failed to search locations' },
      { status: 500 }
    );
  }
}
