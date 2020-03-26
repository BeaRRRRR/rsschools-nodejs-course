import fs, { PathLike, ReadStream, WriteStream } from 'fs';
import through2 from 'through2';
import { TransformFunction } from 'through2';

const onError = () => {
    console.error('File not found');
    process.exit(1);
}

export const createReadStream = (input: PathLike): ReadStream =>
    (input
        ? fs.createReadStream(input).on('error', onError)
        : process.stdin
    ) as ReadStream;

export const createWriteStream = (output: PathLike): WriteStream =>
    (output
        ? fs.createWriteStream(output, { flags: 'a' }).on('error', onError)
        : process.stdout
    ) as WriteStream

export const createTransformStream = (transform: TransformFunction) =>
    through2(transform)

