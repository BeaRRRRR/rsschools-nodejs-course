import { Document } from 'mongoose';
import { Column } from './column.interface';

export interface BoardModel extends Document {
    title: string,
    columns: Column[],
}
