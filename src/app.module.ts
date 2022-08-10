import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './data-source';
import { GroupsModule } from './groups/groups.module';
import { ServiceLogger } from './utils/service.logger';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot(dataSourceOptions),
    GroupsModule,
  ],
  providers: [ServiceLogger],
  exports: [ServiceLogger],
})
export class AppModule {}
