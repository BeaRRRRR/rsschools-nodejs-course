import { TransformFunction, TransformCallback } from 'through2';
import stream from 'stream';

/**
   This function cypthers a char with caesar cypther
   But can also be used to decypther if shift is negative
   @param {number} shift - The number of how many places to shift the char 
*/
export default (shift: number) => {
    const transform: TransformFunction =
        function(this: stream.Transform, chunk: any, enc: string, callback: TransformCallback): void {
            for (var i = 0; i < chunk.length; i++) {
                if (chunk[i] >= 97 && chunk[i] <= 122) {
                    chunk[i] = ((((chunk[i] - 97 + shift) % 26) + 26) % 26) + 97;
                }
            }

            this.push(chunk);
            callback();
        }

    return transform;
}
