import * as boardsRepo from './board.repository';

import Board from '../../entity/Board';

// import Column from '../columns/column.model';

import { IBoard } from '../../common/types';

const getAll: () => Promise<Board[]> = () => boardsRepo.getAll();

const add: (board: Partial<IBoard>) => Promise<Board> = (board) =>
  boardsRepo.add(board);

const getById: (id: string) => Promise<Board | null> = (boardId) =>
  boardsRepo.getById(boardId);

const update: (
  id: string,
  title: string
  // columns: Column[]
) => Promise<Board | null> = (id, title) => boardsRepo.update(id, title); //columns);

const deleteBoard: (id: string) => Promise<Board | null> = (id) =>
  boardsRepo.deleteBoard(id);

export { getAll, add, getById, update, deleteBoard };
