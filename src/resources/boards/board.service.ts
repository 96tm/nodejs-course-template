import * as boardsRepo from './board.repository';

import Board from '../../entity/Board';
import Column from '../../entity/Column';

import { IColumn } from '../../common/types';

const getAll: () => Promise<Board[]> = () => boardsRepo.getAll();

const add: (title: string, columns: Partial<IColumn[]>) => Promise<Board> = (
  title,
  columns
) => boardsRepo.add(title, columns);

const getById: (id: string) => Promise<Board | null> = (boardId) =>
  boardsRepo.getById(boardId);

const update: (
  id: string,
  title: string,
  columns: Column[]
) => Promise<Board | null> = (id, title, columns) =>
  boardsRepo.update(id, title, columns);

const deleteBoard: (id: string) => Promise<Board | null> = (id) =>
  boardsRepo.deleteBoard(id);

export { getAll, add, getById, update, deleteBoard };
