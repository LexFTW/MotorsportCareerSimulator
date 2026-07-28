import { SituationType, type Situation } from "../models/types";

import boxImage from '@shared/assets/images/box.png';
import continueRacingImage from '@shared/assets/images/continue-racing-sc.png';
import rainImage from '@shared/assets/images/rain.png';
import penaltyImage from '@shared/assets/images/penalty.png';
import injuryImage from '@shared/assets/images/injury.png';
import sponsorImage from '@shared/assets/images/sponsor.png';
import teammateImage from '@shared/assets/images/teammate.png';
import engineImage from '@shared/assets/images/engine.png';
import podiumImage from '@shared/assets/images/podium.png';
import noRetirementImage from '@shared/assets/images/no-retirement.png';
import retirementImage from '@shared/assets/images/retirement.png';
import forceDrive from '@shared/assets/images/force-drive.png';
// import kartingImage from '@shared/assets/images/karting.png';
// import studyImage from '@shared/assets/images/study.png';
import { CategoryType } from "@/entities/categories/models/types";
import { TEAMS } from "@/entities/teams/datasets/data";
import type { DriverSeasonStats } from "@/entities/drivers/models/types";
import { getOffers } from "@/shared/lib/offers";

export const DRIVER_SITUATIONS: Situation[] = [
    // {
    //     title: 'Inicio en el karting',
    //     description: 'Tus primeros pasos en el mundo del motorsport comienzan en el karting. A tus 10 años, has demostrado talento y tienes la oportunidad de dar el salto a competiciones nacionales. Tus padres te apoyan, pero los costes son elevados.',
    //     type: SituationType.DriverSituation,
    //     trigger: [
    //         {
    //             category: CategoryType.F3
    //         }
    //     ],
    //     options: [
    //         {
    //             id: 1,
    //             label: 'Comprometerte al máximo',
    //             description: 'Decides darlo todo por el sueño de ser piloto. Te inscribes en competiciones nacionales y buscas patrocinadores.',
    //             image: kartingImage,
    //             badges: {
    //                 positive: { text: 'Desarrollo temprano de habilidades', probability: 0.7, value: 3 },
    //                 negative: { text: 'Alta presión desde joven', probability: 0.3, value: -1 }
    //             }
    //         },
    //         {
    //             id: 2,
    //             label: 'Tomarlo con calma',
    //             description: 'Prefieres compaginar el karting con los estudios, sin presionarte demasiado.',
    //             image: studyImage,
    //             badges: {
    //                 positive: { text: 'Equilibrio y desarrollo personal', probability: 0.6, value: 1 },
    //                 negative: { text: 'Pérdida de oportunidades tempranas', probability: 0.4, value: -2 }
    //             }
    //         }
    //     ]
    // },
    {
        title: 'Fichaje por un equipo de F3',
        description: 'Comienzas tu carrera profesional. Varios equipos de F3 están interesados en tus servicios.',
        type: SituationType.DriverSituation,
        condition: (player) => !player.seasonStats || player.seasonStats.length === 0,
        trigger: [
        { category: CategoryType.F3 },
        ],
        options: (() => {
            const selectedTeams = getOffers(60, CategoryType.F2);
            return selectedTeams.map((team, index) => ({
                id: index + 1,
                label: team.name,
                description: `Fichas por ${team.name} en la temporada de ${CategoryType.F2}.`,
                image: team.brand.logo,
                badges: {
                positive: { text: 'Comienzo de carrera', probability: 1, value: 0 },
                },
                effect: (player) => {
                    const initialStats: DriverSeasonStats = {
                        races: 0,
                        wins: 0,
                        podiums: 0,
                        poles: 0,
                        fastestLaps: 0,
                        championships: 0,
                        constructors: 0,
                        category: CategoryType.F3,
                        points: 0,
                        dnfs: 0,
                        team: team.id,
                        overall: 0,
                    };
                    return {
                        ...player,
                        seasonStats: [initialStats], 
                    };
                }
            }));
        })()
    },
    {
        title: 'Retiro de la competición',
        description: 'Los malos resultados en las últimas temporadas te han llevado a considerar el retiro de la competición.',
        type: SituationType.DriverSituation,
        trigger: [
            {
                category: CategoryType.F1,
            },
            {
                category: CategoryType.INDYCAR,
            },
            {
                category: CategoryType.WEC
            }
        ],
        options: [
            {
                id: 1,
                label: 'Seguir compitiendo',
                description: 'Decides seguir compitiendo a pesar de los malos resultados, buscando mejorar en la próxima temporada.',
                image: noRetirementImage,
                badges: {
                    positive: { text: 'Determinación y espíritu de lucha', probability: 0.7, value: 0 },
                    negative: { text: 'Riesgo de más malos resultados', probability: 0.3, value: -5 }
                }
            },
            {
                id: 2,
                label: 'Aceptar el retiro',
                description: 'Aceptar el retiro y finalizar tu carrera como piloto.',
                image: retirementImage,
                badges: {
                    positive: { text: 'Finalizar carrera con dignidad', probability: 0.5, value: 0 }
                }
            }
        ]
    },
    {
        title: 'Lesión en entrenamientos',
        description: 'Has sufrido una lesión durante los entrenamientos libres. Los médicos te recomiendan descansar, pero podrías forzar para correr.',
        type: SituationType.DriverSituation,
        trigger: [
            {
                category: CategoryType.F1,
            },
            {
                category: CategoryType.INDYCAR,
            },
            {
                category: CategoryType.WEC
            },
            {
                category: CategoryType.F2,
            },
            {
                category: CategoryType.F3
            }
        ],
        options: [
            {
                id: 1,
                label: 'Descansar y recuperarse',
                description: 'Sigues el consejo médico y descansas para recuperarte completamente.',
                image: injuryImage,
                badges: {
                    positive: { text: 'Recuperación completa', probability: 0.9, value: 0 },
                    negative: { text: 'Perder la carrera', probability: 0.1, value: -2 }
                }
            },
            {
                id: 2,
                label: 'Forzar y competir',
                description: 'Decides competir a pesar de la lesión, arriesgando tu salud pero demostrando tu compromiso.',
                image: forceDrive,
                badges: {
                    positive: { text: 'Demostrar valentía', probability: 0.4, value: 1 },
                    negative: { text: 'Empeorar la lesión', probability: 0.6, value: -5 }
                }
            }
        ]
    },
    {
        title: 'Oportunidad de patrocinio',
        description: 'Una marca importante quiere patrocinarte, pero eso implica cambiar tu imagen y compromisos publicitarios.',
        type: SituationType.DriverSituation,
        trigger: [
            {
                category: CategoryType.F1,
            },
            {
                category: CategoryType.INDYCAR,
            },
            {
                category: CategoryType.WEC
            },
            {
                category: CategoryType.F2,
            },
            {
                category: CategoryType.F3
            }
        ],
        options: [
            {
                id: 1,
                label: 'Aceptar el patrocinio',
                description: 'Aceptas el patrocinio y obtienes financiación extra, pero con más compromisos.',
                image: sponsorImage,
                badges: {
                    positive: { text: 'Ingresos extra y visibilidad', probability: 0.7, value: 1 },
                    negative: { text: 'Más presión publicitaria', probability: 0.3, value: -1 }
                }
            },
            {
                id: 2,
                label: 'Rechazar el patrocinio',
                description: 'Mantienes tu independencia y te centras exclusivamente en las carreras.',
                badges: {
                    positive: { text: 'Libertad y enfoque', probability: 0.5, value: 0 },
                    negative: { text: 'Perder financiación', probability: 0.5, value: 0 }
                }
            }
        ]
    }
];

