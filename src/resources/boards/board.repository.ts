import 'reflect-metadata';

import { getRepository } from 'typeorm';

import Board from '../../entity/Board';

import { IColumn } from '../../common/types';
import Column from '../../entity/Column';

const getAll: () => Promise<Board[]> = async () => {
  const repository = getRepository(Board);
  return repository.find({ where: {} });
};

const add: (
  title: string,
  columns: Partial<IColumn[]>
) => Promise<Board> = async (title, columns) => {
  console.log('inside add repo');

  const repository = getRepository(Board);
  const columnRepository = getRepository(Column);
  const boardModel = new Board();
  boardModel.title = title;
  const createdBoard = repository.create(boardModel);

  for (let i = 0; i < columns.length; i += 1) {
    console.log('loop start i=', i);

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
  console.log('repo in get', result);

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
  console.log('got params', id, title, columns);

  if (board) {
    board.title = title;
    const columnRepository = getRepository(Column);
    for (let i = 0; i < columns.length; i++) {
      console.log('update loop begin i=', i, columns[i]);

      const column = await columnRepository.findOne({
        id: String(columns[i]?.id),
      });

      // const column = await columnRepository
      //   .createQueryBuilder()
      //   .select('*')
      //   .from(Column, 'column')
      //   .where('column.id = :id', { id: String(columns[i]?.id) })
      //   .getOne();

      if (column !== undefined) {
        console.log('update loop found col i=', i);

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
    // return repository.findOne({
    //   where: { id: board.id },
    //   relations: ['columns'],
    // }) as Promise<Board>;
  }
  return Promise.resolve(null);
};

const deleteBoard: (id: string) => Promise<Board | null> = async (id) => {
  const repository = getRepository(Board);
  console.log('break');
  const board = await repository.findOne({
    where: { id: id },
    relations: ['columns'],
  });
  console.log('board is', board);
  const result = new Board();
  result.id = String(board?.id);
  result.title = String(board?.title);
  result.columns = board?.columns || [];
  if (board) {
    await repository.remove(board);
    console.log('DELETED&', result);
    return Promise.resolve(result);
  }
  return Promise.resolve(null);
};

export { getAll, add, getById, update, deleteBoard };
