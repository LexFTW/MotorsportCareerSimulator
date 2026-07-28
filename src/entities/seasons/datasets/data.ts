import type { Season } from "../models/types";
import { CategoryType } from "@/entities/categories";

import f1Logo from '@shared/assets/logos/f1.svg.webp'
import f2Logo from '@shared/assets/logos/f2.avif'
import f3Logo from '@shared/assets/logos/f3.png'
import wecLogo from '@shared/assets/logos/wec.svg.webp'

export const SEASONS: Season[] = [
    {
        races: 22,
        category: CategoryType.F1,
        brand: {
            color: '#FF4B4B',
            logo: f1Logo,
        },
        gridSize: 20,
        pointsMap: { 1:25, 2:18, 3:15, 4:12, 5:10, 6:8, 7:6, 8:4, 9:2, 10:1 },
    },
    {
        races: 20,
        category: CategoryType.F2,
        brand: {
            color: '#00D2BE',
            logo: f2Logo,
        },
        gridSize: 20,
        pointsMap: { 1:25, 2:18, 3:15, 4:12, 5:10, 6:8, 7:6, 8:4, 9:2, 10:1 },
    },
    {
        races: 18,
        category: CategoryType.F3,
        brand: {
            color: '#FFB800',
            logo: f3Logo,
        },
        gridSize: 20,
        pointsMap: { 1:25, 2:18, 3:15, 4:12, 5:10, 6:8, 7:6, 8:4, 9:2, 10:1 },
    },
    {
        races: 16,
        category: CategoryType.WEC,
        brand: {
            color: '#042B60',
            logo: wecLogo,
        },
        gridSize: 20,
        pointsMap: { 1:25, 2:18, 3:15, 4:12, 5:10, 6:8, 7:6, 8:4, 9:2, 10:1 },
    }
];