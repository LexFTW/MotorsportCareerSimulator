import { CareerModeDriverTrophiesComponent } from '@/features/career-mode-driver-trophies';
import { CareerModeDriverInformationComponent } from '@/features/career-mode-driver-information';
import { CareerModeDriverDecisionComponent } from '@/features/career-mode-driver-decision';
import { CareerModeHistoryComponent } from '@/features/career-mode-history';
import styles from './CareerModePage.module.css';

export function CareerModePage() {  
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