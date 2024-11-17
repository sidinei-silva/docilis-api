import { Test, TestingModule } from '@nestjs/testing';
import { AdminController } from '../admin.controller';
import { CreateAdminUseCase } from '../../usecases/create-admin.usecase';

describe('Admin Controller', () => {
  let controller: AdminController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminController],
      providers: [
        {
          provide: CreateAdminUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AdminController>(AdminController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
