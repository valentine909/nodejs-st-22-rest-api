import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  DeleteDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Group } from '../../groups/entities/group.entity';
import { IsArray, IsOptional } from '@nestjs/class-validator';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  login: string;

  @Column()
  password: string;

  @Column()
  age: number;

  @Exclude()
  @DeleteDateColumn({ nullable: true, default: null, select: false })
  deleted_at: Date | null;

  @Column({ nullable: true })
  refresh: string;

  @IsOptional()
  @IsArray()
  groupIds: string[];

  @ManyToMany(() => Group, (group) => group.users, { onDelete: 'CASCADE' })
  @JoinTable()
  groups: Group[];
}
