import { Column } from './column.interface';

export interface Board {
    id: string,
    title: string,
    columns: Column[],
}
