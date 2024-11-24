/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { AdminModule } from '../admin/admin.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { Environment } from 'src/envoriment';
import { AuthController } from './controllers/auth.controller';
import { AdminJwtStrategy } from './strategies/admin-jwt.strategy';
import { APP_GUARD } from '@nestjs/core';
import { AdminJwtGuard } from './guards/admin-jwt.guard';
import { AdminSignUseCase } from './usecases/admin-sign.usecase';
import { ConfectionerModule } from '../confectioner/confectioner.module';
import { ConfectionerSignUseCase } from './usecases/confectioner-sign.usecase';

@Module({
  imports: [
    ConfectionerModule,
    AdminModule,
    PassportModule,
    JwtModule.registerAsync({
      global: true,
      useFactory: async () => ({
        secret: Environment.jwt.secret,
        signOptions: { expiresIn: Environment.jwt.expiresIn },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    AdminJwtStrategy,
    { provide: APP_GUARD, useClass: AdminJwtGuard },
    AdminSignUseCase,
    ConfectionerSignUseCase,
  ],
})
export class AuthModule {}
