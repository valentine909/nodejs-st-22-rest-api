import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { markMagenta, markYellow } from './utils/for.console.log';
import { inspect } from 'util';

@Injectable()
export class LogInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const path = request.url;
    const method = request.method;
    const response = context.switchToHttp().getResponse();
    return next.handle().pipe(
      tap(() => {
        console.log(markMagenta(new Date().toUTCString()));
        console.log(`${markYellow('path:')} ${path}`);
        console.log(`${markYellow('method:')} ${method}`);
        console.log(
          `${markYellow('request:')} ${inspect(request, false, 1, true)}`,
        );
        console.log(
          `${markYellow('response:')} ${inspect(response, false, 1, true)}`,
        );
      }),
    );
  }
}
