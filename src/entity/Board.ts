import {
  Entity,
  Column as ORMColumn,
  BaseEntity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import Task from './Task';
import Column from './Column';

@Entity({ name: 'board' })
class Board extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ORMColumn('varchar', { length: 25 })
  title: string;

  @OneToMany(() => Column, (column) => column.board, {
    cascade: ['update'],
  })
  columns: Column[];

  @OneToMany(() => Task, (task) => task.board, { cascade: true })
  tasks: Task[];
}

export default Board;
