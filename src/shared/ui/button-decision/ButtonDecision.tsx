import styles from './ButtonDecision.module.css';
import { Badge } from '../badge/Badge';
import type { SituationBadge } from '@/entities/situations/models/types';

interface Props {
  label: string;
  title: string | undefined;
  image?: string;
  badges: SituationBadge | undefined;
  onClick: () => void;
}

export function ButtonDecision({ label, title, image, badges, onClick }: Props) {
  return (
    <button type="button" onClick={onClick} className={styles.decisionButton}>
      {image && (
        <div
          className={styles.buttonImageBg}
          style={{ backgroundImage: `url(${image})` }}
        />
      )}
      <div className={styles.buttonContent}>
        <span className={styles.buttonLabel}>{label}</span>
        <span className={styles.buttonTitle}>{title}</span>
        {badges && (
          <div className={styles.buttonBadges}>
            <Badge
              text={`${badges.positive.text} (${Math.round((badges.positive.probability ?? 0) * 100)}%)`}
              type="positive"
            />
            {badges.negative && (
              <Badge
                text={`${badges.negative.text} (${Math.round((badges.negative.probability ?? 0) * 100)}%)`}
                type="negative"
              />
            )}
          </div>
        )}
      </div>
    </button>
  );
}