import express from 'express';
import Board from './board.model';
import * as boardsService from './board.service';
import * as tasksService from '../tasks/task.service';

const router = express.Router();

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
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
});

router.route('/:boardId/tasks/:taskId').delete(async (req, res) => {
  const { boardId, taskId } = req.params;
  const task = await tasksService.getByBoardAndTaskId(boardId, taskId);
  if (task) {
    tasksService.deleteById(task.id);
    res.json(task);
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
});

router.route('/').post(async (req, res) => {
  const { title, columns } = req.body;
  const board = new Board({ title, columns });
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
  } else {
    res.status(404).json({});
  }
});

router.route('/:id').delete(async (req, res) => {
  const { id } = req.params;
  const board = await boardsService.deleteById(id);
  if (board) {
    const taskIds = (await tasksService.getAllByBoardId(id)).map(
      (task) => task.id
    );
    await taskIds.forEach((taskId) => {
      tasksService.deleteById(taskId);
    });
    res.status(204).json({ message: 'Board deleted' });
  } else {
    res.status(404).json({ message: 'Board not found' });
  }
});

export { router };
