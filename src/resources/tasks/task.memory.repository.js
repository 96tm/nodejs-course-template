const Task = require('./task.model');

const tasks = [
  new Task({ title: 'Task1', description: 'Task1 description', order: '0' }),
  new Task({ title: 'Task2', description: 'Task1 description', order: '0' }),
  new Task({ title: 'Task3', description: 'Task1 description', order: '0' }),
  new Task({ title: 'Task4', description: 'Task1 description', order: '0' }),
  new Task({ title: 'Task5', description: 'Task1 description', order: '0' }),
  new Task({ title: 'Task6', description: 'Task1 description', order: '0' })
];

const getAllByBoardId = tasks;

module.exports = { getAllByBoardId };
