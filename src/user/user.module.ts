import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { IsLoginUniqueConstraint } from './validators/unique-login.validator';

@Module({
  controllers: [UserController],
  providers: [UserService, IsLoginUniqueConstraint],
  exports: [UserService],
})
export class UserModule {}
