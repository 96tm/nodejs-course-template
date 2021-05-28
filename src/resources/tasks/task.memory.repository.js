/**
 * @module Tasks repository
 * @desc Contains functions related to tasks
 */

const Task = require('./task.model');
const { getById } = require('../boards/board.memory.repository');

const tasks = [];

/**
 * Get all tasks with given userId
 *
 * @param {string} id - user id
 *
 * @return {Task[]} - array of tasks
 *
 * @example
 *
 *  getAllByUserId('1')
 */
const getAllByUserId = async (id) => tasks.filter((task) => task.userId === id);

/**
 * Get all tasks with given boardId
 *
 * @param {string} id - board id
 *
 * @return {Task[]} - array of tasks
 *
 * @example
 *
 *  getAllByBoardId('1')
 */
const getAllByBoardId = async (id) =>
  tasks.filter((task) => task.boardId === id);

/**
 * Get task with given boardId and userId and return it;
 * return undefined if nothing found
 *
 * @param {string} boardId - board id
 * @param {string} taskId - task id
 *
 * @return {task|undefined} - found task or undefined
 *
 * @example
 *
 *  getByBoardAndTaskId('1', '1')
 */
const getByBoardAndTaskId = async (boardId, taskId) =>
  tasks.find((task) => task.boardId === boardId && task.id === taskId);

/**
 * Create task with given parameters,
 * add it into database and return it
 *
 * @param {string} task.title - task title
 * @param {string} task.order - task order
 * @param {string} task.description - task description
 * @param {string} task.userId - id of a user to whom the task will be assigned
 * @param {string} task.boardId - id of board into which the task will be added
 * @param {string} task.columnId - id of column into which the task will be added
 *
 * @return {Task} - created task
 *
 * @example
 *
 *  add('Task title', '1', 'Task description', '1', '1', '1')
 */
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

/**
 * Find task with given id and
 * delete it from database
 *
 * @param {string} id - task id
 *
 * @example
 *
 *  deleteById('1')
 */
const deleteById = async (id) => {
  const taskToDelete = getById(id);
  if (taskToDelete) {
    tasks.splice(
      tasks.findIndex((task) => task.id === id),
      1
    );
  }
};

/**
 * Find task by given boardId and taskId,
 * then edit it using given parameters and return edited task;
 * return undefined if nothing found
 *
 * @param {string} boardId - id of board where the task belongs
 * @param {string} taskId - id of a task to be edited
 * @param {string} title - task title
 * @param {string} order - task order
 * @param {string} description - task description
 * @param {string} userId - id of a user to whom the task will be assigned
 * @param {string} columnId - id of column into which the task will be added
 *
 * @return {Task|undefined} - edited task or undefined
 *
 * @example
 *
 *  editByBoardAndTaskId('1', '1', 'Task title', '1', 'Task description', '1', '1')
 */
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
