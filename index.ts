import { Command } from 'commander';
import fs, { PathLike } from 'fs';
import through2 from 'through2';
const program = new Command();

program
    .requiredOption('-s, --shift <number>', 'a shift', (s) => parseInt(s))
    .option('-i, --input <filename>', 'a input file')
    .option('-o, --output <filename>', 'an output file')
    .requiredOption('-a, --action <action>', 'an action: encode/decode')
    .parse(process.argv);

enum Action {
    Encode = 'encode',
    Decode = 'decode'
}

interface Options {
    shift: number,
    input: PathLike,
    output: PathLike,
    action: Action
}

let { shift, input, output, action }: Options = <Options><unknown>program;

if (action !== Action.Decode && action !== Action.Encode) {
    console.log(`error: required option '-s, --shift <number>' not specified`)
    process.exit(1)
}
if (!input) console.log(`Please input the data you want to ${action}`);
if (action === Action.Decode) shift = -shift;

(input
    ? fs.createReadStream(input).on('error', () => console.log('File not found'))
    : process.stdin)
    .pipe(through2(function(chunk, enc, callback) {
        for (var i = 0; i < chunk.length; i++) {
            if (chunk[i] >= 97 && chunk[i] <= 122) {
                chunk[i] = ((((chunk[i] - 97 + shift) % 26) + 26) % 26) + 97;
            }
        }

        this.push(chunk);
        callback();
    }))
    .pipe(output
        ? fs.createWriteStream(output).on('error', () => console.log('File not found'))
        : process.stdout);
