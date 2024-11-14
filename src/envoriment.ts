import * as process from 'process';
export const Environment = {
  database: {
    host: process.env.DB_HOST ?? 'localhost',
    port: process.env.DB_PORT ? +process.env.DB_PORT : 5432,
    username: process.env.DB_USER ?? 'docilis',
    password: process.env.DB_PASS ?? 'postgres',
    database: process.env.DB_DATABASE ?? 'docilis',
  },
  api: {
    baseUrl: 'http://localhost:3000',
    nodeEnv: process.env.NODE_ENV ?? 'development',
    port: process.env.APP_PORT ? +process.env.APP_PORT : 3333,
  },
};
