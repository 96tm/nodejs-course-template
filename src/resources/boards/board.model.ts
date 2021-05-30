import { v4 as uuid } from 'uuid';

import Column from '../columns/column.model';

/** Class representing a board */
class Board {
  /**
   * Creates an instance of Board.
   * @param {Object} parameters - board parameters
   * @param {string} parameters.id - board id= requiree - board title
   * @param {Column[]} columns - array of columns
   * @memberof Board
   */
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
