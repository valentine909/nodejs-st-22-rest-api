import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Group } from '../entities/group.entity';
import { CreateGroupDto } from '../dto/create-group.dto';
import { UpdateGroupDto } from '../dto/update-group.dto';
import { IGroupsDataManager } from './groups.data.manager.interface';

@Injectable()
export class GroupsDataManager implements IGroupsDataManager {
  constructor(
    @InjectRepository(Group)
    private groupRepository: Repository<Group>,
  ) {}

  async findAll(): Promise<Group[]> {
    return this.groupRepository.find({ relations: { users: true } });
  }

  async findById(id: string): Promise<Group> {
    return await this.groupRepository.findOne({
      where: { id },
    });
  }

  async create(createGroupDto: CreateGroupDto): Promise<Group> {
    const group = await this.groupRepository.create(createGroupDto);
    return this.groupRepository.save(group);
  }

  async update(id: string, updateGroupDto: UpdateGroupDto): Promise<Group> {
    const group = await this.findById(id);
    return group
      ? this.groupRepository.save(Object.assign(group, updateGroupDto))
      : group;
  }

  async delete(id: string) {
    const { affected } = await this.groupRepository.delete(id);
    return affected;
  }
}
