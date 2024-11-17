import { ConflictException, Injectable } from '@nestjs/common';
import { CreateAdminDto } from '../dto/create-admin.dto';
import { Admin } from '../model/admin.model';
import { AdminService } from '../services/admin.service';
import { ErrorMessages } from '../../../shared/core/errors/messages.error';

@Injectable()
export class CreateAdminUseCase {
  constructor(private readonly adminService: AdminService) {}

  async execute(createAdminDto: CreateAdminDto): Promise<Admin> {
    const checkAdmin = await this.adminService.findByEmail(createAdminDto.email);
    if (checkAdmin) {
      throw new ConflictException(ErrorMessages.admin.emailAlreadyExists);
    }

    const hashedPassword = await this.adminService.hashPassword(createAdminDto.password);

    const admin = Admin.create({
      name: createAdminDto.name,
      email: createAdminDto.email,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return this.adminService.create(admin);
  }
}
