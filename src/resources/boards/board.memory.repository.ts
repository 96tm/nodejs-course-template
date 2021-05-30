/**
 * @module Boards repository
 * @desc Contains functions related to boards
 */

import Column from '../columns/column.model';

import Board from './board.model';

const boards: Board[] = [];

/**
 * Get all boards
 *
 * @example
 *
 *  getAll()
 */
const getAll: () => Promise<Board[]> = async () => boards;

/**
 * Add given board to database
 *
 * @param {Board} board - Board to add
 *
 * @example
 *
 *  addBoard(board)
 */
const addBoard: (board: Board) => Promise<void> = async (board) => {
  boards.push(board);
};

/**
 * Find board with given id and return it; if nothing found, return undefined.
 *
 * @param {string} id - board id
 *
 * @return {Board | undefined} - found board or undefined
 *
 * @example
 *
 *  getById('1')
 */
const getById: (id: string) => Promise<Board | undefined> = async (id) =>
  boards.find((board) => board.id === id);

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
const editById: (
  id: string,
  title: string,
  columns: Column[]
) => Promise<Board | undefined> = async (id, title, columns) => {
  const board = await getById(id);
  if (board) {
    board.title = title;
    if (columns) {
      columns.forEach((currentColumn) => {
        const { id: colId, title: colTitle, order } = currentColumn;
        const column = new Column({ id: colId, title: colTitle, order });
        if (!board.columns.find((col) => col.id === colId)) {
          board.columns.push(column);
        }
      });
    }
  }
  return board;
};

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
const deleteById: (id: string) => Promise<Board | undefined> = async (id) => {
  const boardToDelete = await getById(id);
  if (boardToDelete) {
    boards.splice(
      boards.findIndex((board) => board.id === id),
      1
    );
  }
  return boardToDelete;
};

export { getAll, addBoard, getById, editById, deleteById, boards };
