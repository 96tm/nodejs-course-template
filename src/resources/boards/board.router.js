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

router.route('/:boardId/tasks/:taskId').put(async (req, res) => {
  const { boardId, taskId } = req.params;
  const { title, order, description, userId, newBoardId, columnId } = req.body;
  const result = await tasksService.editByBoardAndTaskId({
    boardId,
    taskId,
    title,
    order,
    description,
    userId,
    newBoardId,
    columnId
  });
  if (result.status === 200) {
    res.json(result.task);
  } else if (result.status === 404) {
    res.status(404).json('Task not found');
  } else {
    res.status(400).json('Wrong parameters');
  }
});

router.route('/').post(async (req, res) => {
  const { title, columns } = req.body;
  // if (!title) {
  //   res.status(400).json({});
  // }
  const board = new Board({ title, columns });
  boardsService.addBoard(board);
  res.status(201).json(board);
});

router.route('/:id/tasks').post(async (req, res) => {
  const { id } = req.params;
  const { title, order, description, userId, columnId } = req.body;
  const task = await tasksService.add({
    title,
    order,
    description,
    userId,
    boardId: id,
    columnId
  });
  res.status(201).json(task);
});

router.route('/:id').put(async (req, res) => {
  const { id } = req.params;
  const { title, columns } = req.body;
  const board = await boardsService.editById(id, title, columns);
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
    const taskIds = (await tasksService.getAllByBoardId(id)).map(
      task => task.id
    );
    await taskIds.forEach(taskId => {
      tasksService.deleteById(taskId);
    });
    res.status(204).json('Board deleted');
  } else {
    res.status(404).json('Board not found');
  }
});

module.exports = router;
