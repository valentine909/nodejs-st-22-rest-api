import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { IsLoginUniqueConstraint } from './validators/unique-login.validator';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersDataManager } from './data-manager/users.data.manager';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, IsLoginUniqueConstraint, UsersDataManager],
  exports: [UsersService],
})
export class UsersModule {}
