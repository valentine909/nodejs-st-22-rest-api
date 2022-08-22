import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersDataManager } from './data-manager/users.data.manager';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt');

@Injectable()
export class UsersService {
  constructor(private usersDataManager: UsersDataManager) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { password, ...remainder } = createUserDto;
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, 12, (err, hash) => {
        if (err) {
          reject(err);
        }
        const user = { ...remainder, password: hash };
        resolve(this.usersDataManager.create(user));
      });
    });
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

  async findByLogin(login: string, isDeleted: boolean): Promise<User> {
    return this.usersDataManager.findByLogin(login, isDeleted);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return this.usersDataManager.update(id, updateUserDto);
  }

  async delete(id: string): Promise<number> {
    return this.usersDataManager.delete(id);
  }

  async verifyPassword(password: string, hash: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, hash, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  }
}
