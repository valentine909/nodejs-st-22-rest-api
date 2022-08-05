import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Group } from '../entities/group.entity';
import { CreateGroupDto } from '../dto/create-group.dto';
import { UpdateGroupDto } from '../dto/update-group.dto';
import { IGroupsDataManager } from './groups.data.manager.interface';
import { UsersDataManager } from '../../users/data-manager/users.data.manager';

@Injectable()
export class GroupsDataManager implements IGroupsDataManager {
  constructor(
    @InjectRepository(Group)
    private groupRepository: Repository<Group>,
    @Inject(forwardRef(() => UsersDataManager))
    private usersDataManager: UsersDataManager,
  ) {}

  async findAll(): Promise<Group[]> {
    return this.groupRepository.find({ relations: { users: true } });
  }

  async findById(id: string): Promise<Group> {
    return await this.groupRepository.findOne({
      where: { id },
      relations: { users: true },
    });
  }

  async findByIds(ids: string[]): Promise<Group[]> {
    return this.groupRepository.findBy({ id: In(ids) });
  }

  async create(createGroupDto: CreateGroupDto): Promise<Group> {
    const group = this.groupRepository.create(createGroupDto);
    if (createGroupDto.userIds?.length > 0) {
      group.users = await this.usersDataManager.findByIds(
        createGroupDto.userIds,
      );
    }
    return this.groupRepository.save(group);
  }

  async update(id: string, updateGroupDto: UpdateGroupDto): Promise<Group> {
    const group = await this.findById(id);
    let newGroup;
    if (group) {
      if (updateGroupDto.userIds?.length > 0) {
        group.users = await this.usersDataManager.findByIds(
          updateGroupDto.userIds,
        );
      }
      const newGroup = Object.assign(group, updateGroupDto);
      delete newGroup.userIds;
    }
    return group && newGroup ? this.groupRepository.save(newGroup) : group;
  }

  async delete(id: string) {
    const { affected } = await this.groupRepository.delete(id);
    return affected;
  }

  async addUsers(id: string, updateGroupDto: UpdateGroupDto) {
    const group = await this.findById(id);
    if (group) {
      const addition = await this.usersDataManager.findByIds(
        updateGroupDto.userIds,
      );
      group.users = group.users.concat(addition);
    }
    return group ? this.groupRepository.save(group) : group;
  }
}
