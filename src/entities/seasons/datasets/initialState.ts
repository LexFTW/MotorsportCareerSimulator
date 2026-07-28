import { DRIVER_SITUATIONS } from "@/entities/situations/datasets/data";
import { SeasonStatus, type SeasonState } from "../models/types";

export const initialState: SeasonState = {
  currentSeason: 2026,
  currentSeasonStats: null,
  historicalSeasonsStats: {},
  pendingSituation: DRIVER_SITUATIONS[0],
  status: SeasonStatus.IDLE,
  seasonSituationCount: 0,
  maxSeasonSituations: 2,
  racesSimulated: 0,
}