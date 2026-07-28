import { type Driver, DriverStyles } from "@/entities/drivers";
import { CategoryType } from "@/entities/categories";

export const DRIVERS: Driver[] = [
    {
        id: 1,
        identity: {
            name: 'Lewis Hamilton',
            age: 38,
            nationality: 'British',
            dorsal: 44,
        },
        rating: 89,
        career: [
            {
                races: 300,
                wins: 103,
                podiums: 182,
                poles: 103,
                fastestLaps: 58,
                championships: 7,
                constructor: 2,
                category: CategoryType.F1,
            }
        ],
        seasonStats: [],
        style: DriverStyles.Aggressive,
    },
    {
        id: 2,
        identity: {
            name: 'Max Verstappen',
            age: 26,
            nationality: 'Dutch',
            dorsal: 33,
        },
        rating: 92,
        career: [
            {
                races: 150,
                wins: 35,
                podiums: 80,
                poles: 20,
                fastestLaps: 15,
                championships: 2,
                constructor: 1,
                category: CategoryType.F1,
            }
        ],
        seasonStats: [],
        style: DriverStyles.Aggressive,
    },
    {
        id: 3,
        identity: {
            name: 'Charles Leclerc',
            age: 25,
            nationality: 'Monegasque',
            dorsal: 16,
        },
        rating: 85,
        career: [
            {
                races: 100,
                wins: 10,
                podiums: 30,
                poles: 5,
                fastestLaps: 3,
                championships: 0,
                constructor: 1,
                category: CategoryType.F1,
            }
        ],
        seasonStats: [],
        style: DriverStyles.Strategic,
    }
]