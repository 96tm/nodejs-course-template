import { v4 as uuid } from 'uuid';

type ColumnParameters = { id?: string; title?: string; order?: string };

/** Class representing a column on a board */
class Column {
  /**
   * Creates an instance of Column.
   * @param {Object} parameters - column parameters
   * @param {string} parameters.id - column id
   * @param {string} parameters.title - column title
   * @param {string} parameters.order - column order on the board
   * @memberof Column
   */
  id: string;

  title: string;

  order: string;

  constructor({
    id = uuid(),
    title = 'Column',
    order = '0',
  }: ColumnParameters) {
    this.id = id;
    this.title = title;
    this.order = order;
  }
}

export default Column;
