import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { IncomingMessage } from 'http';
import { ErrorMessage } from '../utils/error.messages';
import 'dotenv/config';
import { User } from '../users/entities/user.entity';
import { JwtSignOptions } from '@nestjs/jwt/dist/interfaces';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(
    loginDto: LoginDto,
  ): Promise<{ access_token: string; refresh_token: string }> {
    const { login, password } = loginDto;
    const user = await this.usersService.findByLogin(login, false);
    let access_token;
    let refresh_token;
    if (
      user &&
      (await this.usersService.verifyPassword(password, user.password))
    ) {
      access_token = this.generateJWT(user);
      refresh_token = this.generateJWT(user, {
        expiresIn: parseInt(process.env.REFRESH, 10),
      });
      await this.usersService.update(user.id, { refresh: refresh_token });
    } else {
      return null;
    }
    return { access_token, refresh_token };
  }

  async refresh(refreshToken: string) {
    const payload = this.jwtService.verify(refreshToken);
    const user = await this.usersService.findOne(payload.id);
    if (user.refresh === refreshToken) {
      return this.generateJWT(user);
    }
    return null;
  }

  validateJWT(req: IncomingMessage): boolean {
    const jwt = req.headers?.authorization?.split(' ')[1];
    if (!jwt) {
      throw new HttpException(
        {
          statusCode: HttpStatus.UNAUTHORIZED,
          message: ErrorMessage.unauthorized,
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
    try {
      this.jwtService.verify(jwt);
      return true;
    } catch (e) {
      return false;
    }
  }

  generateJWT(user: User, options?: JwtSignOptions) {
    return this.jwtService.sign(
      {
        id: user.id,
        name: user.login,
        iat: Math.floor(Date.now() / 1000),
      },
      options,
    );
  }
}
