const boardsRepo = require('./board.memory.repository');

const getAll = () => boardsRepo.getAll();

const addBoard = board => boardsRepo.addBoard(board);

const getById = boardId => boardsRepo.getById(boardId);

const editById = (boardId, boardTitle, columns) => {
  return boardsRepo.editById(boardId, boardTitle, columns);
};

const deleteById = id => {
  return boardsRepo.deleteById(id);
};

module.exports = { getAll, addBoard, getById, editById, deleteById };
