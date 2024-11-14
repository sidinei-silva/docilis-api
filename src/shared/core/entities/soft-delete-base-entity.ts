import { DeleteDateColumn, Index } from 'typeorm';
import { BaseEntity } from './base-entity';
export abstract class SoftDeleteBaseEntity extends BaseEntity {
  @DeleteDateColumn()
  @Index()
  deletedAt?: Date;
}
