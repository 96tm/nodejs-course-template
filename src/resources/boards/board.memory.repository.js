const Board = require('./board.model');

const boards = [
  new Board({ title: 'Board1', columns: [] }),
  new Board({ title: 'Board2', columns: [] }),
  new Board({ title: 'Board3', columns: [] }),
  new Board({ title: 'Board4', columns: [] }),
  new Board({ title: 'Board5', columns: [] }),
  new Board({ title: 'Board6', columns: [] })
];

const getAll = async () => {
  return boards;
};

module.exports = { getAll, boards };
