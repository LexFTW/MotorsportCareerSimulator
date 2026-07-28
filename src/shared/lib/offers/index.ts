import { CategoryType } from "@/entities/categories";
import type { Driver } from "@/entities/drivers";
import { TEAMS } from "@/entities/teams/datasets/data";
import type { Team } from "@/entities/teams/models/types";

export const getOffers = (rating: number, categoryType: CategoryType) => {
    const teams = TEAMS.filter(team => team.category === categoryType && rating >= team.ratingRange.min && rating <= team.ratingRange.max);
    const shuffled = [...teams].sort(() => Math.random() - 0.5);
    const selectedTeams = shuffled.slice(0, 3);
    return selectedTeams;
}

export function generateTeamOffers(player: Driver): Team[] {
    const rating = player.rating;
    const lastSeasonStats = player.seasonStats?.[0];
    const categories: CategoryType[] = [];

    if(rating <= 64) categories.push(CategoryType.F3);
    else if(rating <= 70) categories.push(CategoryType.F2);
    else if(rating <= 75) categories.push(CategoryType.F2, CategoryType.F1);
    else categories.push(CategoryType.F1, CategoryType.INDYCAR, CategoryType.WEC);

    let allOffers: Team[] = [];
    categories.forEach(cat => {
        const offers = getOffers(rating, cat);
        allOffers = [...allOffers, ...offers];
    });

    const shuffled = [...allOffers].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 2);

    const currentTeam = TEAMS.find(t => t.id === lastSeasonStats?.team);
    if(currentTeam) {
        selected.push(currentTeam);
    }

    return selected;
}