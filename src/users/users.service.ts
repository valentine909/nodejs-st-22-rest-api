import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersDataManager } from './data-manager/users.data.manager';

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
    return await this.usersDataManager.findSuggested(limit, loginSubstring);
  }

  async findOne(id: string): Promise<User> {
    return this.usersDataManager.findById(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return await this.usersDataManager.update(id, updateUserDto);
  }

  async delete(id: string): Promise<User> {
    const user = await this.usersDataManager.findById(id);
    if (!user) return;
    user.isDeleted = true;
    return await this.update(id, user);
  }
}
