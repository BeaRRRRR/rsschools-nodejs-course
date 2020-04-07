import { CallHandler, ExecutionContext, Injectable, NestInterceptor, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { EntityNotFoundError } from './errors/EntityNotFoundError';

/**
   This is a project wide interceptor for handling basic, non-specific errors
   It maps errors thrown from the service layer to their HTTP alternatives
   e.g. maps EntityNotFoundError to NotFoundException
*/
@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next
            .handle()
            .pipe(
                catchError((error: Error) => {
                    switch (error.constructor) {
                        case EntityNotFoundError:
                            return throwError(new NotFoundException(error.message));
                        default:
                            return throwError(new InternalServerErrorException())

                    }
                }));
    }
}
