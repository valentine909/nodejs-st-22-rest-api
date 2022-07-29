import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { IsLoginUniqueConstraint } from './validators/unique-login.validator';

@Module({
  controllers: [UsersController],
  providers: [UsersService, IsLoginUniqueConstraint],
  exports: [UsersService],
})
export class UsersModule {}
