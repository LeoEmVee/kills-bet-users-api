import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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
  findAllUsers(): Promise<UserI[]> {
    return this.userService.findAllUsers();
  }

  @Get('totalbets')
  getTotalBets(): Promise<string> {
    return this.userService.getTotalBets();
  }

  @Get('totalkillsbet')
  getTotalKillsBet(): Promise<string> {
    return this.userService.getTotalKillsBet();
  }

  @Get('maxbet')
  getMaxBet(): Promise<string> {
    return this.userService.getMaxBet();
  }

  @Get('minbet')
  getMinBet(): Promise<string> {
    return this.userService.getMinBet();
  }

  @Get('avgbet')
  getAvgBet(): Promise<string> {
    return this.userService.getAvgBet();
  }

  @Get('allstats')
  getAllStats(): Promise<string> {
    return this.userService.getAllStats();
  }
}
