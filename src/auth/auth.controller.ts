import {
  Controller,
  Post,
  Body,
  Headers,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Routes } from '../utils/constants/routes';
import { ErrorMessage } from '../utils/error.messages';

@Controller(`v1/${Routes.auth}`)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post(Routes.login)
  async login(@Body() loginDto: LoginDto) {
    const token = await this.authService.login(loginDto);
    if (!token) {
      throw new HttpException(
        ErrorMessage.unauthorized,
        HttpStatus.UNAUTHORIZED,
      );
    }
    return { token };
  }

  @Post(Routes.refresh)
  refresh(@Headers('refresh') refreshToken: string) {
    return this.authService.refresh(refreshToken);
  }
}
