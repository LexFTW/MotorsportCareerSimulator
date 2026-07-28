import { DriverStyles, type DriverState } from "../models/types";

export const initialState: DriverState = {
  player: {
    identity: {
      name: 'Alexis Mengual',
      nationality: 'Spain',
      age: 16,
      dorsal: 7,
    },
    rating: 60,
    seasonStats: [],
    career: [],
    style: DriverStyles.Aggressive,
    id: 99,
  },
};