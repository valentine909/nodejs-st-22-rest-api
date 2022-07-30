import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from './users/entities/user.entity';

export const dataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'pass',
  database: 'st2022',
  synchronize: false,
  logging: false,
  entities: [User],
  migrations: [],
  subscribers: [],
} as DataSourceOptions;

export const AppDataSource = new DataSource(dataSourceOptions);
