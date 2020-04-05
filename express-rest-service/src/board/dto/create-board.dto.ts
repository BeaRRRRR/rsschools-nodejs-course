import { Column } from '../intefraces/column.interface';

export class CreateBoardDto {
    title!: string;
    columns!: Column[];
}
