// src/features/career-mode-history/CareerModeHistoryComponent.tsx
import { TEAMS } from '@/entities/teams/datasets/data';
import styles from './CareerModeHistoryComponent.module.css';
import { hexToRgba, getRatingStyles } from '@/shared/lib/colors';
import { useAppSelector } from '@/app/store';
import type { Team } from '@/entities/teams';
import type { DriverSeasonStats } from '@/entities/drivers/models/types';

const getTeamById = (id: number): Team | undefined => {
  return TEAMS.find((team) => team.id === id);
};

export function CareerModeHistoryComponent() {
  const driver = useAppSelector((state) => state.driver.player);
  const { historicalSeasonsStats } = useAppSelector((state) => state.season);

  if (!driver) return null;

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h3 className={styles.title}>Historial</h3>
        <span className={styles.subtitle}>{Object.keys(historicalSeasonsStats).length}</span>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Año</th>
            <th>Equipo</th>
            <th>OVR</th>
            <th>PTS</th>
            <th>VIC</th>
            <th>DNF</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(historicalSeasonsStats).map(([year, season], index) => {
            const team = getTeamById(season.team);
            const opacity = index === 0 ? 1 : 0.7;

            if(!team) return null;

            return (
              <HistoryRow
                key={index}
                year={Number(year)}
                seasonData={season}
                team={team}
                rating={driver.rating}
                opacity={opacity}
              />
            );
          })}
        </tbody>
      </table>
    </section>
  );
}

interface HistoryRowProps {
  year: number;
  seasonData: DriverSeasonStats | null;
  team: Team;
  rating: number | null;
  waitingMessage?: string;
  opacity?: number;
}

function HistoryRow({ year, seasonData, team, rating, waitingMessage, opacity = 1 }: HistoryRowProps) {
  if (!seasonData || !team) {
    return (
      <tr className={styles.waitingRow} style={{ opacity }}>
        <td colSpan={6} className={styles.waitingCell}>
          <span className={styles.waitingYear}>{year}</span>
          <span className={styles.waitingMessage}>{waitingMessage || 'Sin datos'}</span>
        </td>
      </tr>
    );
  }

  const ratingOverall = rating !== null ? rating + seasonData.overall : 0;

  return (
    <tr style={{ opacity }}>
      <td className={styles.yearCell}>{year}</td>
      <td className={styles.teamCell}>
        <span className={styles.teamLogoWrapper} style={{ backgroundColor: hexToRgba(team.brand.color, 0.3) }}>
          <img src={team.brand.logo} alt={team.name} width="24" height="24" />
        </span>
        <span className={styles.teamName}>{team.name}</span>
      </td>
      <td className={styles.ratingCell}>
        <span style={getRatingStyles(ratingOverall)}>{ratingOverall}</span>
      </td>
      <td className={styles.statCell}>{seasonData.points}</td>
      <td className={styles.statCell}>{seasonData.wins}</td>
      <td className={styles.statCell}>{seasonData.dnfs}</td>
    </tr>
  );
}