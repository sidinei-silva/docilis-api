import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { compareHash, createHash } from '../../../shared/utils/bcrypt-hasher.util';
import { ConfectionerEntity } from '../database/entities/confectioner.entity';
import { ConfectionerMapper } from '../mappers/confectioner.mapper';
import { Confectioner } from '../model/confectioner.model';

@Injectable()
export class ConfectionerService {
  constructor(
    @InjectRepository(ConfectionerEntity)
    private confectionerRepository: Repository<ConfectionerEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async findByEmail(email: string): Promise<Confectioner> | null {
    const confectioner = await this.confectionerRepository.findOne({ where: { email } });
    return confectioner ? ConfectionerMapper.toDomain(confectioner) : null;
  }

  async create(confectioner: Confectioner): Promise<Confectioner> {
    const confectionerEntity = ConfectionerMapper.toEntity(confectioner);
    const createdConfectioner = await this.confectionerRepository.save(confectionerEntity);
    return ConfectionerMapper.toDomain(createdConfectioner);
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
