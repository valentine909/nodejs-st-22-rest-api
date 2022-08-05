import { Permission, permissions } from '../types/groups.types';
import {
  IsArray,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from '@nestjs/class-validator';
import { ManyToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';

export class CreateGroupDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  @IsIn(permissions, { each: true })
  permissions: Permission[];

  @IsOptional()
  @IsArray()
  @IsUUID(4, { each: true })
  userIds: string[];

  @ManyToMany(() => User, (user) => user.groups)
  users: User[];
}
