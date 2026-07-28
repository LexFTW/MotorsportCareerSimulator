// src/pages/CareerModePage.tsx

import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { CareerModeDriverTrophiesComponent } from '@/features/career-mode-driver-trophies';
import { CareerModeDriverInformationComponent } from '@/features/career-mode-driver-information';
import { CareerModeDriverDecisionComponent } from '@/features/career-mode-driver-decision';
import { CareerModeHistoryComponent } from '@/features/career-mode-history';
import styles from './CareerModePage.module.css';
import { SeasonStatus } from "@/entities/seasons/models/types";
import { 
  setPendingSituation, 
  simulateRace, 
  startSeason, 
  finishSeason, 
  setIdle
} from "@/entities/seasons/models/seasonSlice";
import { SEASON_SITUATIONS } from "@/entities/situations/datasets/data";
import { updateSeasonStatsAfterRace } from "@/entities/drivers/models/driverSlice";
import type { DriverSeasonStats } from "@/entities/drivers/models/types";

// Número de carreras por temporada (para pruebas)
const RACES_PER_SEASON = 5;

export function CareerModePage() {
  const dispatch = useAppDispatch();
  const season = useAppSelector((state) => state.season);
  const player = useAppSelector((state) => state.driver.player);
  const intervalRef = useRef<number | null>(null);

  // 1. Cuando el estado es IDLE y no hay situación pendiente
  useEffect(() => {
    if (season.status === SeasonStatus.IDLE && !season.pendingSituation && player) {
      // Si el jugador ya tiene historial (seasonStats), empezar temporada directamente
      if (player.seasonStats && player.seasonStats.length > 0 && season.currentSeasonStats) {
        dispatch(startSeason());
        return;
      }
    }
  }, [season.status, season.pendingSituation, player, season.currentSeasonStats, dispatch]);

  // 2. Cuando el estado es FINISHED, mostrar historial y luego pasar a IDLE
  useEffect(() => {
    if (season.status === SeasonStatus.FINISHED) {
      // Podrías mostrar un mensaje o simplemente esperar un momento y pasar a IDLE
      // Aquí usamos un timeout para dar tiempo a ver los resultados
      const timeout = setTimeout(() => {
        dispatch(setIdle());
      }, 2000); // 2 segundos para mostrar el historial
      return () => clearTimeout(timeout);
    }
  }, [season.status, dispatch]);

  // 3. Lógica de simulación cuando IN_PROGRESS y sin situación pendiente
  useEffect(() => {
    if (season.status === SeasonStatus.IN_PROGRESS && !season.pendingSituation && player) {
      // Limpiar intervalo anterior
      if (intervalRef.current) clearInterval(intervalRef.current);

      // Si ya se simularon todas las carreras, finalizar temporada
      if (season.racesSimulated >= RACES_PER_SEASON) {
        dispatch(finishSeason());
        return;
      }

      // Iniciar nuevo intervalo
      intervalRef.current = window.setInterval(() => {
        // 1. Simular puntos de carrera
        const racePoints = Math.floor(Math.random() * 25) + 1;
        const currentStats = player.seasonStats[0];
        if (currentStats) {
          dispatch(updateSeasonStatsAfterRace({
            races: (currentStats.races || 0) + 1,
            points: (currentStats.points || 0) + racePoints,
          } as Partial<DriverSeasonStats>));
        }
        dispatch(simulateRace());

        // 2. Verificar si debe aparecer una situación de temporada
        const shouldTrigger = () => {
          if (season.seasonSituationCount >= season.maxSeasonSituations) return false;
          return Math.random() < 0.25; // 25% de probabilidad por carrera
        };

        if (shouldTrigger()) {
          const available = SEASON_SITUATIONS.filter(s =>
            s.trigger.some(t => t.category === player.seasonStats[0]?.category)
          );
          if (available.length > 0) {
            const randomSituation = available[Math.floor(Math.random() * available.length)];
            dispatch(setPendingSituation(randomSituation));
            // Al setear pendingSituation, el estado cambia a DECISION, lo que pausa el intervalo
          }
        }

        // 3. Si después de esta iteración se supera el número de carreras, finalizar
        if (season.racesSimulated + 1 >= RACES_PER_SEASON) {
          // El intervalo se limpiará en el siguiente ciclo porque el estado cambiará
          // pero mejor forzamos la finalización
          dispatch(finishSeason());
        }
      }, 3000); // cada 3 segundos (ajusta a tu gusto)
    }

    // Limpiar intervalo al desmontar o cambiar condiciones
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [season.status, season.pendingSituation, player, season.racesSimulated, season.seasonSituationCount, dispatch]);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.col}>
            <CareerModeDriverInformationComponent />
            <CareerModeDriverTrophiesComponent />
            <CareerModeDriverDecisionComponent />
          </div>
          <div className={styles.col}>
            <CareerModeHistoryComponent />
          </div>
        </div>
      </div>
    </div>
  );
}