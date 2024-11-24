import { ConflictException, Injectable } from '@nestjs/common';
import { ConfectionerService } from '../services/confectioner.service';
import { ErrorMessages } from '../../../shared/core/errors/messages.error';
import { CreateConfectionerDto } from '../dto/create-confectioner.dto';
import { Confectioner } from '../model/confectioner.model';

@Injectable()
export class SignUpUseCase {
  constructor(private readonly confectionerService: ConfectionerService) {}

  async execute(createConfectionerDto: CreateConfectionerDto): Promise<Confectioner> {
    const checkConfectioner = await this.confectionerService.findByEmail(createConfectionerDto.email);
    if (checkConfectioner) {
      throw new ConflictException(ErrorMessages.confectioner.emailAlreadyExists);
    }

    const hashedPassword = await this.confectionerService.hashPassword(createConfectionerDto.password);

    const confectioner = Confectioner.create({
      name: createConfectionerDto.name,
      email: createConfectionerDto.email,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return this.confectionerService.create(confectioner);
  }
}
