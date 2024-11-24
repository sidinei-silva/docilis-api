import { Test } from '@nestjs/testing';
import { SignUpUseCase } from '../../usecases/sign-up.usecase';
import { SignUpController } from '../sign-up.controller';

describe('SignUpController', () => {
  let controller: SignUpController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [SignUpController],
      providers: [
        {
          provide: SignUpUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<SignUpController>(SignUpController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
