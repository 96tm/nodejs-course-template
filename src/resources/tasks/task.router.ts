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
    const task = await tasksService.getByBoardAndTaskId(
      boardId || null,
      taskId
    );

    if (task) {
      res.json({
        id: task.id,
        title: task.title,
        order: task.order,
        description: task.description,
        board: task.board,
        boardId: task.board?.id || null,
        columnId: task?.column?.id || null,
        userId: task?.user?.id || null,
      });
    } else {
      throw new CustomError(StatusCodes.NOT_FOUND, 'Task not found');
    }
  })
);

router.route('/:boardId/tasks/:taskId').put(
  wrapRoute(async (req, res) => {
    const { boardId, taskId } = req.params;
    const task = await tasksService.update({
      ...req.body,
      taskId,
      boardId,
    });
    if (task) {
      const result = {
        description: task.description,
        order: task.order,
        boardId: task?.board?.id,
        columnId: task?.column?.id || null,
        userId: task?.user?.id || null,
        id: String(task.id),
      };
      res.json(result);
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
    const task = tasksService.deleteTask(taskId, boardId);
    if (task) {
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
    const result = {
      description: task.description,
      order: task.order,
      title: task.title,
      boardId: task?.board?.id,
      columnId: task?.column?.id || null,
      userId: task?.user?.id || null,
      id: String(task.id),
    };
    res.status(StatusCodes.CREATED).json(result);
  })
);

export { router };
