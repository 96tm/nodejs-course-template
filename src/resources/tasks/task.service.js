const tasksRepo = require('./task.memory.repository');

const getAllByBoardId = id => tasksRepo.getAllByBoardId(id);

module.exports = { getAllByBoardId };
