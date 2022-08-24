import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HttpException } from '@nestjs/common';

let controller: UsersController;
const mockUser: User = {
  login: 'Phantom',
  password: '$2b$12$.jTVvCQbZeQhqVM2QBWUK.RKwMUHx8G13WcLXVMC.iskjPqC4qk32',
  age: 24,
  id: '069442ae-5a04-4243-93c9-6e66f7c59dee',
  deleted_at: null,
  refresh: null,
  groupIds: null,
  groups: null,
};

const falseId = 'falseId';

class UserServiceMock {
  async create(createUserDto: CreateUserDto): Promise<User> {
    return mockUser;
  }

  async getAutoSuggestUsers(
    loginSubstring: string,
    limit: number,
  ): Promise<User[]> {
    return [mockUser];
  }

  async findOne(id: string): Promise<User> {
    return id === falseId ? null : mockUser;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return id === falseId ? null : mockUser;
  }

  async delete(id: string): Promise<number> {
    return id === falseId ? 0 : 1;
  }
}

describe('UsersController', () => {
  beforeEach(async () => {
    const MockServiceProvider = {
      provide: UsersService,
      useClass: UserServiceMock,
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService, MockServiceProvider],
    }).compile();
    controller = module.get<UsersController>(UsersController);
  });

  it('getAutoSuggestUsers', async () => {
    expect(await controller.getAutoSuggestUsers('Ph', 5)).toStrictEqual([
      mockUser,
    ]);
  });

  it('findOne', async () => {
    expect(await controller.findOne(mockUser.id)).toBe(mockUser);
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
    expect(await controller.update(mockUser.id, mockUser)).toBe(mockUser);
  });

  it('update false id', async () => {
    expect.assertions(2);
    try {
      await controller.update(falseId, mockUser);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error).toHaveProperty('status', 404);
    }
  });

  it('create', async () => {
    expect(await controller.create(mockUser)).toBe(mockUser);
  });

  it('remove', async () => {
    expect(await controller.remove(mockUser.id)).toBe(undefined);
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
});
