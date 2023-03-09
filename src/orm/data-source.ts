import 'reflect-metadata';
import { DataSource } from 'typeorm';

export const SQLiteDataSource = new DataSource({
  type: 'better-sqlite3',
  database: 'nhl-stats.sqlite',
  synchronize: false,
  logging: false,
  entities: ['src/orm/entities/**/*.ts'],
  migrations: ['src/orm/migrations/**/*.ts'],
  subscribers: ['src/orm/subscribers/**/*.ts'],
  migrationsTableName: 'migrations',
});
