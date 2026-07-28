import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "../datasets/initialState";

export const situationSlice = createSlice({
  name: "situation",
  initialState,
  reducers: {
    setSituationAtCurrentSeason: (state, action) => {
      state.situationsUsedPerSeason.push(action.payload);
    }
  }
});

export const { setSituationAtCurrentSeason } = situationSlice.actions;
export default situationSlice.reducer;