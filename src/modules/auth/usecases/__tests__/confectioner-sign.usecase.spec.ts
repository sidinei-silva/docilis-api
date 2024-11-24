import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Confectioner } from '../../../confectioner/model/confectioner.model';
import { ConfectionerService } from '../../../confectioner/services/confectioner.service';
import { SignInDto } from '../../dto/sign-in.dto';
import { ConfectionerSignUseCase } from '../confectioner-sign.usecase';

describe('ConfectionerSignUseCase', () => {
  let confectionerService: ConfectionerService;
  let confectionerSignUseCase: ConfectionerSignUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConfectionerSignUseCase,
        {
          provide: ConfectionerService,
          useValue: {
            findByEmail: jest.fn(),
            comparePassword: jest.fn(),
            generateAccessToken: jest.fn(),
          },
        },
      ],
    }).compile();

    confectionerService = module.get<ConfectionerService>(ConfectionerService);
    confectionerSignUseCase = module.get<ConfectionerSignUseCase>(ConfectionerSignUseCase);
  });

  describe('execute', () => {
    let signInDto: SignInDto;

    beforeEach(() => {
      signInDto = { email: 'confectioner@example.com', password: 'password' };
    });

    it('should throw NotFoundException if confectioner does not exist', async () => {
      // Given
      jest.spyOn(confectionerService, 'findByEmail').mockResolvedValue(null);

      // When & Then
      await expect(confectionerSignUseCase.execute(signInDto)).rejects.toThrow();
      expect(confectionerService.findByEmail).toHaveBeenCalledWith(signInDto.email);
    });

    it('should throw BadRequestException if password does not match', async () => {
      // Given
      const confectioner = Confectioner.create({
        name: 'Confectioner',
        email: 'confectioner@example.com',
        password: 'hashedPassword',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      jest.spyOn(confectionerService, 'findByEmail').mockResolvedValue(confectioner);
      jest.spyOn(confectionerService, 'comparePassword').mockResolvedValue(false);

      // When & Then
      await expect(confectionerSignUseCase.execute(signInDto)).rejects.toThrow(BadRequestException);
      expect(confectionerService.findByEmail).toHaveBeenCalledWith(signInDto.email);
      expect(confectionerService.comparePassword).toHaveBeenCalledWith(signInDto.password, confectioner.password);
    });

    it('should return confectionerAuth if credentials are correct', async () => {
      // Given
      const confectioner = Confectioner.create({
        name: 'Confectioner',
        email: 'confectioner@example.com',
        password: 'hashedPassword',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const accessToken = 'accessToken';

      jest.spyOn(confectionerService, 'findByEmail').mockResolvedValue(confectioner);
      jest.spyOn(confectionerService, 'comparePassword').mockResolvedValue(true);
      jest.spyOn(confectionerService, 'generateAccessToken').mockResolvedValue(accessToken);

      // When
      const result = await confectionerSignUseCase.execute(signInDto);

      // Then
      expect(confectionerService.findByEmail).toHaveBeenCalledWith(signInDto.email);
      expect(confectionerService.comparePassword).toHaveBeenCalledWith(signInDto.password, confectioner.password);
      expect(confectionerService.generateAccessToken).toHaveBeenCalledWith({
        email: confectioner.email,
        sub: confectioner.id.toString(),
        id: confectioner.id.toString(),
      });

      expect(result).toEqual({
        accessToken,
        user: {
          id: confectioner.id.toString(),
          email: confectioner.email,
        },
      });
    });
  });
});
