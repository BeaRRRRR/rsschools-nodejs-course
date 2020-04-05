// The ! operator is basically telling the compilator that this parameter won't be null or undefined
// https://stackoverflow.com/a/42274019/9299780

export class GetUserDto {
    id!: string;
    name!: string;
    login!: string;
}
