import {
  Controller,
  Post,
  Body,
  Headers,
  HttpException,
  HttpStatus,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Routes } from '../utils/constants/routes';
import { ErrorMessage } from '../utils/error.messages';
import { AllowUnauthorizedRequest } from '../utils/guards/access.decorator';

@Controller(`v1/${Routes.auth}`)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @AllowUnauthorizedRequest()
  @Post(Routes.login)
  async login(@Body() loginDto: LoginDto) {
    const tokens = await this.authService.login(loginDto);
    if (!tokens) {
      throw new HttpException(
        {
          message: ErrorMessage.unauthorized,
          statusCode: HttpStatus.UNAUTHORIZED,
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
    return tokens;
  }

  @AllowUnauthorizedRequest()
  @Get(Routes.refresh)
  async refresh(@Headers('refresh') refreshToken: string) {
    const access_token = await this.authService.refresh(refreshToken);
    if (!access_token) {
      throw new HttpException(
        {
          message: ErrorMessage.unauthorized,
          statusCode: HttpStatus.UNAUTHORIZED,
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
    return { access_token };
  }
}
