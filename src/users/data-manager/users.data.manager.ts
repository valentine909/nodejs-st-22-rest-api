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
    const user = await this.userRepository.save(
      this.userRepository.create(createUserDto),
    );
    delete user.deleted_at;
    return user;
  }

  async findById(id: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { id },
    });
  }

  async findByLogin(login: string) {
    return this.userRepository.findOne({ where: { login }, withDeleted: true });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findById(id);
    let updatedUser;
    if (user) {
      updatedUser = await this.userRepository.save(
        Object.assign(user, updateUserDto),
      );
      delete updatedUser.deleted_at;
    }
    return updatedUser;
  }

  async findSuggested(limit: number, include: string): Promise<User[]> {
    return this.userRepository.find({
      take: limit,
      where: { login: Like(`${include}%`) },
      order: { login: 'ASC' },
    });
  }

  async delete(id: string) {
    const { affected } = await this.userRepository.softDelete(id);
    return affected;
  }
}
