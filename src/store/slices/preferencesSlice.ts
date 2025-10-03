import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Units, UserPreferences, Location } from '@/types/weather';

const initialState: UserPreferences = {
  units: 'metric',
  theme: 'auto',
  favoriteLocations: [],
};

const preferencesSlice = createSlice({
  name: 'preferences',
  initialState,
  reducers: {
    setUnits: (state, action: PayloadAction<Units>) => {
      state.units = action.payload;
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark' | 'auto'>) => {
      state.theme = action.payload;
    },
    addFavoriteLocation: (state, action: PayloadAction<Location>) => {
      const exists = state.favoriteLocations.some(
        (loc) =>
          loc.latitude === action.payload.latitude &&
          loc.longitude === action.payload.longitude
      );
      if (!exists) {
        state.favoriteLocations.push(action.payload);
      }
    },
    removeFavoriteLocation: (state, action: PayloadAction<{ latitude: number; longitude: number }>) => {
      state.favoriteLocations = state.favoriteLocations.filter(
        (loc) =>
          !(loc.latitude === action.payload.latitude && loc.longitude === action.payload.longitude)
      );
    },
  },
});

export const { setUnits, setTheme, addFavoriteLocation, removeFavoriteLocation } =
  preferencesSlice.actions;
export default preferencesSlice.reducer;
