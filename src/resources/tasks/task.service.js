const tasksRepo = require('./task.memory.repository');

const getAllByUserId = id => tasksRepo.getAllByUserId(id);
const getAllByBoardId = id => tasksRepo.getAllByBoardId(id);
const add = ({ title, order, description, userId, boardId, columnId }) => {
  return tasksRepo.add({
    title,
    order,
    description,
    userId,
    boardId,
    columnId
  });
};
const deleteById = id => tasksRepo.deleteById(id);
const getByBoardAndTaskId = (boardId, taskId) =>
  tasksRepo.getByBoardAndTaskId(boardId, taskId);
const editByBoardAndTaskId = async ({
  boardId,
  taskId,
  title,
  order,
  description,
  userId,
  columnId
}) => {
  return await tasksRepo.editByBoardAndTaskId({
    boardId,
    taskId,
    title,
    order,
    description,
    userId,
    columnId
  });
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

module.exports = {
  getAllByBoardId,
  getByBoardAndTaskId,
  editByBoardAndTaskId,
  deleteById,
  add,
  getAllByUserId
};
