import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfectionerEntity } from './database/entities/confectioner.entity';
import { SignUpController } from './controller/sign-up.controller';
import { ConfectionerService } from './services/confectioner.service';
import { SignUpUseCase } from './usecases/sign-up.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([ConfectionerEntity])],
  controllers: [SignUpController],
  providers: [ConfectionerService, SignUpUseCase],
  exports: [ConfectionerService],
})
export class ConfectionerModule {}
