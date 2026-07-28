import { useAppDispatch, useAppSelector } from '@/app/store';
import { useEffect } from 'react';
import {
  selectSeasonStatus,
  selectCurrentSeasonData,
  simulateFullSeason,
} from '@/entities/seasons/models/seasonSlice';
import styles from './CareerModeSeasonControls.module.css';

export function CareerModeSeasonControls() {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectSeasonStatus);
  const currentData = useAppSelector(selectCurrentSeasonData);

  useEffect(() => {
    if (status === 'inProgress') {
      dispatch(simulateFullSeason());
    }
  }, [status, currentData, dispatch]);

  return (
    <div className={styles.controls}>
      {status === 'inProgress' && (
        <></>
      )}
    </div>
  );
}