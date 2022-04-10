import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
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
  async addUser(user: UserI): Promise<Observable<UserI>> {
    const checkMail = await this.userRepository.findOne({ email: user.email });
    if (checkMail)
      throw new ConflictException(
        'E-mail already exists. Please enter another one',
      );
    else return from(this.userRepository.save(user));
  }

  // Retrieves all users and bets
  findAllUsers(): Observable<UserI[]> {
    return from(this.userRepository.find());
  }
}
