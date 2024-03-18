import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import broadcastUtil from 'src/utils/broadcast.util';

@Injectable()
export class ExceptionInterceptor implements NestInterceptor {
  intercept(_: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) => {
        broadcastUtil.telegram({
          message: `${process.env.ENVIRONMENT || 'PRODUCTION'} | ` + err,
        });
        return throwError(() => err);
      })
    );
  }
}
