import { createAsyncThunk } from "@reduxjs/toolkit";
import type { SituationOptions } from "@/entities/situations/models/types";
import type { RootState } from "@/app/store";
import { updateDriverRating, addSeasonPoints, updateDriverCareer, incrementDriverAge, addSeasonToHistory } from "@/entities/drivers/models/driverSlice";
import { incrementSeasonSituationCount, setSeasonStats, resolvePendingSituation, finishSeason } from "./seasonSlice";
import { SituationType } from "@/entities/situations/models/types";
import { SeasonStatus } from "./types";
import { SEASON_SITUATIONS } from "@/entities/situations/datasets/data";
import { generateSeasonStats } from "@/shared/lib/seasons";

export const resolveSituation = createAsyncThunk(
  'season/resolveSituation',
  async (option: SituationOptions, { dispatch, getState }) => {
    const state = getState() as RootState;
    const player = state.driver.player;

    if (!player) return;

    let ratingDelta = 0;
    let pointsDelta = 0;

    // Aplicar efectos de los badges (con seguridad)
    const badges = option.badges;
    if (badges) {
      if (badges.positive) {
        const roll = Math.random();
        if (roll <= (badges.positive.probability ?? 0)) {
          ratingDelta += badges.positive.value ?? 0;
          pointsDelta += badges.positive.value ?? 0;
        }
      }
      if (badges.negative) {
        const roll = Math.random();
        if (roll <= (badges.negative.probability ?? 0)) {
          ratingDelta += badges.negative.value ?? 0;
          pointsDelta += badges.negative.value ?? 0;
        }
      }
    }

    let updatedPlayer = player;
    if (option.effect) {
      updatedPlayer = option.effect(player);
    }

    if (updatedPlayer !== player && updatedPlayer.seasonStats && updatedPlayer.seasonStats.length > 0) {
      dispatch(setSeasonStats(updatedPlayer.seasonStats[0]));
    }

    if (ratingDelta !== 0) {
      dispatch(updateDriverRating(ratingDelta));
    }
    if (pointsDelta !== 0) {
      dispatch(addSeasonPoints(pointsDelta));
    }

    dispatch(resolvePendingSituation());
    
    const currentSituation = state.season.pendingSituation;
    if (currentSituation?.type === SituationType.SeasonSituation) {
      dispatch(incrementSeasonSituationCount());
    }
    
    return { ratingDelta, pointsDelta };
  }
);

export const simulateSeasonThunk = createAsyncThunk(
  'season/simulateSeasonThunk',
  async (_, { dispatch, getState }) => {
    const state = getState() as RootState;
    const season = state.season;

    console.log("Simulating season for player:", state.driver.player?.identity.name, "Current season:", season.currentSeason);

    if(!state.driver.player) return;
    if (season.status !== SeasonStatus.IN_PROGRESS) return; 

    if(state.season.seasonSituationCount == state.season.maxSeasonSituations) {
      if(!state.season.currentSeasonStats) return;

      const finalStats = generateSeasonStats(
        state.driver.player,
        state.season.currentSeasonStats?.category,
        state.season.currentSeasonStats?.team
      );

      console.log("Final season stats generated:", JSON.stringify(finalStats));

      dispatch(updateDriverRating(finalStats.overall));
      dispatch(updateDriverCareer(finalStats));
      dispatch(incrementDriverAge());
      dispatch(addSeasonToHistory(finalStats));

      console.log("Dispatching finishSeason with finalStats:", JSON.stringify(finalStats), "and playerRating:", state.driver.player.rating);
      dispatch(finishSeason({ finalStats, playerRating: state.driver.player.rating }));
    }else{
      const seasonSituations = SEASON_SITUATIONS.filter(s => s.type === SituationType.SeasonSituation && s.trigger.some(t => t.category === state.season.currentSeasonStats?.category));
      const randomSituation = seasonSituations[Math.floor(Math.random() * seasonSituations.length)];
      
      dispatch({ type: 'season/setPendingSituation', payload: randomSituation });
    }

  }
);