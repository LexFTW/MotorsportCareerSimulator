import styles from './Badge.module.css';

export type BadgeType = 'positive' | 'negative' | 'neutral';

export interface BadgeProps {
  text: string;
  type?: BadgeType;
  className?: string;
}

export const Badge = ({ text, type = 'neutral', className = '' }: BadgeProps) => {
  const badgeClass = `${styles.badge} ${styles[type]} ${className}`;
  return <span className={badgeClass}>{text}</span>;
};