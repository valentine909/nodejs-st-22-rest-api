import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import {
  markMagenta,
  markYellow,
  simplifyObject,
} from './utils/for.console.log';

@Injectable()
export class LogInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log(markMagenta(new Date().toUTCString()));
    console.log(`${markYellow('path:')} ${context['args'][0]['url']}`);
    console.log(
      `${markYellow('request:')} ${simplifyObject(context['args'][0])}`,
    );
    console.log(
      `${markYellow('response:')} ${simplifyObject(context['args'][1])}`,
    );
    console.log(`${markYellow('method:')} ${context['args'][0]['method']}`);
    return next.handle();
  }
}
