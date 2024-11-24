import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException } from '@nestjs/common';
import { CreateAdminDto } from '../../dto/create-admin.dto';
import { AdminService } from '../../services/admin.service';
import { CreateAdminUseCase } from '../create-admin.usecase';
import { Admin } from '../../model/admin.model';
import { ErrorMessages } from '../../../../shared/core/errors/messages.error';

describe('CreateAdminUseCase', () => {
  let createAdminUseCase: CreateAdminUseCase;
  let adminService: AdminService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateAdminUseCase,
        {
          provide: AdminService,
          useValue: {
            findByEmail: jest.fn(),
            hashPassword: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    createAdminUseCase = module.get<CreateAdminUseCase>(CreateAdminUseCase);
    adminService = module.get<AdminService>(AdminService);
  });

  it('should be defined', () => {
    expect(createAdminUseCase).toBeDefined();
  });

  describe('execute', () => {
    it('should create a new admin successfully', async () => {
      // Given
      const createAdminDto: CreateAdminDto = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'password123',
      };
      const hashedPassword = 'hashedPassword123';
      const admin = Admin.create({
        name: createAdminDto.name,
        email: createAdminDto.email,
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      jest.spyOn(adminService, 'findByEmail').mockResolvedValue(null);
      jest.spyOn(adminService, 'hashPassword').mockResolvedValue(hashedPassword);
      jest.spyOn(adminService, 'create').mockResolvedValue(admin);

      // When
      const result = await createAdminUseCase.execute(createAdminDto);

      // Then
      expect(adminService.findByEmail).toHaveBeenCalledWith(createAdminDto.email);
      expect(adminService.hashPassword).toHaveBeenCalledWith(createAdminDto.password);
      expect(adminService.create).toHaveBeenCalledWith(
        expect.objectContaining({
          name: createAdminDto.name,
          email: createAdminDto.email,
          password: hashedPassword,
        }),
      );
      expect(result).toBe(admin);
    });

    it('should throw ConflictException if admin email already exists', async () => {
      // Given
      const createAdminDto: CreateAdminDto = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'password123',
      };
      const existingAdmin = Admin.create({
        name: createAdminDto.name,
        email: createAdminDto.email,
        password: 'hashedPassword123',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      jest.spyOn(adminService, 'findByEmail').mockResolvedValue(existingAdmin);

      // When / Then
      await expect(createAdminUseCase.execute(createAdminDto)).rejects.toThrow(
        new ConflictException(ErrorMessages.admin.emailAlreadyExists),
      );
      expect(adminService.findByEmail).toHaveBeenCalledWith(createAdminDto.email);
      expect(adminService.hashPassword).not.toHaveBeenCalled();
      expect(adminService.create).not.toHaveBeenCalled();
    });
  });
});
