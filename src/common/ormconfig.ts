import dotenv from 'dotenv';

import path from 'path';

import { ConnectionOptions } from 'typeorm';

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

const config = {
  type: 'postgres',
  entities: [path.join(__dirname, '../entity/**/*.ts')],
  synchronize: true,
  autoReconnect: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectionInterval: 1000,
  host: process.env['POSTGRES_HOST'],
  port: parseInt(String(process.env['POSTGRES_PORT']), 10),
  username: process.env['POSTGRES_USER'],
  password: process.env['POSTGRES_PASSWORD'],
  database: process.env['POSTGRES_DB'],
  logging: true,
  migrations: [path.join(__dirname, '../migration/**/*.ts')],
  subscribers: [path.join(__dirname, '../subscriber/**/*.ts')],
  cli: {
    entitiesDir: path.join(__dirname, '../entity'),
    migrationsDir: path.join(__dirname, '../migration'),
    subscribersDir: path.join(__dirname, '../subscriber'),
  },
} as ConnectionOptions;

export default config;
