import { Document } from 'mongoose';

export interface UserModel extends Document {
    readonly name: string,
    readonly login: string,
    readonly password: string
}
