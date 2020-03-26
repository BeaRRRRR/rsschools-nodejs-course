import { Command } from 'commander';
import { createReadStream, createWriteStream, createTransformStream } from './util/streams';
import caesarCypther from './util/caesar-cypher';
import { Action, Options } from './types';
const program = new Command();

program
    .requiredOption('-s, --shift <number>', 'a shift', (s) => parseInt(s))
    .option('-i, --input <filename>', 'a input file')
    .option('-o, --output <filename>', 'an output file')
    .requiredOption('-a, --action <action>', 'an action: encode/decode')
    .parse(process.argv);


let { shift, input, output, action }: Options = <Options><unknown>program;

if (action !== Action.Decode && action !== Action.Encode) {
    console.log(`error: action should be either 'encode' or 'decode'`)
    process.exit(1)
}
if (!input) console.log(`Please input the data you want to ${action}`);

createReadStream(input)
    .pipe(createTransformStream(caesarCypther(action === Action.Decode ? -shift : shift)))
    .pipe(createWriteStream(output));
