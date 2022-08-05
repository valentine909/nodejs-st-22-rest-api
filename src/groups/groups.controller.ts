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
import { notFoundErrorMessage } from '../utils/messages';
import { Entities } from '../utils/entities';

@Controller('groups')
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
    if (group) return group;
    throw new HttpException(
      notFoundErrorMessage(Entities.User, id),
      HttpStatus.NOT_FOUND,
    );
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateGroupDto: UpdateGroupDto,
  ) {
    const group = await this.groupsService.update(id, updateGroupDto);
    if (group) return group;
    throw new HttpException(
      notFoundErrorMessage(Entities.User, id),
      HttpStatus.NOT_FOUND,
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const affected = await this.groupsService.delete(id);
    if (affected) return;
    throw new HttpException(
      notFoundErrorMessage(Entities.User, id),
      HttpStatus.NOT_FOUND,
    );
  }
}
