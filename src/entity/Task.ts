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
  id!: string;

  @ORMColumn('varchar', { length: 25 })
  title!: string;

  @ORMColumn('integer')
  order!: number;

  @ORMColumn('varchar', { length: 50 })
  description!: string;

  @ManyToOne(() => User, (user) => user.tasks, {
    eager: false,
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  })
  user!: User | null;

  @ORMColumn({ nullable: true })
  userId: string | null;

  @ManyToOne(() => Board, (board) => board.tasks, {
    eager: false,
    onDelete: 'CASCADE',
  })
  board!: Board | null;

  @ORMColumn({ nullable: true })
  boardId!: string;

  @ManyToOne(() => Column, (column) => column.tasks, {
    eager: false,
  })
  column!: Column | null;

  @ORMColumn({ nullable: true })
  columnId!: string;
}

type TaskParameters = {
  id?: string;
  title: string;
  order: number;
  description: string;
  userId: string | null;
  boardId: string | null;
  columnId: string | null;
};

type EditTaskParameters = {
  id?: string;
  title: string;
  taskId: string;
  order: number;
  description: string;
  userId: string | null;
  boardId: string;
  columnId: string | null;
};

export { TaskParameters, EditTaskParameters, Task };
