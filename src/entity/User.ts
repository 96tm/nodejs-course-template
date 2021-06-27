import {
  BaseEntity,
  Column as ORMColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  getRepository,
} from 'typeorm';

import bcrypt from 'bcrypt';

import { Task } from '../entity/Task';
import { BCRYPT_ROUNDS } from '../common/config';

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

  static async createAdmin(): Promise<boolean> {
    const adminDTO = {
      name: 'admin',
      login: 'admin',
      password: bcrypt.hashSync('admin', BCRYPT_ROUNDS),
    };
    const repository = getRepository(User);
    const adminExists = await repository.findOne({
      where: { login: adminDTO.login },
    });
    if (!adminExists) {
      await repository.save(adminDTO);
      return Promise.resolve(true);
    }
    return Promise.resolve(false);
  }
}

export default User;
