import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { v4 } from 'uuid';

@Injectable()
export class UserService {
  private _users: User[] = [];

  create(createUserDto: CreateUserDto): User {
    const id = v4();
    const user = new User(id, createUserDto);
    this._users.push(user);
    return user;
  }

  getAutoSuggestUsers(loginSubstring: string, limit: number): User[] {
    return this._users
      .filter((user) => user.login.includes(loginSubstring) && !user.isDeleted)
      .sort((a, b) => a.login.localeCompare(b.login))
      .slice(0, limit);
  }

  findOne(id: string): User {
    return this._users.find((user) => user.id === id && !user.isDeleted);
  }

  findOneByLogin(login: string): User {
    return this._users.find((user) => user.login === login && !user.isDeleted);
  }

  update(id: string, updateUserDto: UpdateUserDto): User {
    const index = this._users.findIndex((user) => user.id === id);
    this._users[index] = new User(id, {
      ...this._users[index],
      ...updateUserDto,
    });
    return this._users[index];
  }

  remove(id: string): void {
    const user = this.findOne(id);
    user.isDeleted = true;
  }
}
