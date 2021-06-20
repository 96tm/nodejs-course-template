import {
  Entity,
  Column as ORMColumn,
  BaseEntity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Board from './Board';
import Task from './Task';

@Entity({ name: 'column' })
class Column extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ORMColumn('varchar', { length: 25 })
  title: string;

  @ORMColumn('integer')
  order: number;

  @ManyToOne(() => Board, (board) => board.columns, {
    cascade: ['insert', 'update'],
    onDelete: 'CASCADE',
  })
  board: Board;

  @OneToMany(() => Task, (task) => task.column, { cascade: true })
  tasks: Task[];
}

export default Column;
