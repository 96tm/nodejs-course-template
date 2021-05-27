const boardsRepo = require('./board.memory.repository');

/**
 * Get all boards
 *
 * @example
 *
 *  getAll()
 */
const getAll = () => boardsRepo.getAll();

/**
 * Add given board to database
 *
 * @param {Board} board - Board to add
 *
 * @example
 *
 *  addBoard(board)
 */
const addBoard = (board) => boardsRepo.addBoard(board);

/**
 * Find board with given id and return it; if nothing found, return undefined.
 *
 * @param {string} id - board id
 *
 * @return {Board | undefined} - found Board or undefined
 *
 * @example
 *
 *  getById('1')
 */
const getById = (boardId) => boardsRepo.getById(boardId);

/**
 * Find board with given id,
 * set its title and columns to given values
 * and return the board;
 * if nothing found, return undefined
 *
 * @param {String} id - board id
 * @param {String} title - new title
 * @param {Column[]} columns - array of columns
 * @return {Board|undefined} - found board or undefined
 *
 * @example
 *
 *  editById('1', 'New title', [ column0, column1 ])
 */
const editById = (id, title, columns) =>
  boardsRepo.editById(id, title, columns);

/**
 * Delete board with given id and return it; if nothing found, return undefined
 *
 * @param {string} id - board id
 * @return {Board|undefined} - found board or undefined
 *
 * @example
 *
 *  deleteById('1')
 */
const deleteById = (id) => boardsRepo.deleteById(id);

module.exports = { getAll, addBoard, getById, editById, deleteById };
