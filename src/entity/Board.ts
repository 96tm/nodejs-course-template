import { v4 as uuid } from 'uuid';

import {
  Entity,
  Column as ORMColumn,
  PrimaryColumn,
  BaseEntity,
} from 'typeorm';

@Entity({ name: 'board' })
class Board extends BaseEntity {
  @PrimaryColumn('text', { default: uuid() })
  id: string;

  @ORMColumn('varchar', { length: 25 })
  title: string;

  // columns: Column[];
}

export default Board;
