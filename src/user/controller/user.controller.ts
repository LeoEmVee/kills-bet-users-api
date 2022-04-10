import { Body, Controller, Get, Post } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserI } from '../models/user.interface';
import { UserService } from '../service/user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  addUser(@Body() user: UserI) {
    return this.userService.addUser(user);
  }

  @Get()
  findAllUsers(): Observable<UserI[]> {
    return this.userService.findAllUsers();
  }

  @Get('/totalbets')
  getTotalBets(): number {
    return this.userService.getTotalBets();
  }
}
