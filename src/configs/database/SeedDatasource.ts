import { DataSource } from 'typeorm';
import typeOrmConfig from './TypeOrmConfig';
import { join } from 'path';
export default new DataSource({
  ...typeOrmConfig,
  migrationsTableName: 'Seed',
  migrations: [join(__dirname, 'seeds/*.{ts,js}')],
});
