import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './data-source';
import { GroupsModule } from './groups/groups.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LogInterceptor } from './log.interceptor';
import { ServiceLogger } from './utils/service.logger';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot(dataSourceOptions),
    GroupsModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LogInterceptor,
    },
    ServiceLogger,
  ],
  exports: [ServiceLogger],
})
export class AppModule {}
