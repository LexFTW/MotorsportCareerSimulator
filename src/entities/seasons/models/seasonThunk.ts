import type { SituationOptions } from "@/entities/situations/models/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { resolvePendingSituation } from "./seasonSlice";
import { updateDriverRating } from "@/entities/drivers/models/driverSlice";

export const resolveSituationWithRating = createAsyncThunk(
  'season/resolveWithRating',
  async (situation: SituationOptions, { dispatch }) => {    
    dispatch(resolvePendingSituation(situation));
    dispatch(updateDriverRating(situation.badges?.positive?.value || 0));
    
    return situation;
  }
);