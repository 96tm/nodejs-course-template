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

const getById = async boardId => {
  return boards.find(board => board.id === boardId);
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

module.exports = { getAll, addBoard, getById, editById, boards };
