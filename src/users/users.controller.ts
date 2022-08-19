import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  Put,
  Query,
  ParseUUIDPipe,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { notFoundErrorMessage } from '../utils/error.messages';
import { Routes } from '../utils/constants/routes';
import { Entities } from '../utils/constants/entities';

@Controller(`v1/${Routes.users}`)
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Get()
  async getAutoSuggestUsers(
    @Query('loginSubstring') loginSubstring = '',
    @Query('limit') limit = 10,
  ) {
    return await this.userService.getAutoSuggestUsers(loginSubstring, limit);
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: notFoundErrorMessage(Entities.User, id),
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return user;
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const user = await this.userService.update(id, updateUserDto);
    if (!user) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: notFoundErrorMessage(Entities.User, id),
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return user;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    const affected = await this.userService.delete(id);
    if (affected) return;
    throw new HttpException(
      {
        statusCode: HttpStatus.NOT_FOUND,
        message: notFoundErrorMessage(Entities.User, id),
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
