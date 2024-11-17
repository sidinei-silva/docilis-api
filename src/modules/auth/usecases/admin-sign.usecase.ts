import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { SignInDto } from '../dto/sign-in.dto';
import { JwtPayloadDto } from '../dto/jwt-payload.dto';
import { AuthModel } from '../model/auth.model';
import { ErrorMessages } from '../../../shared/core/errors/messages.error';
import { AdminService } from '../../admin/services/admin.service';

@Injectable()
export class AdminSignUseCase {
  constructor(private readonly adminService: AdminService) {}

  async execute(signInDto: SignInDto) {
    // Get Admin By Email
    // Check Admin exists
    const admin = await this.adminService.findByEmail(signInDto.email);

    if (!admin) {
      throw new NotFoundException(ErrorMessages.admin.notFound);
    }

    const passwordMatch = await this.adminService.comparePassword(signInDto.password, admin.password);

    if (!passwordMatch) {
      throw new BadRequestException(ErrorMessages.admin.invalidCredentials);
    }

    const jwtPayload: JwtPayloadDto = {
      email: admin.email,
      sub: admin.id.toString(),
      id: admin.id.toString(),
    };

    const accessToken = await this.adminService.generateAccessToken({ ...jwtPayload });

    const adminAuth: AuthModel = {
      accessToken,
      user: {
        id: admin.id.toString(),
        email: admin.email,
      },
    };

    return adminAuth;
  }
}
