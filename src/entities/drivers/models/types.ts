import type { CategoryType } from "@/entities/categories";

export interface DriverState {
  player: Driver | null;
}

export interface Driver {
    id: number;
    identity: DriverIdentity;
    rating: number;
    seasonStats: DriverSeasonStats[];
    career: DriverCareer[];
    style: DriverStyles;
}

export interface DriverIdentity {
    name: string;
    age: number;
    nationality: string;
    dorsal: number;
}

export interface DriverSeasonStats {
    races: number;
    wins: number;
    podiums: number;
    poles: number;
    fastestLaps: number;
    championships: number;
    constructors: number;
    category: CategoryType;
    points: number;
    dnfs: number;
    team: number;
    overall: number;
}

export interface DriverCareer {
    races: number;
    wins: number;
    podiums: number;
    poles: number;
    fastestLaps: number;
    championships: number;
    constructors: number;
    category: CategoryType;
}

export enum DriverStyles {
    Aggressive = 'aggressive',
    Defensive = 'defensive',
    Balanced = 'balanced',
    Strategic = 'strategic',
    Erratic = 'erratic',
}