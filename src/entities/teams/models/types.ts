import type { CategoryType } from "@/entities/categories";
import type { DriverStyles } from "@/entities/drivers";

export interface Team{
    id: number;
    name: string;
    tier: TeamTier;
    brand: TeamBrand;
    category: CategoryType;
    style: DriverStyles;
    ratingRange: TeamRatingRange;
}

export interface TeamRatingRange {
    min: number;
    max: number;
}

export interface TeamBrand {
    color: string;
    logo: string;
}

export type TeamTier = '1' | '2' | '3' | '4'; // 1: Top-tier teams, 2: Mid-tier teams, 3: Lower-tier teams, 4: Entry-level teams