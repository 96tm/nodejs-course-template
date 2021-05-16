const Task = require('./task.model');
const Column = require('../columns/column.model');
const { boards, getById } = require('../boards/board.memory.repository');
const { users } = require('../users/user.memory.repository');

const columns = [
  new Column({ title: 'Column 1', order: 0 }),
  new Column({ title: 'Column 2', order: 1 })
];

const tasks = [
  new Task({
    title: 'Task1',
    description: 'Task1 description',
    order: '0',
    columnId: columns[0].id,
    boardId: boards[0].id,
    userId: users[0].id
  }),
  new Task({
    id: '1',
    title: 'Task2',
    description: 'Task2 description',
    order: '0',
    columnId: columns[1].id,
    boardId: boards[0].id,
    userId: users[1].id
  }),
  new Task({
    title: 'Task3',
    description: 'Task3 description',
    order: '0',
    columnId: columns[0].id,
    boardId: boards[2].id,
    userId: users[2].id
  }),
  new Task({
    title: 'Task4',
    description: 'Task4 description',
    order: '0',
    columnId: columns[1].id,
    boardId: boards[1].id,
    userId: users[0].id
  }),
  new Task({
    title: 'Task5',
    description: 'Task5 description',
    order: '0',
    columnId: columns[1].id,
    boardId: boards[0].id,
    userId: users[1].id
  }),
  new Task({
    title: 'Task6',
    description: 'Task6 description',
    order: '0',
    columnId: columns[0].id,
    boardId: boards[1].id,
    userId: users[1].id
  })
];

const getAllByUserId = async id => {
  return tasks.filter(task => task.userId === id);
};

const getAllByBoardId = async id => {
  return tasks.filter(task => task.boardId === id);
};

const getByBoardAndTaskId = async (boardId, taskId) => {
  return tasks.find(task => {
    return task.boardId === boardId && task.id === taskId;
  });
};

const add = async ({
  title,
  order,
  description,
  userId,
  boardId,
  columnId
}) => {
  const task = new Task({
    title,
    order,
    description,
    userId,
    boardId,
    columnId
  });
  tasks.push(task);
  return task;
};

const deleteById = async id => {
  const taskToDelete = getById(id);
  if (taskToDelete) {
    tasks.splice(
      tasks.findIndex(task => task.id === id),
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
  columnId
}) => {
  const task = await getByBoardAndTaskId(boardId, taskId);
  console.log('found task', task);
  if (task) {
    task.title = title;
    task.order = order;
    task.description = description;
    task.userId = userId;
    task.boardId = boardId;
    task.columnId = columnId;
  }
  console.log('changed task', task);

  return task;
};

module.exports = {
  getAllByBoardId,
  getByBoardAndTaskId,
  editByBoardAndTaskId,
  deleteById,
  add,
  getAllByUserId
};
