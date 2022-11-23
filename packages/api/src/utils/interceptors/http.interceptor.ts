import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  ConflictException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { QueryFailedError } from 'typeorm';

@Injectable()
export class HttpInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((exception: unknown) => {
        switch (exception.constructor) {
          case QueryFailedError: {
            const { driverError } = exception as QueryFailedError;
            return throwError(() => {
              return new ConflictException(driverError.detail);
            });
          }
          default: {
            return throwError(() => exception);
          }
        }
      }),
    );
  }
}
