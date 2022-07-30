import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Like, Repository } from 'typeorm';
import { IUsersDataManager } from './users.data.manager.interface';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UsersDataManager implements IUsersDataManager {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }

  async findById(id: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { id, isDeleted: false },
    });
  }

  async findByLogin(login: string) {
    return await this.userRepository.findOne({ where: { login } });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findById(id);
    return user
      ? await this.userRepository.save(Object.assign(user, updateUserDto))
      : user;
  }

  async findSuggested(limit: number, include: string): Promise<User[]> {
    return await this.userRepository.find({
      take: limit,
      where: { isDeleted: false, login: Like(`${include}%`) },
      order: { login: 'ASC' },
    });
  }
}
