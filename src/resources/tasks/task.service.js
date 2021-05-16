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

module.exports = {
  getAllByBoardId,
  getByBoardAndTaskId,
  editByBoardAndTaskId,
  deleteById,
  add,
  getAllByUserId
};
