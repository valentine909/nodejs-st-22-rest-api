import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { In, Like, Repository } from 'typeorm';
import { IUsersDataManager } from './users.data.manager.interface';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { GroupsDataManager } from '../../groups/data-manager/groups.data.manager';

@Injectable()
export class UsersDataManager implements IUsersDataManager {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @Inject(forwardRef(() => GroupsDataManager))
    private groupsDataManager: GroupsDataManager,
  ) {}

  async findById(id: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { id },
      relations: { groups: true },
    });
  }

  async findByIds(ids: string[]): Promise<User[]> {
    return this.userRepository.findBy({ id: In(ids) });
  }

  async findByLogin(login: string, isDeleted = true) {
    return this.userRepository.findOne({
      where: { login },
      withDeleted: isDeleted,
    });
  }

  async findSuggested(limit: number, include: string): Promise<User[]> {
    return this.userRepository.find({
      take: limit,
      where: { login: Like(`${include}%`) },
      order: { login: 'ASC' },
      relations: { groups: true },
    });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create(createUserDto);
    if (createUserDto.groupIds?.length > 0) {
      newUser.groups = await this.groupsDataManager.findByIds(
        createUserDto.groupIds,
      );
    }
    const user = await this.userRepository.save(newUser);
    delete user.deleted_at;
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findById(id);
    let updatedUser;
    if (user) {
      const newUser = Object.assign(user, updateUserDto);
      if (updateUserDto.groupIds?.length > 0) {
        newUser.groups = await this.groupsDataManager.findByIds(
          updateUserDto.groupIds,
        );
      }
      updatedUser = await this.userRepository.save(newUser);
      delete updatedUser.deleted_at;
    }
    return updatedUser;
  }

  async delete(id: string) {
    const { affected } = await this.userRepository.softDelete(id);
    return affected;
  }
}
