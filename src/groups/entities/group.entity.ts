import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Permission } from '../types/groups.types';
import { User } from '../../users/entities/user.entity';
import { IsArray, IsOptional } from '@nestjs/class-validator';
import { Exclude } from 'class-transformer';

@Entity({ name: 'groups' })
export class Group {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('simple-array')
  permissions: Permission[];

  @IsOptional()
  @IsArray()
  @Exclude()
  userIds: string[];

  @ManyToMany(() => User, (user) => user.groups, { onDelete: 'CASCADE' })
  users: User[];
}
