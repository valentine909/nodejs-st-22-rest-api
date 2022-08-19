import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const allowUnauthorizedRequest = this.reflector.get<boolean>(
      'allowUnauthorizedRequest',
      context.getHandler(),
    );
    return allowUnauthorizedRequest || this.authService.validateJWT(request);
  }
}
