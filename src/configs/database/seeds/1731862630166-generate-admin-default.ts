import { MigrationInterface, QueryRunner } from 'typeorm';
import { Environment } from '../../../envoriment';
import { INestApplicationContext } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../../app.module';
import { Admin } from '../../../modules/admin/model/admin.model';
import { AdminMapper } from '../../../modules/admin/mappers/admin.mapper';
import { AdminEntity } from '../../../modules/admin/database/entities/admin.entity';
import { createHash } from '../../../shared/utils/bcrypt-hasher.util';

const adminPassword = Environment.api.adminDefaultPassword;
const adminEmail = Environment.api.adminDefaultEmail;

export class GenerateAdminDefault1731862630166 implements MigrationInterface {
  nestApp: INestApplicationContext;

  private async initNest() {
    console.log('initNest');
    this.nestApp = await NestFactory.createApplicationContext(AppModule);
  }

  private async close(): Promise<void> {
    await this.nestApp?.close();
  }

  private async createAdmin(queryRunner: QueryRunner) {
    if (!adminPassword) {
      throw new Error('ADMIN_DEFAULT_PASSWORD not found in .env file');
    }

    const hashedPassword = await createHash(adminPassword);

    const defaultAdmin: Admin = Admin.create({
      email: adminEmail,
      name: 'Admin',
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    console.log('Creating default admin', defaultAdmin.toJson());

    const defaultUserEntity = AdminMapper.toEntity(defaultAdmin);
    await queryRunner.manager.save(AdminEntity, defaultUserEntity);
    console.log('Default admin user created');
  }

  public async up(queryRunner: QueryRunner): Promise<void> {
    console.log('Starting migration: CreateDefaultAdminUser1713715256869');

    try {
      await this.initNest();
      await this.createAdmin(queryRunner);
    } catch (e) {
      throw e;
    } finally {
      await this.close();
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from(AdminEntity)
      .where('email = :email', { email: adminEmail })
      .execute();
  }
}
