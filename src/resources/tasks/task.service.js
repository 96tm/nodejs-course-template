const tasksRepo = require('./task.memory.repository');

const getAllByBoardId = id => tasksRepo.getAllByBoardId(id);
const getByBoardAndTaskId = (boardId, taskId) =>
  tasksRepo.getByBoardAndTaskId(boardId, taskId);

module.exports = { getAllByBoardId, getByBoardAndTaskId };
