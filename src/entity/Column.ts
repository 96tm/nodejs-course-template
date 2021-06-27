import {
  Entity,
  Column as ORMColumn,
  BaseEntity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import Task from './Task';
import Board from './Board';

@Entity({ name: 'column' })
class Column extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ORMColumn('varchar', { length: 25 })
  title!: string;

  @ORMColumn('integer')
  order!: number;

  @ManyToOne(() => Board, (board) => board.columns, {
    cascade: ['insert', 'update'],
    onDelete: 'CASCADE',
  })
  board!: Board;

  @OneToMany(() => Task, (task) => task.column, { cascade: true })
  tasks!: Task[];
}

export default Column;
