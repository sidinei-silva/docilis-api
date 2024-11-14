import { join } from 'path';
import { DataSourceOptions } from 'typeorm';
import { Environment } from '../../envoriment';
const typeOrmConfig: DataSourceOptions = {
  type: 'postgres',
  host: Environment.database.host,
  port: Environment.database.port,
  username: Environment.database.username,
  password: Environment.database.password,
  database: Environment.database.database,
  logging: false,
  migrationsTableName: 'Migration',
  entities: [join(__dirname, '..', '..', '**/**.entity{.ts,*.js}')],
  migrations: [join(__dirname, 'migrations/*.{ts,js}')],
  synchronize: false,
  migrationsRun: true,
};
export default typeOrmConfig;
