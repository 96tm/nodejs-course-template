import {
  BaseEntity,
  Column as ORMColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import Task from './Task';

@Entity({ name: 'user' })
class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ORMColumn('varchar', { length: 50 })
  name!: string;

  @ORMColumn('varchar', { length: 50 })
  login!: string;

  @ORMColumn('text')
  password!: string;

  @OneToMany(() => Task, (task) => task.user, { eager: false })
  tasks!: Task[];

  static toResponse(user: User): { id: string; name: string; login: string } {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

export default User;
