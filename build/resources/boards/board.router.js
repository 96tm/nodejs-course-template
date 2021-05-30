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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const board_model_1 = __importDefault(require("./board.model"));
const boardsService = __importStar(require("./board.service"));
const tasksService = __importStar(require("../tasks/task.service"));
const router = express_1.default.Router();
exports.router = router;
router.route('/').get(async (req, res) => {
    const boards = await boardsService.getAll();
    res.json(boards);
});
router.route('/:id').get(async (req, res) => {
    const { id } = req.params;
    const board = await boardsService.getById(id);
    if (board) {
        res.json(board);
    }
    else {
        res.status(404).json({});
    }
});
router.route('/:id/tasks').get(async (req, res) => {
    const { id } = req.params;
    const tasks = await tasksService.getAllByBoardId(id);
    res.json(tasks);
});
router.route('/:boardId/tasks/:taskId').get(async (req, res) => {
    const { boardId, taskId } = req.params;
    const task = await tasksService.getByBoardAndTaskId(boardId, taskId);
    if (task) {
        res.json(task);
    }
    else {
        res.status(404).json({ message: 'Task not found' });
    }
});
router.route('/:boardId/tasks/:taskId').put(async (req, res) => {
    const { boardId, taskId } = req.params;
    const task = await tasksService.editByBoardAndTaskId({
        ...req.body,
        taskId,
        boardId,
    });
    if (task) {
        res.json(task);
    }
    else {
        res.status(404).json({ message: 'Task not found' });
    }
});
router.route('/:boardId/tasks/:taskId').delete(async (req, res) => {
    const { boardId, taskId } = req.params;
    const task = await tasksService.getByBoardAndTaskId(boardId, taskId);
    if (task) {
        tasksService.deleteById(task.id);
        res.json(task);
    }
    else {
        res.status(404).json({ message: 'Task not found' });
    }
});
router.route('/').post(async (req, res) => {
    const { title, columns } = req.body;
    const board = new board_model_1.default({ title, columns });
    boardsService.addBoard(board);
    res.status(201).json(board);
});
router.route('/:id/tasks').post(async (req, res) => {
    const { id } = req.params;
    const task = await tasksService.add({
        ...req.body,
        boardId: id,
    });
    res.status(201).json(task);
});
router.route('/:id').put(async (req, res) => {
    const { id } = req.params;
    const { title, columns } = req.body;
    const board = await boardsService.editById(id, title, columns);
    if (board) {
        res.json(board);
    }
    else {
        res.status(404).json({});
    }
});
router.route('/:id').delete(async (req, res) => {
    const { id } = req.params;
    const board = await boardsService.deleteById(id);
    if (board) {
        const taskIds = (await tasksService.getAllByBoardId(id)).map((task) => task.id);
        await taskIds.forEach((taskId) => {
            tasksService.deleteById(taskId);
        });
        res.status(204).json({ message: 'Board deleted' });
    }
    else {
        res.status(404).json({ message: 'Board not found' });
    }
});
