import type { Season } from "../models/types";
import { CategoryType } from "@/entities/categories";

import f1Logo from '@/assets/logos/f1.svg.webp'
import f2Logo from '@/assets/logos/f2.avif'
import f3Logo from '@/assets/logos/f3.png'
import wecLogo from '@/assets/logos/wec.svg.webp'

export const SEASONS: Season[] = [
    {
        races: 22,
        category: CategoryType.F1,
        brand: {
            color: '#FF4B4B',
            logo: f1Logo,
        }
    },
    {
        races: 20,
        category: CategoryType.F2,
        brand: {
            color: '#00D2BE',
            logo: f2Logo,
        }
    },
    {
        races: 18,
        category: CategoryType.F3,
        brand: {
            color: '#FFB800',
            logo: f3Logo,
        }
    },
    {
        races: 16,
        category: CategoryType.WEC,
        brand: {
            color: '#042B60',
            logo: wecLogo,
        }
    }
];