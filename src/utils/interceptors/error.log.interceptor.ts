import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class ErrorLogInterceptor implements NestInterceptor {
  constructor(private readonly logger: Logger) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) =>
        throwError(() => {
          const request = context.switchToHttp().getRequest();
          const { method, path, body, query } = request;
          const service = context.getClass().name;
          const handler = context.getHandler().name;
          const message = err.response || err.message || '';
          this.logger.error(
            JSON.stringify(
              {
                method,
                path,
                service,
                handler,
                arguments: {
                  body,
                  query,
                },
                message,
              },
              null,
              2,
            ),
          );
          return err;
        }),
      ),
    );
  }
}
