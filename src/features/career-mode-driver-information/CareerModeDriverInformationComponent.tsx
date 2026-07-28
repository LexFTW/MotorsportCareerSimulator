import { useAppSelector } from '@app/store'
import styles from './CareerModeDriverInformationComponent.module.css'
import { Avatar } from '@/shared/ui/avatar/Avatar'
import { IconBolt, IconFlag2, IconMedal, IconSettings } from '@tabler/icons-react'
import { TEAMS } from '@/entities/teams/datasets/data'
import { hexToRgba } from '@/shared/lib/colors'

export function CareerModeDriverInformationComponent() {
    const driver = useAppSelector((state) => state.driver.player)
    const currentSeason = useAppSelector((state) => state.season.currentSeasonStats)
    const team = TEAMS.find((team) => team.id === currentSeason?.team);

    return (
        <>
            { driver && (
                <main className={styles.main}>
                    <section className={styles.section}>
                        <div aria-hidden className={styles.background} style={{ background: `linear-gradient(100deg, var(--surface) 45%, ${ team ? hexToRgba(team?.brand.color, 0.1) : 'rgba(255,85,61,0.05)'} 100%)` }} />
                        <div style={{ position: 'relative', display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                            {driver && (
                                <>
                                    <Avatar 
                                        label="OVR" 
                                        value={driver.rating.toString()}
                                        accentColor={team ? team?.brand.color : 'var(--surface-3)'} 
                                        />

                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{ display: 'flex', gap: '6px', marginBottom: '8px', flexWrap: 'wrap' as const }}>
                                            <span style={{ background: 'var(--surface-4)', color: 'var(--text)', borderRadius: 'var(--r-full)', padding: '3px 10px', fontFamily: 'var(--mono)', fontSize: '11px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                <IconFlag2 size={11} /> {driver.identity.nationality.slice(0, 3).toUpperCase()}
                                            </span>
                                        </div>
                                        <div style={{ fontSize: '11px', color: 'var(--text-2)', marginTop: '2px', textTransform: 'uppercase' as const, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' as const }}>
                                            <h3>{driver.identity.name} · {driver.identity.dorsal}</h3>
                                        </div>
                                        <div style={{ fontSize: '11px', color: 'var(--text-2)', marginTop: '2px', textTransform: 'uppercase' as const, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' as const }}>
                                            { team && (
                                                <>
                                                    <img src={team.brand.logo} alt={team.name} style={{ width: '16px', height: '16px', marginRight: '4px', verticalAlign: 'middle' }} />
                                                    {team.name}
                                                </>
                                            )}
                                            
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px', flexShrink: 0 }}>
                                        <div style={{ textAlign: 'right' as const }}>
                                            <div style={{ fontFamily: 'var(--mono)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--text-3)', textTransform: 'uppercase' as const }}>Edad</div>
                                            <div style={{ fontFamily: 'var(--f1)', fontSize: '26px', fontWeight: 900, color: 'var(--text)', lineHeight: 1.1 }}>{driver.identity.age}</div>
                                        </div>
                                    </div>

                                </>
                            )}
                        </div>
                        <div style={{ borderTop: '1px solid var(--border)', margin: '1rem 0 0' }} />
                    </section>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', padding: '1rem 1.25rem' }}>
                        {([
                            { 
                                label: 'RACES',   value: driver?.career.map(c => c.races).reduce((a, b) => a + b, 0), 
                                icon: <IconSettings size={14} color="var(--gain-text)" /> 
                            },
                            { 
                                label: 'PODIUMS', value: driver?.career.map(c => c.podiums).reduce((a, b) => a + b, 0), 
                                icon: <IconMedal size={14} color="var(--text-2)" /> 
                            },
                            { 
                                label: 'HOT LAPS',value: driver?.career.map(c => c.fastestLaps).reduce((a, b) => a + b, 0), 
                                icon: <IconBolt size={14} color="var(--text-2)" /> 
                            },
                        ] as const).map(({ label, value, icon }) => (
                            <div key={label} style={{ textAlign: 'center' as const }}>
                            <div style={{ fontFamily: 'var(--mono)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--text-3)', textTransform: 'uppercase' as const, marginBottom: '4px' }}>
                                {label}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
                                {icon}
                                <span style={{ fontFamily: 'var(--mono)', fontSize: '20px', fontWeight: 700, color: 'var(--text)' }}>{value}</span>
                            </div>
                            </div>
                        ))}
                    </div>
                </main>
            )}
        </>
    )
}
