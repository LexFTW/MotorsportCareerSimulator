import styles from './CardDecision.module.css'

interface Props {
    title: string
    description: string
    icon?: React.ReactNode // opcional para futuras extensiones
}

export function CardDecision({ title, description, icon }: Props) {
    return (
        <section className={styles.section}>
            <div className={styles.cardHeader}>
                {icon && <span className={styles.cardIcon}>{icon}</span>}
                <div className={styles.cardHeaderIndicator} />
                <span className={styles.cardHeaderTitle}>
                    {title}
                </span>
            </div>
            <span className={styles.cardDescription}>
                {description}
            </span>
        </section>
    )
}