import 'reflect-metadata';

import { getRepository } from 'typeorm';

import Board from '../../entity/Board';
import Column from '../../entity/Column';

import { IColumn } from '../../common/types';

const getAll: () => Promise<Board[]> = async () => {
  const repository = getRepository(Board);
  return repository.find({ where: {} });
};

const add: (
  title: string,
  columns: Partial<IColumn[]>
) => Promise<Board> = async (title, columns) => {
  const repository = getRepository(Board);
  const columnRepository = getRepository(Column);
  const boardModel = new Board();
  boardModel.title = title;
  const createdBoard = repository.create(boardModel);

  for (let i = 0; i < columns.length; i += 1) {
    const column = columns[i] as { title: string; order: number };
    const newColumn = new Column();
    newColumn.title = column.title;
    newColumn.order = column.order;
    newColumn.board = createdBoard;
    await columnRepository.save(newColumn);
  }

  await repository.save(createdBoard);
  return repository.findOne({
    where: { id: createdBoard.id },
    relations: ['columns'],
  }) as Promise<Board>;
};

const getById: (id: string) => Promise<Board | null> = async (id) => {
  const repository = getRepository(Board);
  const result = await repository.findOne({
    where: { id: id },
  });
  if (result) {
    return Promise.resolve(result);
  }
  return Promise.resolve(null);
};

const update: (
  id: string,
  title: string,
  columns: IColumn[]
) => Promise<Board | null> = async (id, title, columns) => {
  const repository = getRepository(Board);
  const board = await repository.findOne({
    where: { id: id },
    relations: ['columns'],
  });
  if (board) {
    board.title = title;
    const columnRepository = getRepository(Column);
    for (let i = 0; i < columns.length; i++) {
      const column = await columnRepository.findOne({
        id: String(columns[i]?.id),
      });
      if (column !== undefined) {
        column.title = String(columns[i]?.title);
        column.order = Number(columns[i]?.order);
        await columnRepository.save(column);
      } else {
        const newColumn = new Column();
        newColumn.id = String(columns[i]?.id);
        newColumn.title = String(columns[i]?.title);
        newColumn.order = Number(columns[i]?.order);
        newColumn.board = board;
        const createdColumn = columnRepository.create(newColumn);
        await columnRepository.save(createdColumn);
      }
    }
    await repository.save(board);
    return Promise.resolve(board);
  }
  return Promise.resolve(null);
};

const deleteBoard: (id: string) => Promise<Board | null> = async (id) => {
  const repository = getRepository(Board);
  const board = await repository.findOne({
    where: { id: id },
    relations: ['columns'],
  });
  const result = new Board();
  result.id = String(board?.id);
  result.title = String(board?.title);
  result.columns = board?.columns || [];
  if (board) {
    await repository.remove(board);
    return Promise.resolve(result);
  }
  return Promise.resolve(null);
};

export { getAll, add, getById, update, deleteBoard };
