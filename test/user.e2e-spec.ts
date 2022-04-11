import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UserModule } from '../src/user/user.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from '../src/user/models/user.entity';
import { mockData } from './mock-data';

describe('UserController (e2e)', () => {
  let app: INestApplication;

  const data = mockData;

  const mockUserEntityRepository = {
    find: jest.fn().mockImplementation(() => data),
    findOne: jest.fn().mockImplementation((value) => {
      for (let i = 0; i < data.length; i++) {
        if (Object.values(data[i]).includes(value)) return data[i];
        if (data[i].id === parseInt(value)) return data[i];
      }
    }),
    save: jest.fn().mockImplementation((user) => Promise.resolve({ ...user })),

    remove: jest.fn().mockImplementation((id) => {
      return mockUserEntityRepository.findOne(id);
    }),
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UserModule],
    })
      .overrideProvider(getRepositoryToken(UserEntity))
      .useValue(mockUserEntityRepository)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/users (POST', () => {
    const mockNewUser = {
      id: Math.round(Math.random() * 100),
      email: 'test@mail.com',
      name: 'Test Name',
      kills: 100,
    };
    return request(app.getHttpServer())
      .post('/users')
      .send(mockNewUser)
      .expect(201)
      .then((response) => {
        expect(response.body).toEqual({ ...mockNewUser });
      });
  });

  it('/users (GET)', () => {
    return request(app.getHttpServer()).get('/users').expect(200);
  });

  it('/users/id/:id (GET)', async () => {
    const randomID = Math.round(Math.random() * 14);
    return await request(app.getHttpServer())
      .get(`/users/id/${randomID}`)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          mockUserEntityRepository.findOne(randomID),
        );
      });
  });

  it('/users/totalbets (GET)', () => {
    return request(app.getHttpServer()).get('/users/totalbets').expect(200);
  });

  it('/users/totalkillsbet (GET)', () => {
    return request(app.getHttpServer()).get('/users/totalkillsbet').expect(200);
  });

  it('/users/maxbet (GET)', () => {
    return request(app.getHttpServer()).get('/users/maxbet').expect(200);
  });

  it('/users/minbet (GET)', () => {
    return request(app.getHttpServer()).get('/users/minbet').expect(200);
  });

  it('/users/avgbet (GET)', () => {
    return request(app.getHttpServer()).get('/users/avgbet').expect(200);
  });

  it('/users/allstats (GET)', () => {
    return request(app.getHttpServer()).get('/users/allstats').expect(200);
  });

  it('/users/winner/:realKills (GET)', () => {
    const randomRealKills = Math.round(Math.random() * 50);
    return request(app.getHttpServer())
      .get(`/users/winner/${randomRealKills}`)
      .expect(200);
  });

  it('/users/delete/:realKills (DELETE)', async () => {
    const randomID = Math.round(Math.random() * 14);
    return await request(app.getHttpServer()).delete(
      `/users/delete/${randomID}`,
    );
  });
});
