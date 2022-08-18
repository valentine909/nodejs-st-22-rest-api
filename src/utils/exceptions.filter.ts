import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { markYellow } from './for.console.log';
import { ErrorMessage } from './messages';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const { method, path, body, query } = request;

    const statusCode =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.message
        : ErrorMessage['500'];

    console.log(markYellow('Http errors logger:'), {
      method,
      path,
      arguments: {
        body,
        query,
      },
      message,
    });
    const responseBody = {
      statusCode,
      message,
    };
    httpAdapter.reply(ctx.getResponse(), responseBody, statusCode);
  }
}
