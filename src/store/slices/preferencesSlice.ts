import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Units, UserPreferences } from '@/types/weather';

const initialState: UserPreferences = {
  units: 'metric',
};

const preferencesSlice = createSlice({
  name: 'preferences',
  initialState,
  reducers: {
    setUnits: (state, action: PayloadAction<Units>) => {
      state.units = action.payload;
    },
  },
});

export const { setUnits } = preferencesSlice.actions;
export default preferencesSlice.reducer;
