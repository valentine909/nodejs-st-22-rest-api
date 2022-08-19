import { Logger, Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './data-source';
import { GroupsModule } from './groups/groups.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { LogInterceptor } from './utils/interceptors/log.interceptor';
import { AllExceptionsFilter } from './utils/filters/exceptions.filter';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot(dataSourceOptions),
    GroupsModule,
    AuthModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LogInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    Logger,
  ],
})
export class AppModule {}
