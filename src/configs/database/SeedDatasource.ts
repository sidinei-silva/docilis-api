import { join } from 'path';
import { DataSource } from 'typeorm';
import typeOrmConfig from './TypeOrmConfig';
export default new DataSource({
  ...typeOrmConfig,
  migrationsTableName: 'Seed',
  migrations: [join(__dirname, '..', 'seeds/**{.ts,.js}')],
});
