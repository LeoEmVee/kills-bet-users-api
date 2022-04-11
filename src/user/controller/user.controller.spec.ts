import { Test, TestingModule } from '@nestjs/testing';
import { mockData } from '../../../test/mock-data';
import { UserService } from '../service/user.service';
import { UserController } from './user.controller';

describe('UserController', () => {
  let controller: UserController;

  const data = mockData;

  const mockUserService = {
    addUser: jest.fn((user) => {
      return {
        ...user,
      };
    }),

    getAllUsers: jest.fn(() => {
      return data;
    }),

    getUser: jest.fn((id) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].id === id) return data[i];
      }
    }),

    getTotalBets: jest.fn(() => {
      return data.length;
    }),

    getTotalKillsBet: jest.fn(() => {
      return data.map((el) => el.kills).reduce((p, c) => p + c);
    }),

    getMaxBet: jest.fn(() => {
      return Math.max(...data.map((el) => el.kills));
    }),

    getMinBet: jest.fn(() => {
      return Math.min(...data.map((el) => el.kills));
    }),

    getAvgBet: jest.fn(() => {
      return Math.round(
        data.map((el) => el.kills).reduce((p, c) => p + c) / data.length,
      );
    }),

    getAllStats: jest.fn(() => {
      const totalBets = mockUserService.getTotalBets();
      const totalKillsBet = mockUserService.getTotalKillsBet();
      const maxBet = mockUserService.getMaxBet();
      const minBet = mockUserService.getMinBet();
      const avgBet = mockUserService.getAvgBet();
      return `${totalBets}\n${totalKillsBet}\n${maxBet}\n${minBet}\n${avgBet}`;
    }),

    getWinner: jest.fn((realKills) => {
      const killDiff = data.map((bet) => realKills - bet.kills);
      const winningBet = Math.min(...killDiff.filter((e) => e >= 0));
      const winner = data[killDiff.indexOf(winningBet)];
      return winner;
    }),

    deleteUser: jest.fn((id) => {
      return mockUserService.getUser(id);
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

  it('should create a new user and return it', () => {
    const mockNewUser = {
      id: 0,
      email: 'test@mail.com',
      name: 'Test Name',
      kills: 100,
    };
    const expectedResult = mockNewUser;
    expect(controller.addUser(mockNewUser)).toEqual(expectedResult);
  });

  it('should return all users', () => {
    const expectedResult = data;
    expect(controller.getAllUsers()).toEqual(expectedResult);
  });

  it('should return a user by ID', () => {
    const randomID = Math.round(Math.random() * 14);
    const expectedResult = mockUserService.getUser(randomID);
    expect(controller.getUser(randomID)).toEqual(expectedResult);
  });

  it('should return total number of bets', () => {
    const expectedResult = data.length;
    expect(controller.getTotalBets()).toEqual(expectedResult);
  });

  it('should return total number of kills bet', () => {
    const expectedResult = data.map((el) => el.kills).reduce((p, c) => p + c);
    expect(controller.getTotalKillsBet()).toEqual(expectedResult);
  });

  it('should return highest bet', () => {
    const expectedResult = Math.max(...data.map((el) => el.kills));
    expect(controller.getMaxBet()).toEqual(expectedResult);
  });

  it('should return lowest bet', () => {
    const expectedResult = Math.min(...data.map((el) => el.kills));
    expect(controller.getMinBet()).toEqual(expectedResult);
  });

  it('should return average bet', () => {
    const expectedResult = Math.round(
      data.map((el) => el.kills).reduce((p, c) => p + c) / data.length,
    );
    expect(controller.getAvgBet()).toEqual(expectedResult);
  });

  it('should return all stats report', () => {
    const expectedResult = mockUserService.getAllStats();
    expect(controller.getAllStats()).toEqual(expectedResult);
  });

  it('should return winner', () => {
    const randomRealKills = Math.round(Math.random() * 50);
    const expectedResult = mockUserService.getWinner(randomRealKills);
    expect(controller.getWinner(randomRealKills)).toEqual(expectedResult);
  });

  it('should return deleted user', () => {
    const randomID = Math.round(Math.random() * 14);
    const expectedResult = mockUserService.deleteUser(randomID);
    expect(controller.deleteUser(randomID)).toEqual(expectedResult);
  });
});
