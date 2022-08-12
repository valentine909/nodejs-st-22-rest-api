import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersDataManager } from './data-manager/users.data.manager';
import { loggingWrapper } from '../utils/logging.wrapper';

@Injectable()
export class UsersService {
  constructor(private usersDataManager: UsersDataManager) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.usersDataManager.create(createUserDto);
  }

  async getAutoSuggestUsers(
    loginSubstring: string,
    limit: number,
  ): Promise<User[]> {
    return this.usersDataManager.findSuggested(limit, loginSubstring);
  }

  async findOne(id: string): Promise<User> {
    return this.usersDataManager.findById(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return this.usersDataManager.update(id, updateUserDto);
  }

  async delete(id: string): Promise<number> {
    return this.usersDataManager.delete(id);
  }
}

loggingWrapper(UsersService.prototype);
