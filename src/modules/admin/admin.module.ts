/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminEntity } from './database/entities/admin.entity';
import { AdminController } from './controller/admin.controller';
import { AdminService } from './services/admin.service';
import { CreateAdminUseCase } from './usecases/create-admin.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([AdminEntity])],
  controllers: [AdminController],
  providers: [AdminService, CreateAdminUseCase],
  exports: [AdminService],
})
export class AdminModule {}
