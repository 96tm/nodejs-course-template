const uuid = require('uuid').v4;

/** Class representing a board */
class Board {
  /**
   * Creates an instance of Board.
   * @param {Object} parameters - board parameters
   * @param {string} parameters.id - board id
   * @param {string} parameters.title - board title
   * @param {Column[]} columns - array of columns
   * @memberof Board
   */
  constructor({ id = uuid(), title = 'Board', columns = [] } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }
}

module.exports = Board;
