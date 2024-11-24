import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ConfectionerService } from '../../confectioner/services/confectioner.service';
import { SignInDto } from '../dto/sign-in.dto';
import { ErrorMessages } from '../../../shared/core/errors/messages.error';
import { JwtPayloadDto } from '../dto/jwt-payload.dto';
import { AuthModel } from '../model/auth.model';

@Injectable()
export class ConfectionerSignUseCase {
  constructor(private readonly confectionerService: ConfectionerService) {}

  async execute(signInDto: SignInDto) {
    // Get Confectioner By Email
    // Check Confectioner exists
    const confectioner = await this.confectionerService.findByEmail(signInDto.email);

    if (!confectioner) {
      throw new NotFoundException(ErrorMessages.confectioner.notFound);
    }

    const passwordMatch = await this.confectionerService.comparePassword(signInDto.password, confectioner.password);

    if (!passwordMatch) {
      throw new BadRequestException(ErrorMessages.confectioner.invalidCredentials);
    }

    const jwtPayload: JwtPayloadDto = {
      email: confectioner.email,
      sub: confectioner.id.toString(),
      id: confectioner.id.toString(),
    };

    const accessToken = await this.confectionerService.generateAccessToken({ ...jwtPayload });

    const confectionerAuth: AuthModel = {
      accessToken,
      user: {
        id: confectioner.id.toString(),
        email: confectioner.email,
      },
    };

    return confectionerAuth;
  }
}
