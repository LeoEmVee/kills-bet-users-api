import {
  ConflictException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../models/user.entity';
import { UserI } from '../models/user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  // Adds new user and bet (checking if mail is not already in use)
  async addUser(user: UserI): Promise<UserI> {
    const checkMail = await this.userRepository.findOne({ email: user.email });
    if (checkMail)
      throw new ConflictException(
        'E-mail already exists. Please enter another one',
      );
    else if (user.kills < 0)
      throw new NotAcceptableException('Bet must be 0 or more');
    else return this.userRepository.save(user);
  }

  // Retrieves all users and bets
  async findAllUsers(): Promise<UserI[]> {
    const allUsers = await this.userRepository.find();
    return allUsers;
  }

  // Retrieves user by id
  async getUser(id: number): Promise<UserI> {
    const user = await this.userRepository.findOne(id);
    if (!user)
      throw new NotFoundException(
        'User ID not found. Please enter another one',
      );
    return user;
  }

  // Retrieves total number of bets
  async getTotalBets(): Promise<string> {
    const totalBets = await this.findAllUsers();
    return `Total bets: ${totalBets.length} bets`;
  }

  async getTotalKillsBet(): Promise<string> {
    const totalBets = await this.findAllUsers();
    const totalKillsBet = totalBets
      .map((bet) => bet.kills)
      .reduce((p, c) => p + c);

    return `Total kills bet: ${totalKillsBet} kills`;
  }

  // Retrieves highest bet
  async getMaxBet(): Promise<string> {
    const totalBets = await this.findAllUsers();
    const kills = totalBets.map((bet) => bet.kills);
    const maxBet = Math.max(...kills);
    const user = totalBets[kills.indexOf(maxBet)];

    return `Highest kills bet: ${maxBet} kills, by ${user.name}`;
  }

  // Retrieves lowest bet
  async getMinBet(): Promise<string> {
    const totalBets = await this.findAllUsers();
    const kills = totalBets.map((bet) => bet.kills);
    const minBet = Math.min(...kills);
    const user = totalBets[kills.indexOf(minBet)];
    return `Lowest kills bet: ${minBet} kills, by ${user.name}`;
  }

  // Retrieves average bet
  async getAvgBet(): Promise<string> {
    const totalBets = await this.findAllUsers();
    const kills = totalBets.map((bet) => bet.kills);
    const avgBet = Math.round(kills.reduce((p, c) => p + c) / kills.length);
    return `Average kills bet: ${avgBet} kills`;
  }

  // Retrieves stats report
  async getAllStats(): Promise<string> {
    const totalBets = await this.getTotalBets();
    const totalKillsBet = await this.getTotalKillsBet();
    const maxBet = await this.getMaxBet();
    const minBet = await this.getMinBet();
    const avgBet = await this.getAvgBet();

    return `${totalBets}\n${totalKillsBet}\n${maxBet}\n${minBet}\n${avgBet}`;
  }

  // Deletes user by id
  async deleteUser(id: number): Promise<string> {
    const user = await this.userRepository.findOne(id);
    if (!user)
      throw new NotFoundException(
        'User ID not found. Please enter another one',
      );
    const deleted = user.id;
    await this.userRepository.remove(user);
    return `User ${deleted} deleted`;
  }
}
