import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
  HttpException,
} from '@nestjs/common';
import { GroupsService } from './groups.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { notFoundErrorMessage } from '../utils/error.messages';
import { Entities } from '../utils/constants/entities';
import { Routes } from '../utils/constants/routes';

@Controller(`v1/${Routes.groups}`)
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createGroupDto: CreateGroupDto) {
    return await this.groupsService.create(createGroupDto);
  }

  @Get()
  async findAll() {
    return this.groupsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const group = await this.groupsService.findOne(id);
    if (!group) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: notFoundErrorMessage(Entities.Group, id),
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return group;
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateGroupDto: UpdateGroupDto,
  ) {
    const group = await this.groupsService.update(id, updateGroupDto);
    if (!group) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: notFoundErrorMessage(Entities.Group, id),
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return group;
  }

  @Post(':id')
  async addUsers(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateGroupDto: UpdateGroupDto,
  ) {
    const group = await this.groupsService.addUsers(id, updateGroupDto);
    if (!group) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: notFoundErrorMessage(Entities.Group, id),
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return group;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const affected = await this.groupsService.delete(id);
    if (affected) return;
    throw new HttpException(
      {
        statusCode: HttpStatus.NOT_FOUND,
        message: notFoundErrorMessage(Entities.Group, id),
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
