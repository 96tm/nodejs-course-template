const Board = require('./board.model');
const Column = require('../columns/column.model');

const boards = [
  new Board({ id: '1', title: 'Board1', columns: [] }),
  new Board({ title: 'Board2', columns: [] }),
  new Board({ title: 'Board3', columns: [] }),
  new Board({ title: 'Board4', columns: [] }),
  new Board({ title: 'Board5', columns: [] }),
  new Board({ title: 'Board6', columns: [] })
];

const getAll = async () => {
  return boards;
};

const addBoard = async board => {
  boards.push(board);
};

const getById = async id => {
  return boards.find(board => board.id === id);
};

const editById = async (id, title, columns) => {
  const board = await getById(id);
  if (board) {
    board.title = title;
    if (columns) {
      for (const { id: colId, title: colTitle, order } of columns) {
        const column = new Column({ colId, colTitle, order });
        if (!board.columns.find(col => col.id === colId)) {
          board.columns.push(column);
        }
      }
    }
  }
  return board;
};

const deleteById = async id => {
  const boardToDelete = await getById(id);
  if (boardToDelete) {
    boards.splice(
      boards.findIndex(board => board.id === id),
      1
    );
  }
  return boardToDelete;
};

module.exports = { getAll, addBoard, getById, editById, deleteById, boards };
