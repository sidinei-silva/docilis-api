import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @CreateDateColumn()
  readonly createdAt?: Date;
  @UpdateDateColumn()
  readonly updatedAt?: Date;
}
