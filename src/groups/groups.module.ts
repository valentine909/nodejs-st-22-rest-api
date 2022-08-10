import { forwardRef, Module } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupsController } from './groups.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from './entities/group.entity';
import { GroupsDataManager } from './data-manager/groups.data.manager';
import { UsersModule } from '../users/users.module';
import { AppModule } from '../app.module';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    TypeOrmModule.forFeature([Group]),
    forwardRef(() => AppModule),
  ],
  controllers: [GroupsController],
  providers: [GroupsService, GroupsDataManager],
  exports: [GroupsService, GroupsDataManager],
})
export class GroupsModule {}
