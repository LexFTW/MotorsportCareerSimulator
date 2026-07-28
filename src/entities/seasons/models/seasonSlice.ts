import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "../datasets/initialState";
import type { DriverSeasonStats } from "@entities/drivers/models/types";
import { SeasonStatus } from "./types";
import { SEASON_SITUATIONS } from "@/entities/situations/datasets/data";
import { SituationType, type Situation } from "@/entities/situations/models/types";

export const seasonSlice = createSlice({
  name: "season",
  initialState,
  reducers: {
    startSeason: (state) => {
      state.status = SeasonStatus.IN_PROGRESS;
      state.seasonSituationCount = 0;
      state.maxSeasonSituations = 2;
    },
    setPendingSituation: (state, action: PayloadAction<Situation | null>) => {
      state.pendingSituation = action.payload;

      if (action.payload) {
        if (action.payload.type === SituationType.SeasonSituation) {
          state.status = SeasonStatus.DECISION;
        }
      } else {
        if (state.status === SeasonStatus.DECISION) {
          state.status = SeasonStatus.IN_PROGRESS;
        }
      }
    },
    incrementSeasonSituationCount: (state) => {
      state.seasonSituationCount += 1;
    },
    resetSeasonSituationCount: (state) => {
      state.seasonSituationCount = 0;
    },
    simulateRace: (state) => {
      if (state.status !== SeasonStatus.IN_PROGRESS) return;

      state.racesSimulated = (state.racesSimulated || 0) + 1;
    },
    setSeason: (state, action: PayloadAction<number>) => {
      state.currentSeason = action.payload;
    },
    setSeasonStats: (state, action: PayloadAction<DriverSeasonStats>) => {
      state.currentSeasonStats = action.payload;
    },
    simulateSeason: (state) => {
      state.status = Math.random() < 0.5 ? SeasonStatus.DECISION : SeasonStatus.IN_PROGRESS;
      state.pendingSituation = SEASON_SITUATIONS[Math.floor(Math.random() * SEASON_SITUATIONS.length)];
    },
    resolvePendingSituation: (state) => {
      if(!state.currentSeasonStats) return;

      state.pendingSituation = null;
      state.status = SeasonStatus.IN_PROGRESS;
    },
    finishSeason: (state, action: PayloadAction<{ finalStats: DriverSeasonStats; playerRating: number }>) => {
      const { finalStats, playerRating } = action.payload;

      const seasonRecord = {
        ...finalStats,
        rating: playerRating, // <-- Así guardas el rating en el histórico sin modificar el tipo original
      };

      state.historicalSeasonsStats[state.currentSeason] = { ...seasonRecord };
      state.currentSeasonStats = null; // Limpiar para la próxima temporada
      state.currentSeason += 1;
      state.seasonSituationCount = 0;
      state.racesSimulated = 0;
      state.pendingSituation = null;
      state.status = SeasonStatus.FINISHED;

    },
    setIdle: (state) => {
      state.status = SeasonStatus.IDLE;
    },
  }
});

export const { 
  startSeason, 
  setSeason, 
  setSeasonStats, 
  simulateRace,
  simulateSeason, 
  resolvePendingSituation, 
  finishSeason, 
  setPendingSituation, 
  incrementSeasonSituationCount,
  setIdle 
} = seasonSlice.actions;

export default seasonSlice.reducer;