import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './data-source';

@Module({
  imports: [UsersModule, TypeOrmModule.forRoot(dataSourceOptions)],
})
export class AppModule {}
