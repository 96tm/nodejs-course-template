import express from 'express';
import * as tasksService from './task.service';

const router = express.Router();

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

router.route('/:id/tasks').post(async (req, res) => {
  const { id } = req.params;
  const task = await tasksService.add({
    ...req.body,
    boardId: id,
  });
  res.status(201).json(task);
});

export { router };
