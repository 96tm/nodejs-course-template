import express from 'express';
import * as tasksService from './task.service';
import { StatusCodes } from 'http-status-codes';
import { ErrorHandler, CustomError } from '../../error-handling/ErrorHandler';

const wrapRoute = ErrorHandler.wrapRoute;
const router = express.Router();

router.route('/:id/tasks').get(
  wrapRoute(async (req, res) => {
    const { id } = req.params as { id: string };
    const tasks = await tasksService.getAllByBoardId(id);
    res.json(tasks);
  })
);

router.route('/:boardId/tasks/:taskId').get(
  wrapRoute(async (req, res) => {
    const { boardId, taskId } = req.params as {
      boardId: string;
      taskId: string;
    };
    const task = await tasksService.getByBoardAndTaskId(boardId, taskId);
    if (task) {
      res.json(task);
    } else {
      throw new CustomError(StatusCodes.NOT_FOUND, 'Task not found');
    }
  })
);

router.route('/:boardId/tasks/:taskId').put(
  wrapRoute(async (req, res) => {
    const { boardId, taskId } = req.params;
    const task = await tasksService.editByBoardAndTaskId({
      ...req.body,
      taskId,
      boardId,
    });
    if (task) {
      res.json(task);
    } else {
      throw new CustomError(StatusCodes.NOT_FOUND, 'Task not found');
    }
  })
);

router.route('/:boardId/tasks/:taskId').delete(
  wrapRoute(async (req, res) => {
    const { boardId, taskId } = req.params as {
      boardId: string;
      taskId: string;
    };
    const task = await tasksService.getByBoardAndTaskId(boardId, taskId);
    if (task) {
      tasksService.deleteById(task.id);
      res.json(task);
    } else {
      throw new CustomError(StatusCodes.NOT_FOUND, 'Task not found');
    }
  })
);

router.route('/:id/tasks').post(
  wrapRoute(async (req, res) => {
    const { id } = req.params;
    const task = await tasksService.add({
      ...req.body,
      boardId: id,
    });
    res.status(StatusCodes.CREATED).json(task);
  })
);

export { router };
