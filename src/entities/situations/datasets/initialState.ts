import type { SituationState } from "../models/types";
import { DRIVER_SITUATIONS, SEASON_SITUATIONS } from "./data";

export const initialState: SituationState = {
  situations: [...DRIVER_SITUATIONS, ...SEASON_SITUATIONS],
  situationsUsedPerSeason: [],
};