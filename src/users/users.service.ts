import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersDataManager } from './data-manager/users.data.manager';
import { ServiceLogger } from '../utils/service.logger';

@Injectable()
export class UsersService {
  constructor(
    private usersDataManager: UsersDataManager,
    private logger: ServiceLogger,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.usersDataManager.create(createUserDto);
  }

  async getAutoSuggestUsers(
    loginSubstring: string,
    limit: number,
  ): Promise<User[]> {
    this.logger.log(
      this.constructor.name,
      this.getAutoSuggestUsers.name,
      Array.from(arguments),
    );
    return this.usersDataManager.findSuggested(limit, loginSubstring);
  }

  async findOne(id: string): Promise<User> {
    this.logger.log(
      this.constructor.name,
      this.findOne.name,
      Array.from(arguments),
    );
    return this.usersDataManager.findById(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    this.logger.log(
      this.constructor.name,
      this.update.name,
      Array.from(arguments),
    );
    return this.usersDataManager.update(id, updateUserDto);
  }

  async delete(id: string): Promise<number> {
    this.logger.log(
      this.constructor.name,
      this.delete.name,
      Array.from(arguments),
    );
    return this.usersDataManager.delete(id);
  }
}
