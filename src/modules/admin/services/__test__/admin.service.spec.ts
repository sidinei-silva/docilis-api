import { Test, TestingModule } from '@nestjs/testing';
import { AdminService } from '../admin.service';
import { JwtService } from '@nestjs/jwt';

describe('AdminService', () => {
  let adminService: AdminService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdminService,
        {
          provide: 'AdminEntityRepository',
          useValue: {},
        },
        {
          provide: JwtService,
          useValue: {},
        },
      ],
    }).compile();

    adminService = module.get<AdminService>(AdminService);
  });

  it('should be defined', () => {
    expect(adminService).toBeDefined();
  });
});
