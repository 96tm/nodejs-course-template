const Task = require('./task.model');
const Column = require('../columns/column.model');
const { boards } = require('../boards/board.memory.repository');
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
    title: 'Task2',
    description: 'Task1 description',
    order: '0',
    columnId: columns[1].id,
    boardId: boards[0].id,
    userId: users[1].id
  }),
  new Task({
    title: 'Task3',
    description: 'Task1 description',
    order: '0',
    columnId: columns[0].id,
    boardId: boards[2].id,
    userId: users[2].id
  }),
  new Task({
    title: 'Task4',
    description: 'Task1 description',
    order: '0',
    columnId: columns[1].id,
    boardId: boards[1].id,
    userId: users[0].id
  }),
  new Task({
    title: 'Task5',
    description: 'Task1 description',
    order: '0',
    columnId: columns[1].id,
    boardId: boards[0].id,
    userId: users[1].id
  }),
  new Task({
    title: 'Task6',
    description: 'Task1 description',
    order: '0',
    columnId: columns[0].id,
    boardId: boards[1].id,
    userId: users[1].id
  })
];

const getAllByBoardId = tasks;

module.exports = { getAllByBoardId };
