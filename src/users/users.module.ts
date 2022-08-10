import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { IsLoginUniqueConstraint } from './validators/unique-login.validator';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersDataManager } from './data-manager/users.data.manager';
import { GroupsModule } from '../groups/groups.module';
import { AppModule } from '../app.module';

@Module({
  imports: [
    forwardRef(() => GroupsModule),
    TypeOrmModule.forFeature([User]),
    forwardRef(() => AppModule),
  ],
  controllers: [UsersController],
  providers: [UsersService, IsLoginUniqueConstraint, UsersDataManager],
  exports: [UsersService, UsersDataManager],
})
export class UsersModule {}
