import { PathLike } from 'fs';

export interface Options {
    shift: number,
    input: PathLike,
    output: PathLike,
    action: Action
}

export enum Action {
    Encode = 'encode',
    Decode = 'decode'
}
