import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './data-source';
import { GroupsModule } from './groups/groups.module';

@Module({
  imports: [UsersModule, TypeOrmModule.forRoot(dataSourceOptions), GroupsModule],
})
export class AppModule {}
