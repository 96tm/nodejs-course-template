import dotenv from 'dotenv';

import path, { dirname } from 'path';

import { fileURLToPath } from 'url';
import { ConnectionOptions } from 'typeorm';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

export const config = {
  type: 'postgres',
  name: 'pg-connection',
  synchronize: true,
  autoReconnect: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectionInterval: 1000,
  host: process.env['POSTGRES_HOST'],
  port: process.env['POSTGRES_PORT'],
  username: process.env['POSTGRES_USER'],
  password: process.env['POSTGRES_PASSWORD'],
  database: process.env['POSTGRES_DB'],
} as ConnectionOptions;
