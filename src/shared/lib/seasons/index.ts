import { TEAMS } from "@/entities/teams/datasets/data";
import { SEASONS } from "@/entities/seasons/datasets/data";
import type { TeamTier } from "@/entities/teams/models/types";
import type { Driver, DriverSeasonStats } from "@/entities/drivers/models/types";
import type { CategoryType } from "@/entities/categories";

function getTeamTier(teamId: number): TeamTier {
  const team = TEAMS.find(t => t.id === teamId) || TEAMS[0];
  return team.tier; // Por defecto tier 2
}

function getPointsForPosition(pos: number, pointsMap: Record<number, number>): number {
  return pointsMap[pos] || 0;
}

export function generateSeasonStats(
  player: Driver,
  category: CategoryType,
  teamId: number,
): DriverSeasonStats {
  const config = SEASONS.find(s => s.category === category)
  ;
  if (!config) throw new Error(`Categoría ${category} no configurada`);

  const { races, gridSize, pointsMap } = config;
  const rating = player.rating;
  const tier = getTeamTier(teamId);
  
  // Factor de rendimiento base: rating (0-100) normalizado a [0.3, 0.9]
  const baseFactor = 0.3 + (rating / 100) * 0.6; // 0.3 a 0.9

  // Ajuste por equipo: tier 1 -> +0.15, tier 2 -> 0, tier 3 -> -0.1, tier 4 -> -0.2
  const tierBonus = (4 - parseInt(tier.toString())) * 0.08; // tier1=0.24, tier2=0.16, tier3=0.08, tier4=0
  
  // Pequeño factor aleatorio (para variabilidad)
  const randomFactor = (Math.random() - 0.5) * 0.1;
  const performanceFactor = Math.min(1, Math.max(0.1, baseFactor + tierBonus + randomFactor));

  let wins = 0, podiums = 0, poles = 0, fastestLaps = 0, dnfs = 0, totalPoints = 0;

  for (let i = 0; i < races; i++) {
    // Probabilidad de DNF: inversamente proporcional al factor
    const dnfProb = 0.05 + (1 - performanceFactor) * 0.3; // 5% a 35%
    if (Math.random() < dnfProb) {
      dnfs++;
      continue; // no puntúa
    }

    // Invertir: si performanceFactor es 0.9, la probabilidad de estar en top 10 es alta
    // Generamos una posición entre 1 y gridSize
    let position: number;
    
    if (performanceFactor > 0.8) {
      // Favor top 10
      position = Math.floor(Math.random() * 10) + 1; // 1-10
    } else if (performanceFactor > 0.5) {
      // Aleatorio más equilibrado
      position = Math.floor(Math.random() * 15) + 1; // 1-15
    } else {
      // Peor rendimiento, más posiciones bajas
      position = Math.floor(Math.random() * 10) + 11; // 11-20
    }
    // Ajustar para que no exceda gridSize
    position = Math.min(gridSize, position);

    const points = getPointsForPosition(position, pointsMap);
    totalPoints += points;

    if (position === 1) wins++;
    if (position <= 3) podiums++;

    // Poles: probabilidad basada en factor (solo una pole por carrera, pero aquí simulamos)
    const poleProb = 0.05 + performanceFactor * 0.25;
    if (Math.random() < poleProb) poles++;

    // Fastest lap: similar
    const flProb = 0.05 + performanceFactor * 0.2;
    if (Math.random() < flProb) fastestLaps++;
  }

  // Calcular posición final en el campeonato (aproximada)
  // Puntos totales esperados si todos los pilotos fueran iguales: promedio de puntos por carrera * gridSize * (races)
  // Pero simplificamos: comparamos los puntos obtenidos con el máximo posible (wins * 25)
//   const maxPossiblePoints = races * 25;
//   const ratio = totalPoints / (maxPossiblePoints || 1);
//   // Posición final: 1 a gridSize, inversamente proporcional al ratio
//   let finalPosition = Math.round(gridSize * (1 - ratio * 0.85)) + 1;
//   finalPosition = Math.min(gridSize, Math.max(1, finalPosition));

  // Overall: un valor que represente el rendimiento general, puede ser puntos por carrera
  const overall = Math.round((totalPoints / races) * 2);

  return {
    races,
    wins,
    podiums,
    poles,
    fastestLaps,
    championships: 0, // no se usa aquí
    constructors: 0, // no se usa aquí
    category,
    points: totalPoints,
    dnfs,
    team: teamId,
    overall: overall || 0,
    rating: player.rating, // Mantener el rating actual del jugador
  };
}