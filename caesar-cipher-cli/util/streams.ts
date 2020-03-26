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

/** I made this a higher order function, so that in the future it'll be easier to
    implement new ciphering algorithms, just by passing another transform function. 
*/
export const createTransformStream = (transform: TransformFunction) =>
    through2(transform)

