import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return a string', () => {
      // OR 'should return "eSports Kills Bet API. Try http://localhost:8080/users/"'
      expect(typeof appController.getHello()).toBe('string');
      // OR expect(appController.getHello()).toBe('eSports Kills Bet API. Try http://localhost:8080/users/');
    });
  });
});
