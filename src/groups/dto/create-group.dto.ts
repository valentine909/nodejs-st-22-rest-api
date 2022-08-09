import { Permission, permissions } from '../types/groups.types';
import { IsArray, IsIn, IsNotEmpty, IsString } from '@nestjs/class-validator';

export class CreateGroupDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  @IsIn(permissions, { each: true })
  permissions: Permission[];
}
