import { hexToRgba } from '@/shared/lib/colors'
import styles from './Avatar.module.css'

interface Props {
  label: string
  value: string
  accentColor?: string
}

export const Avatar = ({ label, value, accentColor }: Props) => {
    const len = value.length
    const fontSize = len <= 1 ? '80px' : len === 2 ? '62px' : '48px'

    return (
        <main className={styles.main}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: accentColor }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '4px', background: accentColor }} />
            <div className={styles.shape} style={{ background: hexToRgba(accentColor || 'var(--accent)', 0.06) }} />
            <span className={styles.label}>
                {label || '—'}
            </span>
            <span className={styles.value} style={{ fontSize: fontSize }} >
                {value || '0'}
            </span>
        </main>
    )
}