import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }

  async getAutoSuggestUsers(
    loginSubstring: string,
    limit: number,
  ): Promise<User[]> {
    return await this.userRepository.find({
      take: limit,
      where: { isDeleted: false, login: Like(`${loginSubstring}%`) },
      order: { login: 'ASC' },
    });
  }

  async findOne(id: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { id, isDeleted: false },
    });
  }

  async findOneByLogin(login: string): Promise<User> {
    return await this.userRepository.findOne({ where: { login } });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    return user
      ? await this.userRepository.save(Object.assign(user, updateUserDto))
      : user;
  }

  async remove(id: string): Promise<User> {
    const user = await this.findOne(id);
    if (!user) return user;
    user.isDeleted = true;
    return await this.userRepository.save(user);
  }
}
