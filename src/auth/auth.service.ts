import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<string> {
    const { login, password } = loginDto;
    const user = await this.usersService.findByLogin(login, false);
    let token;
    if (user && user.password === password) {
      token = this.jwtService.sign({
        id: user.id,
        iat: Date.now(),
      });
    }
    return token;
  }

  async refresh(refreshToken: string) {
    console.log(refreshToken);
  }
}
