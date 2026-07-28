import { useAppSelector } from "@/app/store";
import { IconTrophyFilled } from "@tabler/icons-react";
import { Trophy } from "@/shared/ui/trophy";

export function CareerModeDriverTrophiesComponent() {
    const driver = useAppSelector((state) => state.driver.player);

    return (
        <>
            { driver?.career && driver?.career.find(career => career.championships > 0) ? (
                <div
                    style={{
                        background: 'var(--surface)',
                        border: '1px solid var(--border)',
                        borderRadius: 'var(--r-lg)',
                        padding: '0.75rem 1.25rem',
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '8px',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                    }}
                    >
                        {driver.career.map((career, index) => (
                            <div key={`career-${index}`} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                {career.championships > 0 && (
                                    <Trophy 
                                        count={career.championships} 
                                        category={career.category} 
                                        type="driver" />
                                )}
                                {career.constructors > 0 && (
                                    <Trophy 
                                        count={career.constructors} 
                                        category={career.category} 
                                        type="constructor" />
                                )}
                            </div>
                        ))}
                    </div>
            ) : (
                <main
                    style={{
                        background: 'var(--surface)',
                        border: '1px solid var(--border)',
                        borderRadius: 'var(--r-lg)',
                        padding: '0.75rem 1.25rem',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        marginTop: '4px',
                    }}
                    >
                    <IconTrophyFilled size={22} color="var(--surface-4)" />
                    <span style={{ fontFamily: 'var(--mono)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', color: 'var(--text-3)', textTransform: 'uppercase' as const }}>
                        Sin títulos aún
                    </span>
                </main>
            )}
        </>


        
    )
}