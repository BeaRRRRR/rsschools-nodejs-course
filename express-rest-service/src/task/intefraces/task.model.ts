import { Document } from 'mongoose';

export interface TaskModel extends Document {
    readonly title: string,
    readonly order: string,
    readonly description: string,
    readonly userId: string,
    readonly boardId: string,
    readonly columnId: string,
}
