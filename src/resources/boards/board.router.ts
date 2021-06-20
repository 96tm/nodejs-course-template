import express from 'express';
import * as boardsService from './board.service';
// import * as tasksService from '../tasks/task.service';
import { StatusCodes } from 'http-status-codes';
import { ErrorHandler, CustomError } from '../../error-handling/ErrorHandler';

const wrapRoute = ErrorHandler.wrapRoute;

const router = express.Router();

router.route('/').get(
  wrapRoute(async (req, res) => {
    const boards = await boardsService.getAll();
    res.json(boards);
  })
);

router.route('/:id').get(
  wrapRoute(async (req, res, next) => {
    const id = req.params['id'] as string;
    const board = await boardsService.getById(id as string);
    if (board) {
      res.json(board);
    } else {
      throw new CustomError(StatusCodes.NOT_FOUND, 'Board not found');
    }
  })
);

router.route('/').post(
  wrapRoute(async (req, res) => {
    const { title, columns } = req.body;
    const board = await boardsService.add(title, columns);
    res.status(StatusCodes.CREATED).json(board);
  })
);

router.route('/:id').put(
  wrapRoute(async (req, res) => {
    const id = req.params['id'] as string;
    const { title, columns } = req.body;
    const board = await boardsService.update(id, title, columns);
    if (board) {
      res.json(board);
    } else {
      throw new CustomError(StatusCodes.NOT_FOUND, 'Board updated');
    }
  })
);

router.route('/:id').delete(
  wrapRoute(async (req, res) => {
    const id = req.params['id'] as string;
    const board = await boardsService.deleteBoard(id);
    if (board) {
      res
        .status(StatusCodes.NO_CONTENT)
        .json({ message: 'Board deleted', board });
    } else {
      throw new CustomError(StatusCodes.NOT_FOUND, 'Board not found');
    }
  })
);

export { router };
