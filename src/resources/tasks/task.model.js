const uuid = require('uuid');

class Task {
  constructor({
    id = uuid(),
    title = 'TASK',
    order = '0',
    description = 'Description',
    userId = null,
    columnId = null,
    boardId = null
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.columnId = columnId;
    this.boardId = boardId;
  }
}

module.exports = Task;
