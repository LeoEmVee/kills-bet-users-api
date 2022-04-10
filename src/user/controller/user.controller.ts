import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
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
  getAllUsers(): Promise<UserI[]> {
    return this.userService.getAllUsers();
  }

  @Get('id/:id')
  getUser(@Param('id') id: number): Promise<UserI> {
    return this.userService.getUser(id);
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

  @Get('winner/:realKills')
  getWinner(@Param('realKills') realKills: number): Promise<string> {
    return this.userService.getWinner(realKills);
  }

  @Delete('delete/:id')
  deleteUser(@Param('id') id: number): Promise<string> {
    return this.userService.deleteUser(id);
  }
}
