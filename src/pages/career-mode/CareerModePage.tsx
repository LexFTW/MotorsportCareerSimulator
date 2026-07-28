// src/pages/CareerModePage.tsx

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { CareerModeDriverTrophiesComponent } from '@/features/career-mode-driver-trophies';
import { CareerModeDriverInformationComponent } from '@/features/career-mode-driver-information';
import { CareerModeDriverDecisionComponent } from '@/features/career-mode-driver-decision';
import { CareerModeHistoryComponent } from '@/features/career-mode-history';
import styles from './CareerModePage.module.css';
import { SeasonStatus } from "@/entities/seasons/models/types";
import { simulateSeasonThunk } from "@/entities/seasons/models/seasonThunk";
import { generateTeamOffers } from "@/shared/lib/offers";
import { createOfferSituation } from "@/shared/lib/situations";
import { setIdle, setPendingSituation } from "@/entities/seasons/models/seasonSlice";

export function CareerModePage() {
  const dispatch = useAppDispatch();
  const season = useAppSelector((state) => state.season);
  const player = useAppSelector((state) => state.driver.player);

  useEffect(() => {
    console.log("CareerModePage useEffect triggered. Season status:", season.status, "Pending situation:", season.pendingSituation, "Player:", player?.identity.name);

    if(season.status === SeasonStatus.FINISHED) {
      console.log("Season finished. Preparing for next season...");
      dispatch(setPendingSituation(null));
      dispatch(setIdle());
    }

    if (season.status === SeasonStatus.IDLE && !season.pendingSituation && player) {
      console.log("Player season stats:", player.seasonStats);

      if (!player.seasonStats || player.seasonStats.length === 0) {
        return;
      }

      if (!season.currentSeasonStats) {
        const selectedTeams = generateTeamOffers(player);
        const offerSituation = createOfferSituation(player, selectedTeams);

        dispatch(setPendingSituation(offerSituation));
        return;
      }
    }

    if (season.status === SeasonStatus.IN_PROGRESS){
      dispatch(simulateSeasonThunk());
    }
}, [season.status, season.pendingSituation, season.currentSeasonStats, dispatch]);

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