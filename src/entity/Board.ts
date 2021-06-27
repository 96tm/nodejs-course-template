import {
  Entity,
  Column as ORMColumn,
  BaseEntity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Task } from '../entity/Task';
import Column from './Column';

@Entity({ name: 'board' })
class Board extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ORMColumn('varchar', { length: 25 })
  title!: string;

  @OneToMany(() => Column, (column) => column.board, {
    eager: true,
    cascade: true,
  })
  columns!: Column[];

  @OneToMany(() => Task, (task) => task.board, { eager: false })
  tasks!: Task[];
}

export default Board;
