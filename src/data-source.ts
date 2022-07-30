import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from './users/entities/user.entity';
import 'dotenv/config';

export const dataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: false,
  entities: [User],
  migrations: [],
  subscribers: [],
} as DataSourceOptions;

export const AppDataSource = new DataSource(dataSourceOptions);
