const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');
const tasksService = require('../tasks/task.service');

router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAll();
  res.json(boards);
});

router.route('/:id').get(async (req, res) => {
  const { id } = req.params;
  const board = await boardsService.getById(id);
  if (board) {
    res.json(board);
  } else {
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
  } else {
    res.status(404).json('Task not found');
  }
});

router.route('/').post(async (req, res) => {
  const { title, columns } = req.body;
  if (!title) {
    res.status(400).json({});
  }
  const board = new Board({ title, columns });
  boardsService.addBoard(board);
  res.status(201).json(board);
});

router.route('/:boardId').put(async (req, res) => {
  const { boardId } = req.params;
  const { boardTitle, columns } = req.body;
  const board = await boardsService.editById(boardId, boardTitle, columns);
  if (board) {
    res.json(board);
  } else {
    res.status(404).json({});
  }
});

router.route('/:id').delete(async (req, res) => {
  const { id } = req.params;
  const board = await boardsService.deleteById(id);
  if (board) {
    res.status(204).json(board);
  } else {
    res.status(404).json('Board not found');
  }
});

module.exports = router;
