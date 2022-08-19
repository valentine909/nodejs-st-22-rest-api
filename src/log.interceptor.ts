import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { markGreen, markMagenta, markYellow } from './utils/for.console.log';
import { inspect } from 'util';

@Injectable()
export class LogInterceptor implements NestInterceptor {
  constructor(private readonly logger: Logger) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      tap(() => {
        const request = context.switchToHttp().getRequest();
        const path = request._parsedUrl?.pathname || request.url;
        const method = request.method;
        const service = context.getClass().name;
        const handler = context.getHandler().name;
        const response = context.switchToHttp().getResponse();
        const inspectOptions = {
          compact: true,
          breakLength: Infinity,
          colors: true,
          depth: 1,
          showHidden: false,
        };
        this.logger.log(
          `${markYellow('[Time]')} ${markMagenta(new Date().toUTCString())}`,
        );
        this.logger.log(`${markYellow('[Path]')} ${markGreen(path)}`);
        this.logger.log(`${markYellow('[Method]')} ${markGreen(method)}`);
        this.logger.log(`${markYellow('[Service]')} ${markGreen(service)}`);
        this.logger.log(`${markYellow('[Handler]')} ${markGreen(handler)}`);
        this.logger.log(
          `${markMagenta('[Request]')} ${inspect(request, {
            ...inspectOptions,
          })}`,
        );
        this.logger.log(
          `${markMagenta('[Response]')} ${inspect(response, {
            ...inspectOptions,
          })}`,
        );
      }),
    );
  }
}
