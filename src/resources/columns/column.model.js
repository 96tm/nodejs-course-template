const uuid = require('uuid').v4;

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
  constructor({ id = uuid(), title = 'Column', order = '0' } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }
}

module.exports = Column;
