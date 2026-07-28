import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "../datasets/initialState";
import type { DriverSeasonStats } from "@entities/drivers/models/types";
import { SeasonStatus } from "./types";
import { SEASON_SITUATIONS } from "@/entities/situations/datasets/data";
import type { SituationOptions } from "@/entities/situations/models/types";

export const seasonSlice = createSlice({
  name: "season",
  initialState,
  reducers: {
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
    resolvePendingSituation: (state, action: PayloadAction<SituationOptions>) => {
      if(!state.currentSeasonStats) return;

      state.pendingSituation = null;
      state.status = SeasonStatus.IN_PROGRESS;
    },
    finishSeason: (state) => {
      state.status = SeasonStatus.FINISHED;
      state.historicalSeasonsStats[state.currentSeason] = { ...state.currentSeasonStats } as DriverSeasonStats;
      state.currentSeasonStats = initialState.currentSeasonStats;
      state.currentSeason += 1;
    }
  }
});

export const { setSeason, setSeasonStats, simulateSeason, resolvePendingSituation, finishSeason } = seasonSlice.actions;
export default seasonSlice.reducer;