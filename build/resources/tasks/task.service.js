"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllByUserId = exports.add = exports.deleteById = exports.editByBoardAndTaskId = exports.getByBoardAndTaskId = exports.getAllByBoardId = void 0;
const tasksRepo = __importStar(require("./task.memory.repository"));
const getAllByUserId = (id) => tasksRepo.getAllByUserId(id);
exports.getAllByUserId = getAllByUserId;
const getAllByBoardId = (id) => tasksRepo.getAllByBoardId(id);
exports.getAllByBoardId = getAllByBoardId;
const add = ({ title, order, description, userId, boardId, columnId, }) => tasksRepo.add({
    title,
    order,
    description,
    userId,
    boardId,
    columnId,
});
exports.add = add;
const deleteById = (id) => tasksRepo.deleteById(id);
exports.deleteById = deleteById;
const getByBoardAndTaskId = (boardId, taskId) => tasksRepo.getByBoardAndTaskId(boardId, taskId);
exports.getByBoardAndTaskId = getByBoardAndTaskId;
const editByBoardAndTaskId = async ({ boardId, taskId, title, order, description, userId, columnId, }) => tasksRepo.editByBoardAndTaskId({
    boardId,
    taskId,
    title,
    order,
    description,
    userId,
    columnId,
});
exports.editByBoardAndTaskId = editByBoardAndTaskId;
