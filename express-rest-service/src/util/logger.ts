import colors from 'colors/safe'
import strip from 'strip-color';
import { WinstonModule } from 'nest-winston';
import { transports, format } from 'winston';

const nestLikeFormat = format.printf(({ context, level, timestamp, message }) => {
    const contextMsg = context ? `[${colors.yellow(context)}]` : '';
    return `[${level}]: ${new Date(timestamp).toLocaleString()}\t ${contextMsg} ${message}`;
});

// Files don't work well with colors so we string them from the string
const fileFormat = format.printf(({ context, level, timestamp, message }) => {
    const contextMsg = context ? `[${colors.yellow(context)}]` : '';
    return strip(`[${level}]: ${new Date(timestamp).toLocaleString()}\t ${contextMsg} ${message}`);
});

const options = {
    format: format.combine(
        format.timestamp(),
        fileFormat
    ),
    transports: [
        new transports.File({ filename: 'error.log', level: 'error' }),
        new transports.File({ filename: 'combined.log' }),
        // Colorize just the console output
        new transports.Console({
            format: format.combine(
                format.timestamp(),
                format.colorize({ all: true }),
                format.splat(),
                nestLikeFormat
            )
        })
    ]
}

export const bootstrapLogger = WinstonModule.createLogger(options);

export const rootLogger = WinstonModule.forRoot(options); 
