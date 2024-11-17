import { Column, Entity, PrimaryColumn } from 'typeorm';
import { SoftDeleteBaseEntity } from '../../../../shared/core/entities/soft-delete-base-entity';

@Entity('admins')
export class AdminEntity extends SoftDeleteBaseEntity {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 30, unique: true })
  email: string;

  @Column({ length: 100 })
  password: string;
}