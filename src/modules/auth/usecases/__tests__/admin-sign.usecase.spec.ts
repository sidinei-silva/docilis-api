import { Test, TestingModule } from '@nestjs/testing';
import { AdminSignUseCase } from '../admin-sign.usecase';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { AdminService } from '../../../admin/services/admin.service';
import { SignInDto } from '../../dto/sign-in.dto';
import { Admin } from '../../../admin/model/admin.model';

describe('AdminSignUseCase', () => {
  let adminSignUseCase: AdminSignUseCase;
  let adminService: AdminService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdminSignUseCase,
        {
          provide: AdminService,
          useValue: {
            findByEmail: jest.fn(),
            comparePassword: jest.fn(),
            generateAccessToken: jest.fn(),
          },
        },
      ],
    }).compile();

    adminSignUseCase = module.get<AdminSignUseCase>(AdminSignUseCase);
    adminService = module.get<AdminService>(AdminService);
  });

  describe('execute', () => {
    let signInDto: SignInDto;

    beforeEach(() => {
      signInDto = { email: 'admin@example.com', password: 'password' };
    });

    it('should throw NotFoundException if admin does not exist', async () => {
      // Given
      jest.spyOn(adminService, 'findByEmail').mockResolvedValue(null);

      // When & Then
      await expect(adminSignUseCase.execute(signInDto)).rejects.toThrow(NotFoundException);
      expect(adminService.findByEmail).toHaveBeenCalledWith(signInDto.email);
    });

    it('should throw BadRequestException if password does not match', async () => {
      // Given
      const admin = Admin.create({
        name: 'Admin',
        email: 'admin@example.com',
        password: 'hashedPassword',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      jest.spyOn(adminService, 'findByEmail').mockResolvedValue(admin);
      jest.spyOn(adminService, 'comparePassword').mockResolvedValue(false);

      // When & Then
      await expect(adminSignUseCase.execute(signInDto)).rejects.toThrow(BadRequestException);
      expect(adminService.findByEmail).toHaveBeenCalledWith(signInDto.email);
      expect(adminService.comparePassword).toHaveBeenCalledWith(signInDto.password, admin.password);
    });

    it('should return adminAuth if credentials are valid', async () => {
      // Given
      const admin = Admin.create({
        name: 'Admin',
        email: 'admin@example.com',
        password: 'hashedPassword',
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      const accessToken = 'accessToken';
      jest.spyOn(adminService, 'findByEmail').mockResolvedValue(admin);
      jest.spyOn(adminService, 'comparePassword').mockResolvedValue(true);
      jest.spyOn(adminService, 'generateAccessToken').mockResolvedValue(accessToken);

      // When
      const result = await adminSignUseCase.execute(signInDto);

      // Then
      expect(adminService.findByEmail).toHaveBeenCalledWith(signInDto.email);
      expect(adminService.comparePassword).toHaveBeenCalledWith(signInDto.password, admin.password);
      expect(adminService.generateAccessToken).toHaveBeenCalledWith({
        email: admin.email,
        sub: admin.id.toString(),
        id: admin.id.toString(),
      });
      expect(result).toEqual({
        accessToken,
        user: {
          id: admin.id.toString(),
          email: admin.email,
        },
      });
    });
  });
});
