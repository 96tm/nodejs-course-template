"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.boards = exports.deleteById = exports.editById = exports.getById = exports.addBoard = exports.getAll = void 0;
const column_model_1 = __importDefault(require("../columns/column.model"));
const boards = [];
exports.boards = boards;
const getAll = async () => boards;
exports.getAll = getAll;
const addBoard = async (board) => {
    boards.push(board);
};
exports.addBoard = addBoard;
const getById = async (id) => boards.find((board) => board.id === id);
exports.getById = getById;
const editById = async (id, title, columns) => {
    const board = await getById(id);
    if (board) {
        board.title = title;
        if (columns) {
            columns.forEach((currentColumn) => {
                const { id: colId, title: colTitle, order } = currentColumn;
                const column = new column_model_1.default({ id: colId, title: colTitle, order });
                if (!board.columns.find((col) => col.id === colId)) {
                    board.columns.push(column);
                }
            });
        }
    }
    return board;
};
exports.editById = editById;
const deleteById = async (id) => {
    const boardToDelete = await getById(id);
    if (boardToDelete) {
        boards.splice(boards.findIndex((board) => board.id === id), 1);
    }
    return boardToDelete;
};
exports.deleteById = deleteById;
