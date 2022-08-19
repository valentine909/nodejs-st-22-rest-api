import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { ErrorMessage } from '../error.messages';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    const statusCode =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.message
        : ErrorMessage.internalServerError;

    const response =
      exception instanceof HttpException && 'response' in exception
        ? exception['response']
        : '';

    const responseBody = response
      ? response
      : {
          statusCode,
          message,
        };
    httpAdapter.reply(ctx.getResponse(), responseBody, statusCode);
  }
}
