const tasksRepo = require('./task.memory.repository');
// const usersService = require('../users/user.service');
// const boardsService = require('../boards/board.service');

const getAllByBoardId = id => tasksRepo.getAllByBoardId(id);
const getByBoardAndTaskId = (boardId, taskId) =>
  tasksRepo.getByBoardAndTaskId(boardId, taskId);
const editByBoardAndTaskId = async ({
  boardId,
  taskId,
  title,
  order,
  description,
  userId,
  newBoardId,
  columnId
}) => {
  const result = {};
  const task = await tasksRepo.editByBoardAndTaskId({
    boardId,
    taskId,
    title,
    order,
    description,
    userId,
    newBoardId,
    columnId
  });
  if (task) {
    result.task = task;
    result.status = 201;
  } else {
    result.status = 404;
  }

  return result;
};

// const validateInput = async ({
//   boardId,
//   taskId,
//   title,
//   order,
//   description,
//   userId,
//   newBoardId,
//   columnId
// }) => {
//   if (!getByBoardAndTaskId(boardId, taskId)) return false;
//   if (!Number.isInteger(order)) return false;
//   if (typeof title !== 'string' || !title) return false;
//   if (typeof description !== 'string') return false;
//   const user = await usersService.getUserById(userId);
//   const board = await boardsService.getById(newBoardId);
//   if (!user) return false;
//   if (!board) return false;
//   if (!columnId) return false;
//   return true;
// };

module.exports = { getAllByBoardId, getByBoardAndTaskId, editByBoardAndTaskId };
