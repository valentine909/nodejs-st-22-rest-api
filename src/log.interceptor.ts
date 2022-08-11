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
    const request = context['args'][0];
    const path = request['url'];
    const method = request['method'];
    const response = context['args'][1];
    console.log(markMagenta(new Date().toUTCString()));
    console.log(`${markYellow('path:')} ${path}`);
    console.log(`${markYellow('method:')} ${method}`);
    console.log(`${markYellow('request:')} ${simplifyObject(request)}`);
    console.log(`${markYellow('response:')} ${simplifyObject(response)}`);
    return next.handle();
  }
}
