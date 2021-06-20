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
    console.log('router in get', board);

    if (board) {
      res.json(board);
    } else {
      throw new CustomError(StatusCodes.NOT_FOUND, 'Board not found');
    }
  })
);

router.route('/').post(
  wrapRoute(async (req, res) => {
    console.log('inside add router');

    const { title, columns } = req.body;
    const board = await boardsService.add(title, columns);
    console.log('again in router, got', board, board.columns);

    res.status(StatusCodes.CREATED).json(board);
  })
);

router.route('/:id').put(
  wrapRoute(async (req, res) => {
    const id = req.params['id'] as string;
    const { title, columns } = req.body;
    const board = await boardsService.update(id, title, columns);
    console.log('got board in router', board);

    if (board) {
      // board.title = 'Autotest board';
      console.log('got board in router', board);
    }
    if (board) {
      console.log('board json', JSON.stringify(board));

      res.json(board);
    } else {
      throw new CustomError(StatusCodes.NOT_FOUND, 'Board updated');
    }
  })
);

router.route('/:id').delete(
  wrapRoute(async (req, res) => {
    console.log('in router start');

    const id = req.params['id'] as string;
    const board = await boardsService.deleteBoard(id);
    console.log('got board form repo', board);

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
