import type { CategoryType } from "@/entities/categories/models/types";
import type { Driver } from "@/entities/drivers/models/types";

export enum SituationType {
    SeasonSituation = 'seasonSituation',
    DriverSituation = 'driverSituation',
}

export enum TeamSituationType {
    Offer = 'offer',
    ContractTermination = 'contractTermination',
}

export enum PersonalSituationType {
    Retirement = 'retirement',
    Injury = 'injury',
}

export interface SituationState{
    situations: Situation[];
    situationsUsedPerSeason: number[]
}

export interface Situation {
  title: string;
  description: string;
  type: SituationType;
  trigger: { category: CategoryType }[];
  options: SituationOptions[];
  condition?: (player: Driver) => boolean; // ← nuevo
}
export interface SituationOptions {
  id: number;
  label: string;
  description: string;
  image?: string;
  badges?: SituationBadge;
  effect?: (player: Driver) => Driver; // ← nuevo
}

export interface SituationBadge {
  positive: SituationBadgeData;
  negative?: SituationBadgeData;
}

export interface SituationBadgeData {
  text: string;
  probability: number;
  value: number;
}

export interface SituationTrigger {
    category: CategoryType;
}