import { CategoryType } from "@/entities/categories";
import type { Driver, DriverSeasonStats } from "@/entities/drivers/models/types";
import { SituationType, type Situation } from "@/entities/situations/models/types";
import type { Team } from "@/entities/teams/models/types";

export const createOfferSituation = (player: Driver, selectedTeams: Team[]): Situation => {
    return {
        title: `Ofertas de equipos para la temporada ${new Date().getFullYear()}`,
        description: `Tu rating actual es ${player.rating}. Elige tu destino:`,
        type: SituationType.DriverSituation,
        trigger: [{ category: player.seasonStats[0]?.category || CategoryType.F3 }],
        options: selectedTeams.map((team, index) => ({
          id: index + 1,
          label: `${team.name} (${team.category})`,
          description: `Fichar por ${team.name} en ${team.category}.`,
          image: team.brand.logo,
          badges: { positive: { text: 'Nuevo equipo', probability: 1, value: 0 } },
          effect: (p: Driver) => {
            const stats: DriverSeasonStats = {
              races: 0, 
              wins: 0, 
              podiums: 0, 
              poles: 0, 
              fastestLaps: 0,
              championships: 0, 
              constructors: 0, 
              category: team.category,
              points: 0, 
              dnfs: 0, 
              team: team.id, 
              overall: 0,
              rating: 0,
            };
            
            const newSeasonStats = [stats, ...(p.seasonStats || [])];
            return { ...p, seasonStats: newSeasonStats };
          }
        }))
      };
}