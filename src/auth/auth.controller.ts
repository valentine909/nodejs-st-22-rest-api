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
        ErrorMessage.unauthorized,
        HttpStatus.UNAUTHORIZED,
      );
    }
    return tokens;
  }

  @Get(Routes.refresh)
  refresh(@Headers('refresh') refreshToken: string) {
    const token = this.authService.refresh(refreshToken);
    console.log(token);
    if (!token) {
      throw new HttpException(
        ErrorMessage.unauthorized,
        HttpStatus.UNAUTHORIZED,
      );
    }
    return token;
  }
}
