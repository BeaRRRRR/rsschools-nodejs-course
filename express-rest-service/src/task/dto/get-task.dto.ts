/* This DTO is the same as our Task intefrace, but I still think it's necessary. See why
   https://softwareengineering.stackexchange.com/questions/373284/what-is-the-use-of-dto-instead-of-entity

 The ! operator is basically telling the compilator that this parameter won't be null or undefined
 https://stackoverflow.com/a/42274019/9299780
*/
export class GetTaskDto {
    id!: string | null;
    title!: string;
    order!: string;
    description!: string;
    userId!: string;
    boardId!: string;
    columnId!: string;
}
