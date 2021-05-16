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

const editById = async (boardId, boardTitle, columns) => {
  const board = await getById(boardId);
  if (board) {
    board.title = boardTitle ? boardTitle : (await board).title;
    if (columns) {
      for (const { id, title, order } of columns) {
        const column = new Column({ id, title, order });
        if (!board.columns.find(col => col.id === id)) {
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
