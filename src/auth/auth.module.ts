import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import 'dotenv/config';

@Module({
  imports: [UsersModule, JwtModule.register({ secret: process.env.SECRET })],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
