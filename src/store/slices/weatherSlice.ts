import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { WeatherData, AirQualityData, Location } from '@/types/weather';

interface WeatherState {
  currentWeather: WeatherData | null;
  airQuality: AirQualityData | null;
  selectedLocation: Location | null;
  loading: boolean;
  error: string | null;
}

const initialState: WeatherState = {
  currentWeather: null,
  airQuality: null,
  selectedLocation: null,
  loading: false,
  error: null,
};

export const fetchWeatherData = createAsyncThunk(
  'weather/fetchWeatherData',
  async ({ lat, lon }: { lat: number; lon: number }) => {
    const response = await fetch(`/api/weather?lat=${lat}&lon=${lon}`);
    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }
    return response.json();
  }
);

export const fetchAirQuality = createAsyncThunk(
  'weather/fetchAirQuality',
  async ({ lat, lon }: { lat: number; lon: number }) => {
    const response = await fetch(`/api/air-quality?lat=${lat}&lon=${lon}`);
    if (!response.ok) {
      throw new Error('Failed to fetch air quality data');
    }
    return response.json();
  }
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setSelectedLocation: (state, action: PayloadAction<Location>) => {
      state.selectedLocation = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeatherData.fulfilled, (state, action) => {
        state.loading = false;
        state.currentWeather = action.payload;
      })
      .addCase(fetchWeatherData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch weather data';
      })
      .addCase(fetchAirQuality.fulfilled, (state, action) => {
        state.airQuality = action.payload;
      });
  },
});

export const { setSelectedLocation, clearError } = weatherSlice.actions;
export default weatherSlice.reducer;
