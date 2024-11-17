import { config } from 'dotenv';
import * as process from 'process';
config();
export const Environment = {
  database: {
    host: process.env.DB_HOST ?? 'localhost',
    port: process.env.DB_PORT ? +process.env.DB_PORT : 5432,
    username: process.env.DB_USER ?? 'essencial_delivery',
    password: process.env.DB_PASS ?? 'postgres',
    database: process.env.DB_DATABASE ?? 'essencial_delivery',
  },
  api: {
    baseUrl: 'http://localhost:3000',
    nodeEnv: process.env.NODE_ENV ?? 'development',
    port: process.env.APP_PORT ? +process.env.APP_PORT : 3333,
    adminDefaultPassword: process.env.ADMIN_DEFAULT_PASSWORD,
    adminDefaultEmail: process.env.ADMIN_DEFAULT_EMAIL,
  },
  jwt: {
    secret: process.env.JWT_SECRET_KEY,
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
};