import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Permission } from '../types/groups.types';
import { User } from '../../users/entities/user.entity';

@Entity({ name: 'groups' })
export class Group {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('simple-array')
  permissions: Permission[];

  @ManyToMany(() => User, (user) => user.groups)
  users: User[];
}