export const SEASON_SITUATIONS: Situation[] = [
    {
        title: 'Safety Car en pista',
        description: 'Están ante las últimas vueltas de la carrera y alguien sufre un grave accidente, dirección de carrera despliega el coche de seguridad y se reagrupa el pelotón.',
        type: SituationType.SeasonSituation,
        trigger: [
            {
                category: CategoryType.F1,
            },
            {
                category: CategoryType.INDYCAR,
            },
            {
                category: CategoryType.F2,
            },
            {
                category: CategoryType.F3
            }
        ],
        options: [
            {
                id: 1,
                label: 'Mantenerse en pista',
                description: 'Decides mantenerte en pista y aprovechar la oportunidad para adelantar en la clasificación a tus rivales que han parado en boxes.',
                image: continueRacingImage,
                badges: {
                    positive: { text: 'Oportunidad de adelantar a rivales', probability: 0.6, value: 1 },
                    negative: { text: 'Riesgo de perder posiciones', probability: 0.4, value: -1 }
                }
            },
            {
                id: 2,
                label: 'Entrar a boxes',
                description: 'Decides entrar a boxes para cambiar neumáticos e intentar subir puestos.',
                image: boxImage,
                badges: {
                    positive: { text: 'Mejorar el rendimiento del coche', probability: 0.6, value: 1 },
                    negative: { text: 'Riesgo de perder posiciones', probability: 0.4, value: -1 }
                }
            }
        ]
    },
    {
        title: 'Estrategia en óvalo',
        description: 'Estás compitiendo en un óvalo de alta velocidad. El tráfico es denso y la ventilación del coche se está sobrecalentando.',
        type: SituationType.SeasonSituation,
        trigger: [
            {
                category: CategoryType.INDYCAR,
            }
        ],
        options: [
            {
                id: 1,
                label: 'Buscar el rebufo',
                description: 'Te pones detrás de otro coche para aprovechar el rebufo y ahorrar combustible.',
                badges: {
                    positive: { text: 'Ahorro de combustible', probability: 0.7, value: 2 },
                    negative: { text: 'Riesgo de sobrecalentamiento', probability: 0.3, value: -2 }
                }
            },
            {
                id: 2,
                label: 'Mantenerte en aire limpio',
                description: 'Te mantienes en aire limpio para refrigerar mejor el motor, pero gastas más combustible.',
                badges: {
                    positive: { text: 'Motor más fresco', probability: 0.8, value: 1 },
                    negative: { text: 'Mayor consumo de combustible', probability: 0.2, value: -1 }
                }
            }
        ]
    },
    {
        title: 'Relevo de pilotos - Fatiga en resistencia',
        description: 'Llevas 2 horas al volante en las 24 Horas. La fatiga empieza a afectar tu rendimiento. El equipo te pregunta si quieres hacer el relevo ahora o esperar.',
        type: SituationType.SeasonSituation,
        trigger: [
            {
                category: CategoryType.WEC,
            }
        ],
        options: [
            {
                id: 1,
                label: 'Relevo inmediato',
                description: 'Decides hacer el relevo para descansar y mantener la concentración.',
                badges: {
                    positive: { text: 'Rendimiento óptimo del relevo', probability: 0.9, value: 2 },
                    negative: { text: 'Pérdida de ritmo en el cambio', probability: 0.1, value: -1 }
                }
            },
            {
                id: 2,
                label: 'Alargar el stint',
                description: 'Aguantas un poco más para maximizar el stint actual.',
                badges: {
                    positive: { text: 'Maximizar el stint', probability: 0.4, value: 2 },
                    negative: { text: 'Riesgo de error por fatiga', probability: 0.6, value: -3 }
                }
            }
        ]
    },
    {
        title: 'Fallo del sistema híbrido (WEC)',
        description: 'El sistema híbrido de tu prototipo LMP1/Hypercar está dando problemas. La energía eléctrica no se está recuperando correctamente.',
        type: SituationType.SeasonSituation,
        trigger: [
            {
                category: CategoryType.WEC,
            }
        ],
        options: [
            {
                id: 1,
                label: 'Ajustar el mapa del motor',
                description: 'Modificas el mapa del motor para compensar la falta de energía eléctrica.',
                badges: {
                    positive: { text: 'Compensar la pérdida de potencia', probability: 0.5, value: 1 },
                    negative: { text: 'Mayor consumo de combustible', probability: 0.5, value: -2 }
                }
            },
            {
                id: 2,
                label: 'Entrar a boxes para revisión',
                description: 'Decides entrar a boxes para que el equipo revise el sistema híbrido.',
                badges: {
                    positive: { text: 'Solución definitiva', probability: 0.8, value: 2 },
                    negative: { text: 'Pérdida de tiempo significativa', probability: 0.2, value: -3 }
                }
            }
        ]
    },
    {
        title: 'Condiciones climáticas extremas',
        description: 'La lluvia intensa está haciendo la pista muy peligrosa. ¿Qué estrategia adoptas?',
        type: SituationType.SeasonSituation,
        trigger: [
            {
                category: CategoryType.F1,
            },
            {
                category: CategoryType.INDYCAR,
            },
            {
                category: CategoryType.WEC
            },
            {
                category: CategoryType.F2,
            },
            {
                category: CategoryType.F3
            }
        ],
        options: [
            {
                id: 1,
                label: 'Seguir con neumáticos de seco',
                description: 'Decides arriesgarte y mantener los neumáticos de seco, esperando que escampe.',
                image: rainImage,
                badges: {
                    positive: { text: 'Ventaja si escampa pronto', probability: 0.3, value: 1 },
                    negative: { text: 'Peligro extremo en pista', probability: 0.7, value: -2 }
                }
            },
            {
                id: 2,
                label: 'Cambiar a neumáticos de lluvia',
                description: 'Decides entrar a boxes para poner neumáticos de lluvia y tener mayor seguridad.',
                badges: {
                    positive: { text: 'Mayor seguridad y adherencia', probability: 0.8, value: 1 },
                    negative: { text: 'Mala opción si escampa', probability: 0.2, value: -1 }
                }
            }
        ]
    },
    {
        title: 'Sanción por exceder los límites',
        description: 'La FIA te ha sancionado con una penalización de 5 segundos por exceder los límites de la pista en varias ocasiones.',
        type: SituationType.SeasonSituation,
        trigger: [
            {
                category: CategoryType.F1,
            },
            {
                category: CategoryType.F2,
            },
            {
                category: CategoryType.F3
            }
        ],
        options: [
            {
                id: 1,
                label: 'Cumplir la sanción',
                description: 'Aceptas la sanción y la cumples durante la siguiente parada en boxes.',
                image: penaltyImage,
                badges: {
                    positive: { text: 'Deportividad y aceptación', probability: 0.9, value: 1 },
                    negative: { text: 'Pérdida de tiempo en carrera', probability: 0.1, value: -1 }
                }
            },
            {
                id: 2,
                label: 'Apelar la decisión',
                description: 'Decides apelar la sanción, lo que podría resultar en una reducción o en una penalización mayor.',
                badges: {
                    positive: { text: 'Posible reducción de la sanción', probability: 0.4, value: 1 },
                    negative: { text: 'Sanción mayor si se rechaza', probability: 0.6, value: -1 }
                }
            }
        ]
    },
    {
        title: 'Problema mecánico en el coche',
        description: 'El motor de tu coche empieza a fallar en plena carrera. ¿Qué haces?',
        type: SituationType.SeasonSituation,
        trigger: [
            {
                category: CategoryType.F1,
            },
            {
                category: CategoryType.INDYCAR,
            },
            {
                category: CategoryType.WEC
            },
            {
                category: CategoryType.F2,
            },
            {
                category: CategoryType.F3
            }
        ],
        options: [
            {
                id: 1,
                label: 'Seguir en pista',
                description: 'Decides seguir forzando el motor, esperando que aguante hasta el final.',
                image: engineImage,
                badges: {
                    positive: { text: 'Posible victoria si aguanta', probability: 0.2, value: 2 },
                    negative: { text: 'Riesgo de abandono', probability: 0.8, value: -2 }
                }
            },
            {
                id: 2,
                label: 'Entrar a boxes',
                description: 'Decides entrar a boxes para revisar el problema y evitar un abandono definitivo.',
                badges: {
                    positive: { text: 'Evitar un abandono seguro', probability: 0.8, value: 2 },
                    negative: { text: 'Perder tiempo valioso', probability: 0.2, value: -2 }
                }
            }
        ]
    },
    {
        title: 'Lucha por el podio',
        description: 'Estás en cuarta posición a pocas vueltas del final. El tercer clasificado está mostrando problemas.',
        type: SituationType.SeasonSituation,
        trigger: [
            {
                category: CategoryType.F1,
            },
            {
                category: CategoryType.INDYCAR,
            },
            {
                category: CategoryType.WEC
            },
            {
                category: CategoryType.F2,
            },
            {
                category: CategoryType.F3
            }
        ],
        options: [
            {
                id: 1,
                label: 'Atacar al tercero',
                description: 'Decides atacar con todo para intentar conseguir el tercer puesto.',
                image: podiumImage,
                badges: {
                    positive: { text: 'Podio asegurado', probability: 0.7, value: 3 },
                    negative: { text: 'Riesgo de perder la posición', probability: 0.3, value: -3 }
                }
            },
            {
                id: 2,
                label: 'Mantener la posición',
                description: 'Decides mantener tu posición, sin arriesgar.',
                badges: {
                    positive: { text: 'Puntos asegurados', probability: 0.9, value: 2 },
                    negative: { text: 'Rotura del motor', probability: 0.1, value: -3 }
                }
            }
        ]
    },
    {
        title: 'Desgaste de neumáticos',
        description: 'Los neumáticos delanteros están mostrando desgaste prematuro. La estrategia de carrera se complica.',
        type: SituationType.SeasonSituation,
        trigger: [
            {
                category: CategoryType.F1,
            },
            {
                category: CategoryType.INDYCAR,
            },
            {
                category: CategoryType.WEC
            },
            {
                category: CategoryType.F2,
            },
            {
                category: CategoryType.F3
            }
        ],
        options: [
            {
                id: 1,
                label: 'Parar en boxes',
                description: 'Decides hacer una parada adicional para cambiar los neumáticos.',
                image: boxImage,
                badges: {
                    positive: { text: 'Seguridad y rendimiento', probability: 0.7, value: 2 },
                    negative: { text: 'Pérdida de tiempo', probability: 0.3, value: -2 }
                }
            },
            {
                id: 2,
                label: 'Seguir en pista',
                description: 'Decides gestionar los neumáticos y seguir en pista, reduciendo el ritmo.',
                badges: {
                    positive: { text: 'Ahorrar tiempo en boxes', probability: 0.5, value: 1 },
                    negative: { text: 'Rendimiento reducido', probability: 0.5, value: -1 }
                }
            }
        ]
    },
    {
        title: 'Rivalidad con el compañero de equipo',
        description: 'Tu compañero de equipo te está presionando en carrera. La tensión es alta y ambos queremos la victoria. Recibes instrucciones del equipo para que dejes pasar a tu compañero.',
        type: SituationType.SeasonSituation,
        trigger: [
            {
                category: CategoryType.F1,
            },
            {
                category: CategoryType.INDYCAR,
            },
            {
                category: CategoryType.WEC
            },
            {
                category: CategoryType.F2,
            },
            {
                category: CategoryType.F3
            }
        ],
        options: [
            {
                id: 1,
                label: 'Competir al máximo',
                description: 'Decides competir sin concesiones, buscando demostrar quién es mejor.',
                badges: {
                    positive: { text: 'Demostrar superioridad', probability: 0.6, value: 2 },
                    negative: { text: 'Riesgo de accidente', probability: 0.4, value: -2 }
                }
            },
            {
                id: 2,
                label: 'Aceptar la instrucción y dejar pasar',
                description: 'Decides seguir las instrucciones del equipo y dejar pasar a tu compañero.',
                image: teammateImage,
                badges: {
                    positive: { text: 'Trabajo en equipo', probability: 1, value: 2 }
                }
            },
        ]
    }
];