import { createAsyncThunk } from "@reduxjs/toolkit";
import type { SituationOptions } from "@/entities/situations/models/types";
import type { RootState } from "@/app/store";
import { updateDriverRating, addSeasonPoints } from "@/entities/drivers/models/driverSlice";
import { setPendingSituation, incrementSeasonSituationCount, setSeasonStats } from "./seasonSlice";
import { SituationType } from "@/entities/situations/models/types";

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

    // Dispatch de actualizaciones
    if (ratingDelta !== 0) {
      dispatch(updateDriverRating(ratingDelta));
    }
    if (pointsDelta !== 0) {
      dispatch(addSeasonPoints(pointsDelta));
    }

    dispatch(setPendingSituation(null));

    const currentSituation = state.season.pendingSituation;
    if (currentSituation?.type === SituationType.SeasonSituation) {
      dispatch(incrementSeasonSituationCount());
    }

    return { ratingDelta, pointsDelta };
  }
);