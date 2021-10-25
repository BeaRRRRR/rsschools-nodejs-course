import { Schema } from 'mongoose';

export const BoardSchema = new Schema({
    title: String,
    columns: Array
});
