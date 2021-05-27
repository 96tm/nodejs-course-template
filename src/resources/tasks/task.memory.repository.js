const Task = require('./task.model');
const { getById } = require('../boards/board.memory.repository');

const tasks = [];

const getAllByUserId = async (id) => tasks.filter((task) => task.userId === id);

const getAllByBoardId = async (id) =>
  tasks.filter((task) => task.boardId === id);

const getByBoardAndTaskId = async (boardId, taskId) =>
  tasks.find((task) => task.boardId === boardId && task.id === taskId);

const add = async ({
  title,
  order,
  description,
  userId,
  boardId,
  columnId,
}) => {
  const task = new Task({
    title,
    order,
    description,
    userId,
    boardId,
    columnId,
  });
  tasks.push(task);
  return task;
};

const deleteById = async (id) => {
  const taskToDelete = getById(id);
  if (taskToDelete) {
    tasks.splice(
      tasks.findIndex((task) => task.id === id),
      1
    );
  }
};

const editByBoardAndTaskId = async ({
  boardId,
  taskId,
  title,
  order,
  description,
  userId,
  columnId,
}) => {
  const task = await getByBoardAndTaskId(boardId, taskId);
  if (task) {
    task.title = title;
    task.order = order;
    task.description = description;
    task.userId = userId;
    task.boardId = boardId;
    task.columnId = columnId;
  }
  return task;
};

module.exports = {
  getAllByBoardId,
  getByBoardAndTaskId,
  editByBoardAndTaskId,
  deleteById,
  add,
  getAllByUserId,
};
