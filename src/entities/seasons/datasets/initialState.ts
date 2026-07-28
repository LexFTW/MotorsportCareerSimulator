import { CategoryType } from "@/entities/categories/models/types";
import { SeasonStatus, type SeasonState } from "../models/types";
import { DRIVER_SITUATIONS } from "@/entities/situations/datasets/data";

export const initialState: SeasonState = {
  currentSeason: 2026,
  currentSeasonStats: {
    championships: 0,
    team: 5,
    races: 0,
    podiums: 0,
    fastestLaps: 0,
    points: 0,
    constructor:0 ,
    category: CategoryType.F1,
    dnfs: 0,
    poles: 0,
    overall: 0,
    wins: 0
  },
  historicalSeasonsStats: [],
  pendingSituation: DRIVER_SITUATIONS[1],
  status: SeasonStatus.IDLE,
}