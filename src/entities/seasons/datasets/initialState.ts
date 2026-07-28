import { SeasonStatus, type SeasonState } from "../models/types";
import { DRIVER_SITUATIONS } from "@/entities/situations/datasets/data";

export const initialState: SeasonState = {
  currentSeason: 2026,
  currentSeasonStats: null,
  historicalSeasonsStats: [],
  pendingSituation: DRIVER_SITUATIONS[0],
  status: SeasonStatus.IDLE,
}