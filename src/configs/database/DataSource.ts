import { DataSource } from 'typeorm';
import typeOrmConfig from './TypeOrmConfig';
export default new DataSource({ ...typeOrmConfig });
