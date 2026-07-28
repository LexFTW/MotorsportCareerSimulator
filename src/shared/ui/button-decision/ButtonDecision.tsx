import styles from './ButtonDecision.module.css';
// import { Badge } from '../badge/Badge';

interface Props {
  label: string;
  title: string | undefined;
  image?: string;
  onClick: () => void;
}

export function ButtonDecision({ label, title, image, onClick }: Props) {
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
        {/* {badges && (
          <div className={styles.buttonBadges}>
            <Badge
              text={`${badges.positive.text} (${badges.positive.probability ?? '?'}%)`}
              type="positive"
            />
            {badges.negative && (dddd
              <Badge
                text={`${badges.negative.text} (${badges.negative.probability ?? '?'}%)`}
                type="negative"
              />
            )}
          </div>
        )} */}
      </div>
    </button>
  );
}