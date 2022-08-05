import { Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { GroupsDataManager } from './data-manager/groups.data.manager';
import { Group } from './entities/group.entity';

@Injectable()
export class GroupsService {
  constructor(private groupDataManager: GroupsDataManager) {}

  async create(createGroupDto: CreateGroupDto): Promise<Group> {
    return this.groupDataManager.create(createGroupDto);
  }

  async findAll(): Promise<Group[]> {
    return this.groupDataManager.findAll();
  }

  async findOne(id: string): Promise<Group> {
    return this.groupDataManager.findById(id);
  }

  async update(id: string, updateGroupDto: UpdateGroupDto): Promise<Group> {
    return this.groupDataManager.update(id, updateGroupDto);
  }

  async delete(id: string): Promise<number> {
    return this.groupDataManager.delete(id);
  }
}
