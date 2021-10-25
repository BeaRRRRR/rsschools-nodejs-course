import { Injectable, Inject, NestMiddleware } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
// @ts-ignore
import colors from 'colors/safe'

// @ts-ignore
function objToString(obj: Object, tab: string = '  '): string {
    let str = '';
    for (const p in obj) {
        if (obj.hasOwnProperty(p)) {
            let value = typeof obj[p] === 'object' ? objToString(obj[p], tab + '  ') : obj[p];
            if (obj[p] == null) value = 'null';
            str += tab + p + ':' + value + '\n';
        }
    }
    if (!str.length) return '{}';
    if (tab !== '  ') return '{ \n' + str + tab + '}';
    return '{ \n' + str + '}';
}

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    // @ts-ignore
    constructor(@Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger) { }

    use(req: any, res: any, next: () => void) {
        next();
    }
}
