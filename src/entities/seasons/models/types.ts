import type { CategoryType } from "@/entities/categories";
import type { DriverSeasonStats } from "@/entities/drivers/models/types";
import type { Situation } from "@/entities/situations";

export enum SeasonStatus{
    IDLE = 'idle',
    DECISION = 'decision',
    IN_PROGRESS = 'inProgress',
    FINISHED = 'finished',
}

export interface SeasonState {
  status: SeasonStatus;
  currentSeason: number;
  currentSeasonStats: DriverSeasonStats | null;
  historicalSeasonsStats: Record<number, DriverSeasonStats>;
  pendingSituation: Situation | null;
  seasonSituationCount: number;
  maxSeasonSituations: number;
  racesSimulated: number;
}

export interface Season {
    races: number;
    category: CategoryType;
    brand: SeasonBrand;
    gridSize: number;
    pointsMap: Record<number, number>;
}

export interface SeasonBrand {
    color: string;
    logo: string;
}