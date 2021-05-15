const tasksRepo = require('./task.memory.repository');

const getAllByBoardId = boardId => tasksRepo.getAllByBoardId(boardId);

module.exports = { getAllByBoardId };
