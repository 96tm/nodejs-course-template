"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllByUserId = exports.add = exports.deleteById = exports.editByBoardAndTaskId = exports.getByBoardAndTaskId = exports.getAllByBoardId = void 0;
const task_model_1 = require("./task.model");
const tasks = [];
const getAllByUserId = async (id) => tasks.filter((task) => task.userId === id);
exports.getAllByUserId = getAllByUserId;
const getAllByBoardId = async (id) => tasks.filter((task) => task.boardId === id);
exports.getAllByBoardId = getAllByBoardId;
const getByBoardAndTaskId = async (boardId, taskId) => tasks.find((task) => task.boardId === boardId && task.id === taskId);
exports.getByBoardAndTaskId = getByBoardAndTaskId;
const add = async ({ title, order, description, userId, boardId, columnId, }) => {
    const task = new task_model_1.Task({
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
exports.add = add;
const deleteById = async (id) => {
    tasks.splice(tasks.findIndex((task) => task.id === id), 1);
};
exports.deleteById = deleteById;
const editByBoardAndTaskId = async ({ boardId, taskId, title, order, description, userId, columnId, }) => {
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
exports.editByBoardAndTaskId = editByBoardAndTaskId;
