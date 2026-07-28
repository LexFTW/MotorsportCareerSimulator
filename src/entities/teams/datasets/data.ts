import { DriverStyles } from "@/entities/drivers";
import type { Team } from '../models/types'
import { CategoryType } from '../../categories/models/types'

// Logos
import mercedesLogo from '@shared/assets/logos/f1Teams/mercedes.webp'
import ferrariLogo from '@shared/assets/logos/f1Teams/scuderia-ferrari.svg'
import redbullLogo from '@shared/assets/logos/f1Teams/redbullracing.webp'
import mclarenLogo from '@shared/assets/logos/f1Teams/mclaren.svg'
import astonMartinLogo from '@shared/assets/logos/f1Teams/aston-martin.svg'
import alpineLogo from '@shared/assets/logos/f1Teams/alpine.png'
import williamsLogo from '@shared/assets/logos/f1Teams/williams.png'
import racingbullsLogo from '@shared/assets/logos/f1Teams/racingbulls.png'
import audiLogo from '@shared/assets/logos/f1Teams/audi.svg'
import haasLogo from '@shared/assets/logos/f1Teams/haas.png'
import cadillacLogo from '@shared/assets/logos/f1Teams/cadillac.png'

import invictaLogo from '@shared/assets/logos/f2Teams/invicta-racing.webp'
import hitechLogo from '@shared/assets/logos/f2Teams/hitech.png'
import camposLogo from '@shared/assets/logos/f2Teams/campos-racing.png'

export const TEAMS: Team[] = [
    {
        id: 1,
        name: 'Mercedes-AMG Petronas',
        category: CategoryType.F1,
        tier: '1',
        style: DriverStyles.Balanced,
        brand: {
            color: '#00D2BE',
            logo: mercedesLogo,
        }
    },
    {
        id: 2,
        name: 'Scuderia Ferrari',
        category: CategoryType.F1,
        tier: '1',
        style: DriverStyles.Balanced,
        brand: {
            color: '#DC0000',
            logo: ferrariLogo,
        }
    },
    {
        id: 3,
        name: 'Oracle Red Bull Racing',
        category: CategoryType.F1,
        tier: '1',
        style: DriverStyles.Aggressive,
        brand: {
            color: '#1E41FF',
            logo: redbullLogo,
        }
    },
    {
        id: 4,
        name: 'McLaren F1 Team',
        category: CategoryType.F1,
        tier: '1',
        style: DriverStyles.Balanced,
        brand: {
            color: '#FF8700',
            logo: mclarenLogo,
        }
    },
    {
        id: 5,
        name: 'Aston Martin Aramco',
        category: CategoryType.F1,
        tier: '2',
        style: DriverStyles.Balanced,
        brand: {
            color: '#006F62',
            logo: astonMartinLogo,
        }
    },
    {
        id: 6,
        name: 'BWT Alpine F1 Team',
        category: CategoryType.F1,
        tier: '2',
        style: DriverStyles.Balanced,
        brand: {
            color: '#0090FF',
            logo: alpineLogo,
        }
    },
    {
        id: 7,
        name: 'Williams Racing',
        category: CategoryType.F1,
        tier: '2',
        style: DriverStyles.Balanced,
        brand: {
            color: '#005AFF',
            logo: williamsLogo,
        }
    },
    {
        id: 8,
        name: 'Racing Bulls',
        category: CategoryType.F1,
        tier: '2',
        style: DriverStyles.Aggressive,
        brand: {
            color: '#6692FF',
            logo: racingbullsLogo,
        }
    },
    {
        id: 9,
        name: 'Audi F1 Team',
        category: CategoryType.F1,
        tier: '2',
        style: DriverStyles.Balanced,
        brand: {
            color: '#E31E24',
            logo: audiLogo,
        }
    },
    {
        id: 10,
        name: 'MoneyGram Haas F1 Team',
        category: CategoryType.F1,
        tier: '3',
        style: DriverStyles.Balanced,
        brand: {
            color: '#B6BABD',
            logo: haasLogo,
        }
    },
    {
        id: 11,
        name: 'Cadillac F1 Team',
        category: CategoryType.F1,
        tier: '3',
        style: DriverStyles.Balanced,
        brand: {
            color: '#0072CE',
            logo: cadillacLogo,
        }
    },
    // ==================== F2 TEAMS ====================
    {
        id: 12,
        name: 'Invicta Racing',
        category: CategoryType.F2,
        tier: '1', // Bicampeones defensores
        style: DriverStyles.Balanced,
        brand: {
            color: '#FF6600', // Color corporativo de Invicta
            logo: invictaLogo,
        }
    },
    {
        id: 13,
        name: 'Hitech',
        category: CategoryType.F2,
        tier: '1',
        style: DriverStyles.Balanced,
        brand: {
            color: '#1E41FF',
            logo: hitechLogo,
        }
    },
    {
        id: 14,
        name: 'Campos Racing',
        category: CategoryType.F2,
        tier: '1',
        style: DriverStyles.Aggressive, // Conocidos por su estilo agresivo
        brand: {
            color: '#FF0000',
            logo: camposLogo,
        }
    },
    {
        id: 15,
        name: 'DAMS Lucas Oil',
        category: CategoryType.F2,
        tier: '2',
        style: DriverStyles.Balanced,
        brand: {
            color: '#0033A0',
            logo: '',
        }
    },
    {
        id: 16,
        name: 'MP Motorsport',
        category: CategoryType.F2,
        tier: '2',
        style: DriverStyles.Balanced,
        brand: {
            color: '#FF6600',
            logo: '',
        }
    },
    {
        id: 17,
        name: 'PREMA Racing',
        category: CategoryType.F2,
        tier: '2',
        style: DriverStyles.Balanced,
        brand: {
            color: '#DC0000',
            logo: '',
        }
    },
    {
        id: 18,
        name: 'Rodin Motorsport',
        category: CategoryType.F2,
        tier: '2',
        style: DriverStyles.Balanced,
        brand: {
            color: '#FFD700',
            logo: '',
        }
    },
    {
        id: 19,
        name: 'ART Grand Prix',
        category: CategoryType.F2,
        tier: '2',
        style: DriverStyles.Balanced,
        brand: {
            color: '#FF1493',
            logo: '',
        }
    },
    {
        id: 20,
        name: 'AIX Racing',
        category: CategoryType.F2,
        tier: '3',
        style: DriverStyles.Balanced,
        brand: {
            color: '#000000',
            logo: '',
        }
    },
    {
        id: 21,
        name: 'Van Amersfoort Racing',
        category: CategoryType.F2,
        tier: '3',
        style: DriverStyles.Balanced,
        brand: {
            color: '#FF6600',
            logo: '',
        }
    },
    {
        id: 22,
        name: 'Trident',
        category: CategoryType.F2,
        tier: '3',
        style: DriverStyles.Balanced,
        brand: {
            color: '#0000FF',
            logo: '',
        }
    }
]