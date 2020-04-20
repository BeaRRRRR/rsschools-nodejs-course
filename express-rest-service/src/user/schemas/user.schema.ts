import { Schema } from 'mongoose';

export const UserSchema = new Schema({
    name: String,
    login: String,
    password: String
});
