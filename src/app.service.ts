import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return "eSports Kills Bet API. Try http://localhost:[port]/users/ (we are using port 3000 in local and 8080 in Docker, but it's up to you!!)";
  }
}
