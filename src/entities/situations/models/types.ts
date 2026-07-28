import type { CategoryType } from "@/entities/categories/models/types";

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

export interface Situation{
    type: SituationType;
    title: string;
    description: string;
    options: SituationOptions[];
    trigger: SituationTrigger[];
}

export interface SituationOptions{
    id: number;
    label: string;
    description?: string;
    image?: string;
    badges?: {
        positive: { text: string; probability?: number, value: number };
        negative?: { text: string; probability?: number, value: number };
    };
}

export interface SituationTrigger {
    category: CategoryType;
}