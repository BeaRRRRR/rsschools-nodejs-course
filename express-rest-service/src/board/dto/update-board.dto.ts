import { Column } from '../intefraces/column.interface';

export class UpdateBoardDto {
    title?: string;
    columns?: Column[];
}
