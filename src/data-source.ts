import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from './users/entities/user.entity';
import 'dotenv/config';
import { Group } from './groups/entities/group.entity';

export const dataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: false,
  entities: [User, Group],
  migrations: ['./build/migrations/*.js'],
  subscribers: [],
  migrationsTableName: process.env.DB_MIGRATIONS,
} as DataSourceOptions;

export const AppDataSource = new DataSource(dataSourceOptions);
