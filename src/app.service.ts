import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'eSports Kills Bet API. Try http://localhost:8080/users/';
  }
}
