"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
const uuid_1 = require("uuid");
class Task {
    constructor({ id = uuid_1.v4(), title = 'TASK', order = '0', description = 'Description', userId = null, boardId = null, columnId = null, }) {
        this.userId = null;
        this.boardId = null;
        this.columnId = null;
        this.id = id;
        this.title = title;
        this.order = order;
        this.description = description;
        this.userId = userId;
        this.boardId = boardId;
        this.columnId = columnId;
    }
}
exports.Task = Task;
