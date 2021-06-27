import {
  BaseEntity,
  Column as ORMColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import User from './User';
import Board from './Board';
import Column from './Column';

@Entity({ name: 'task' })
class Task extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ORMColumn('varchar', { length: 25 })
  title: string;

  @ORMColumn('integer')
  order: number;

  @ORMColumn('varchar', { length: 50 })
  description: string;

  @ManyToOne(() => User, (user) => user.tasks, {
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  })
  user: User | null;

  @ManyToOne(() => Board, (board) => board.tasks, {
    onDelete: 'CASCADE',
  })
  board: Board | null;

  @ManyToOne(() => Column, (column) => column.tasks, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  column: Column | null;
}

export default Task;
