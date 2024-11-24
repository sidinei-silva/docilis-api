import { Test } from '@nestjs/testing';
import { ConfectionerService } from '../../services/confectioner.service';
import { SignUpUseCase } from '../sign-up.usecase';
import { Confectioner } from '../../model/confectioner.model';
import { ConflictException } from '@nestjs/common';
import { ErrorMessages } from '../../../../shared/core/errors/messages.error';

describe('SignUpUseCase', () => {
  let signUpUseCase: SignUpUseCase;
  let confectionerService: ConfectionerService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        SignUpUseCase,
        {
          provide: ConfectionerService,
          useValue: {
            findByEmail: jest.fn(),
            hashPassword: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    signUpUseCase = module.get<SignUpUseCase>(SignUpUseCase);
    confectionerService = module.get<ConfectionerService>(ConfectionerService);
  });

  it('should be defined', () => {
    expect(signUpUseCase).toBeDefined();
  });

  describe('execute', () => {
    it('should create a new confectioner successfully', async () => {
      // Given
      const createConfectionerDto = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'password123',
      };
      const confectioner = Confectioner.create({
        name: createConfectionerDto.name,
        email: createConfectionerDto.email,
        password: createConfectionerDto.password,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const hashedPassword = 'hashedPassword123';

      jest.spyOn(confectionerService, 'findByEmail').mockResolvedValue(null);
      jest.spyOn(confectionerService, 'hashPassword').mockResolvedValue(hashedPassword);
      jest.spyOn(confectionerService, 'create').mockResolvedValue(confectioner);

      // When
      const result = await signUpUseCase.execute(createConfectionerDto);

      // Then
      expect(confectionerService.findByEmail).toHaveBeenCalledWith(createConfectionerDto.email);
      expect(confectionerService.hashPassword).toHaveBeenCalledWith(createConfectionerDto.password);
      expect(confectionerService.create).toHaveBeenCalledWith(
        expect.objectContaining({
          name: createConfectionerDto.name,
          email: createConfectionerDto.email,
          password: hashedPassword,
        }),
      );
      expect(result).toEqual(confectioner);
    });

    it('should throw an error if the confectioner already exists', async () => {
      // Given
      const createConfectionerDto = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'password123',
      };

      const existingConfectioner = Confectioner.create({
        name: createConfectionerDto.name,
        email: createConfectionerDto.email,
        password: 'hashedPassword123',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      jest.spyOn(confectionerService, 'findByEmail').mockResolvedValue(existingConfectioner);

      // When and Then
      await expect(signUpUseCase.execute(createConfectionerDto)).rejects.toThrow(
        new ConflictException(ErrorMessages.confectioner.emailAlreadyExists),
      );
      expect(confectionerService.findByEmail).toHaveBeenCalledWith(createConfectionerDto.email);
      expect(confectionerService.hashPassword).not.toHaveBeenCalled();
      expect(confectionerService.create).not.toHaveBeenCalled();
    });
  });
});
