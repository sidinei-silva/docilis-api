import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ConfectionerEntity } from '../../database/entities/confectioner.entity';
import { ConfectionerService } from '../confectioner.service';

describe('ConfectionerService', () => {
  let confectionerService: ConfectionerService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ConfectionerService,
        {
          provide: getRepositoryToken(ConfectionerEntity),
          useValue: {},
        },
        {
          provide: JwtService,
          useValue: {},
        },
      ],
    }).compile();

    confectionerService = module.get<ConfectionerService>(ConfectionerService);
  });

  it('should be defined', () => {
    expect(confectionerService).toBeDefined();
  });
});
