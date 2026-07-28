export const enum CategoryType {
    F1 = 'F1',
    INDYCAR = "INDYCAR",
    WEC = "WEC",
    F2 = 'F2',
    F3 = 'F3'
}

export interface Category {
    id: number;
    type: CategoryType;
}