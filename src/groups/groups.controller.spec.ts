import { Test, TestingModule } from '@nestjs/testing';
import { GroupsController } from './groups.controller';
import { GroupsService } from './groups.service';
import { Group } from './entities/group.entity';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { HttpException } from '@nestjs/common';

let controller: GroupsController;
const mockGroup: Group = {
  id: '',
  name: '',
  permissions: ['SHARE'],
  userIds: null,
  users: null,
};

const falseId = 'falseId';

class GroupsServiceMock {
  async create(сreateGroupDto: CreateGroupDto): Promise<Group> {
    return mockGroup;
  }

  async findAll(): Promise<Group[]> {
    return [mockGroup];
  }

  async findOne(id: string): Promise<Group> {
    return id === falseId ? null : mockGroup;
  }

  async update(id: string, updateGroupDto: UpdateGroupDto): Promise<Group> {
    return id === falseId ? null : mockGroup;
  }

  async delete(id: string): Promise<number> {
    return id === falseId ? 0 : 1;
  }

  async addUsers(id: string, updateGroupDto: UpdateGroupDto) {
    return id === falseId ? null : mockGroup;
  }
}

describe('GroupsController', () => {
  beforeEach(async () => {
    const MockServiceProvider = {
      provide: GroupsService,
      useClass: GroupsServiceMock,
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GroupsController],
      providers: [GroupsService, MockServiceProvider],
    }).compile();
    controller = module.get<GroupsController>(GroupsController);
  });

  it('findAll', async () => {
    expect(await controller.findAll()).toStrictEqual([mockGroup]);
  });

  it('findOne', async () => {
    expect(await controller.findOne(mockGroup.id)).toBe(mockGroup);
  });

  it('findOne false id', async () => {
    expect.assertions(2);
    try {
      await controller.findOne(falseId);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error).toHaveProperty('status', 404);
    }
  });

  it('update', async () => {
    expect(await controller.update(mockGroup.id, mockGroup)).toBe(mockGroup);
  });

  it('update false id', async () => {
    expect.assertions(2);
    try {
      await controller.update(falseId, mockGroup);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error).toHaveProperty('status', 404);
    }
  });

  it('create', async () => {
    expect(await controller.create(mockGroup)).toBe(mockGroup);
  });

  it('remove', async () => {
    expect(await controller.remove(mockGroup.id)).toBe(undefined);
  });

  it('remove false id', async () => {
    expect.assertions(2);
    try {
      await controller.remove(falseId);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error).toHaveProperty('status', 404);
    }
  });

  it('add users', async () => {
    expect(await controller.addUsers(mockGroup.id, mockGroup)).toBe(mockGroup);
  });

  it('add users false id', async () => {
    expect.assertions(2);
    try {
      await controller.addUsers(falseId, mockGroup);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error).toHaveProperty('status', 404);
    }
  });
});
