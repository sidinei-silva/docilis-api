import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminEntity } from '../database/entities/admin.entity';
import { Repository } from 'typeorm';
import { AdminMapper } from '../mappers/admin.mapper';
import { Admin } from '../model/admin.model';
import { compareHash, createHash } from '../../../shared/utils/bcrypt-hasher.util';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(AdminEntity)
    private adminRepository: Repository<AdminEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async findByEmail(email: string): Promise<Admin> | null {
    const admin = await this.adminRepository.findOne({ where: { email } });
    return admin ? AdminMapper.toDomain(admin) : null;
  }

  async create(admin: Admin): Promise<Admin> {
    const adminEntity = AdminMapper.toEntity(admin);
    const createdAdmin = await this.adminRepository.save(adminEntity);
    return AdminMapper.toDomain(createdAdmin);
  }

  async hashPassword(password: string): Promise<string> {
    return createHash(password);
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return compareHash(password, hash);
  }

  async generateAccessToken(payload: Record<string, unknown>): Promise<string> {
    return this.jwtService.signAsync(payload);
  }
}
