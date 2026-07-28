import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type Driver, type DriverSeasonStats } from './types';
import { initialState } from '../dataset/initialState';

export const driverSlice = createSlice({
  name: 'driver',
  initialState,
  reducers: {
    setPlayer: (state, action: PayloadAction<Driver>) => {
      state.player = action.payload;
    },
    clearPlayer: (state) => {
      state.player = null;
    },
    addSeasonToHistory: (state, action: PayloadAction<DriverSeasonStats>) => {
      if (state.player) {
        state.player.seasonStats.unshift(action.payload);
      }
    },
    updateDriverRating: (state, action: PayloadAction<number>) => {
      if (state.player) {
        state.player.rating = Math.max(0, Math.min(100, state.player.rating + action.payload));
      }
    },
    incrementDriverAge: (state) => {
      if (state.player) {
        state.player.identity.age += 1;
      }
    },
    updateDriverCareer: (state, action: PayloadAction<DriverSeasonStats>) => {
      if (!state.player) return;
      const stats = action.payload;
      const existing = state.player.career.find(c => c.category === stats.category);
      
      if (existing) {
        existing.wins += stats.wins;
        existing.podiums += stats.podiums;
        existing.poles += stats.poles;
        existing.fastestLaps += stats.fastestLaps;
        existing.races += stats.races;
        existing.championships += stats.championships;
        existing.constructor += stats.constructor;
      } else {
        state.player.career.push({ ...stats });
      }
    },
  },
});

export const { setPlayer, clearPlayer, addSeasonToHistory, updateDriverRating, incrementDriverAge, updateDriverCareer } = driverSlice.actions;
export default driverSlice.reducer;