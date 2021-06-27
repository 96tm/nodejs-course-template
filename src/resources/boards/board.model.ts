import { v4 as uuid } from 'uuid';

import Column from '../columns/column.model';

import { IBoard } from '../../common/types';

class Board implements IBoard {
  id: string;

  title: string;

  columns: Column[];

  constructor({ id = uuid(), title = 'Board', columns = [] } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }
}

export default Board;
