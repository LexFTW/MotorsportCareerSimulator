import type { CategoryType } from "@/entities/categories";
import { TEAMS } from "@/entities/teams/datasets/data";

export const getOffers = (rating: number, categoryType: CategoryType) => {
    const teams = TEAMS.filter(team => team.category === categoryType && rating >= team.ratingRange.min && rating <= team.ratingRange.max);
    const shuffled = [...teams].sort(() => Math.random() - 0.5);
    const selectedTeams = shuffled.slice(0, 3);
    return selectedTeams;
}