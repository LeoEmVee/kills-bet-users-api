import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../service/user.service';
import { UserController } from './user.controller';

describe('UserController', () => {
  let controller: UserController;

  const mockUserService = {
    addUser: jest.fn((dto) => {
      return {
        ...dto,
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    })
      .overrideProvider(UserService)
      .useValue(mockUserService)
      .compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
