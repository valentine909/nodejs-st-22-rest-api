import { Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { GroupsDataManager } from './data-manager/groups.data.manager';
import { Group } from './entities/group.entity';
import { ServiceLogger } from '../utils/service.logger';

@Injectable()
export class GroupsService {
  constructor(
    private groupDataManager: GroupsDataManager,
    private logger: ServiceLogger,
  ) {}

  async create(createGroupDto: CreateGroupDto): Promise<Group> {
    this.logger.log(
      this.constructor.name,
      this.create.name,
      Array.from(arguments),
    );
    return this.groupDataManager.create(createGroupDto);
  }

  async findAll(): Promise<Group[]> {
    this.logger.log(
      this.constructor.name,
      this.findAll.name,
      Array.from(arguments),
    );
    return this.groupDataManager.findAll();
  }

  async findOne(id: string): Promise<Group> {
    this.logger.log(
      this.constructor.name,
      this.findOne.name,
      Array.from(arguments),
    );
    return this.groupDataManager.findById(id);
  }

  async update(id: string, updateGroupDto: UpdateGroupDto): Promise<Group> {
    this.logger.log(
      this.constructor.name,
      this.update.name,
      Array.from(arguments),
    );
    return this.groupDataManager.update(id, updateGroupDto);
  }

  async delete(id: string): Promise<number> {
    this.logger.log(
      this.constructor.name,
      this.delete.name,
      Array.from(arguments),
    );
    return this.groupDataManager.delete(id);
  }

  async addUsers(id: string, updateGroupDto: UpdateGroupDto) {
    this.logger.log(
      this.constructor.name,
      this.addUsers.name,
      Array.from(arguments),
    );
    return this.groupDataManager.addUsers(id, updateGroupDto);
  }
}
