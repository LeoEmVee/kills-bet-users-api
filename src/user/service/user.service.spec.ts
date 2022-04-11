import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { mockData } from '../../../test/mock-data';
import { UserEntity } from '../models/user.entity';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  const data = mockData;

  const mockUserEntityRepository = {
    addUser: jest.fn().mockImplementation((user) => user),

    findOne: jest.fn().mockImplementation((value) => {
      for (let i = 0; i < data.length; i++) {
        if (Object.values(data[i]).includes(value)) return data[i];
      }
    }),

    save: jest.fn().mockImplementation((user) => Promise.resolve({ ...user })),

    getAllUsers: jest.fn().mockImplementation(() => data),

    find: jest.fn().mockImplementation(() => data),

    getUser: jest
      .fn()
      .mockImplementation((id) => mockUserEntityRepository.findOne(id)),

    getTotalBets: jest.fn().mockImplementation(() => {
      return `Total bets: ${data.length} bets`;
    }),

    getTotalKillsBet: jest.fn().mockImplementation(() => {
      const result = data.map((el) => el.kills).reduce((p, c) => p + c);
      return `Total kills bet: ${result} kills`;
    }),

    getMaxBet: jest.fn().mockImplementation(() => {
      const kills = data.map((bet) => bet.kills);
      const maxBet = Math.max(...kills);
      const user = data[kills.indexOf(maxBet)];
      return `Highest kills bet: ${maxBet} kills, by ${user.name}`;
    }),

    getMinBet: jest.fn().mockImplementation(() => {
      const kills = data.map((bet) => bet.kills);
      const maxBet = Math.min(...kills);
      const user = data[kills.indexOf(maxBet)];
      return `Lowest kills bet: ${maxBet} kills, by ${user.name}`;
    }),

    getAvgBet: jest.fn().mockImplementation(() => {
      const result = Math.round(
        data.map((el) => el.kills).reduce((p, c) => p + c) / data.length,
      );
      return `Average kills bet: ${result} kills`;
    }),

    getAllStats: jest.fn().mockImplementation(() => {
      const totalBets = mockUserEntityRepository.getTotalBets();
      const totalKillsBet = mockUserEntityRepository.getTotalKillsBet();
      const maxBet = mockUserEntityRepository.getMaxBet();
      const minBet = mockUserEntityRepository.getMinBet();
      const avgBet = mockUserEntityRepository.getAvgBet();
      return `${totalBets}\n${totalKillsBet}\n${maxBet}\n${minBet}\n${avgBet}`;
    }),

    getWinner: jest.fn().mockImplementation((realKills) => {
      const killDiff = data.map((bet) => realKills - bet.kills);
      const winningBet = Math.min(...killDiff.filter((e) => e >= 0));
      const winner = data[killDiff.indexOf(winningBet)];
      return (
        (winner &&
          `Total kills: ${realKills}\nWinner: ${winner.name}\nBet: ${
            winner.kills
          }\nDifference with total kills: ${Math.abs(
            winner.kills - realKills,
          )}`) ||
        'All bets were too high. No winner'
      );
    }),

    deleteUser: jest.fn().mockImplementation((id) => {
      const result = mockUserEntityRepository.getUser(id);
      return `User ${result.id} deleted`;
    }),
    remove: jest.fn().mockImplementation((id) => {
      return mockUserEntityRepository.getUser(id);
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: mockUserEntityRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new user and return it', async () => {
    const mockNewUser = {
      id: 0,
      email: 'test@mail.com',
      name: 'Test Name',
      kills: 100,
    };
    const expectedResult = mockNewUser;
    expect(await service.addUser(mockNewUser)).toEqual(expectedResult);
  });

  it('should return all users', async () => {
    const expectedResult = data;
    expect(await service.getAllUsers()).toEqual(expectedResult);
  });

  it('should return a user by ID', async () => {
    const randomID = Math.round(Math.random() * 14);
    const expectedResult = mockUserEntityRepository.getUser(randomID);
    expect(await service.getUser(randomID)).toEqual(expectedResult);
  });

  it('should return total number of bets', async () => {
    const expectedResult = mockUserEntityRepository.getTotalBets();
    expect(await service.getTotalBets()).toEqual(expectedResult);
  });

  it('should return total number of kills bet', async () => {
    const expectedResult = mockUserEntityRepository.getTotalKillsBet();
    expect(await service.getTotalKillsBet()).toEqual(expectedResult);
  });

  it('should return highest bet', async () => {
    const expectedResult = mockUserEntityRepository.getMaxBet();
    expect(await service.getMaxBet()).toEqual(expectedResult);
  });

  it('should return lowest bet', async () => {
    const expectedResult = mockUserEntityRepository.getMinBet();
    expect(await service.getMinBet()).toEqual(expectedResult);
  });

  it('should return average bet', async () => {
    const expectedResult = mockUserEntityRepository.getAvgBet();
    expect(await service.getAvgBet()).toEqual(expectedResult);
  });

  it('should return all stats report', async () => {
    const stats = mockUserEntityRepository.getAllStats();
    const expectedResult = stats;
    expect(await service.getAllStats()).toEqual(expectedResult);
  });

  it('should return winner', async () => {
    const randomRealKills = Math.round(Math.random() * 50);
    const expectedResult = mockUserEntityRepository.getWinner(randomRealKills);
    expect(await service.getWinner(randomRealKills)).toEqual(expectedResult);
  });

  it('should return deleted user', async () => {
    const randomID = Math.round(Math.random() * 14);
    const expectedResult = mockUserEntityRepository.deleteUser(randomID);
    expect(await service.deleteUser(randomID)).toEqual(expectedResult);
  });
});
