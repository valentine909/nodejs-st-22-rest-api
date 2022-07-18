import { CreateUserDto } from '../dto/create-user.dto';

export class User {
  constructor(id: string, user: CreateUserDto, isDeleted = false) {
    this.id = id;
    this.login = user.login;
    this.password = user.password;
    this.age = user.age;
    this.isDeleted = isDeleted;
  }

  id: string;

  login: string;

  password: string;

  age: number;

  isDeleted: boolean;
}
