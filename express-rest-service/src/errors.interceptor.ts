import { CallHandler, ExecutionContext, Injectable, NestInterceptor, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { EntityNotFoundError } from './errors/EntityNotFoundError';

/**
   This is a project wide interceptor for handling basic, non-specific errors
   It maps errors thrown from the service/repository layer to their HTTP alternatives
   e.g. maps EntityNotFoundError to NotFoundException
*/
@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
    constructor(private readonly logger) { }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next
            .handle()
            .pipe(
                catchError((error: Error) => {
                    this.logger.error(`[ErrorsInterceptor] ${error.stack} \n`);
                    switch (error.constructor) {
                        case EntityNotFoundError:
                            return throwError(new NotFoundException(error.message));
                        default:
                            // Any other unhandled error gets mapped to InternalServerError
                            return throwError(new InternalServerErrorException())

                    }
                }));
    }
}
