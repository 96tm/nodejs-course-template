import * as tasksRepo from './task.repository';
import { TaskParameters, EditTaskParameters } from './task.model';
import Task from '../../entity/Task';

const getAllByUserId: (id: string) => Promise<Task[]> = (id) =>
  tasksRepo.getAllByUserId(id);

const getAllByBoardId: (id: string) => Promise<Task[]> = (id) =>
  tasksRepo.getAllByBoardId(id);

const add: ({
  title,
  order,
  description,
  userId,
  boardId,
  columnId,
}: TaskParameters) => Promise<Task> = ({
  title,
  order,
  description,
  userId,
  boardId,
  columnId,
}) =>
  tasksRepo.add({
    title,
    order,
    description,
    userId,
    boardId,
    columnId,
  });

const deleteTask: (id: string, boardId: string) => Promise<Task | null> = (
  id,
  boardId
) => tasksRepo.deleteTask(id, boardId);

const getByBoardAndTaskId: (
  boardId: string | null,
  taskId: string
) => Promise<Task | null> = (boardId, taskId) =>
  tasksRepo.getByBoardAndTaskId(boardId, taskId);

const update: ({
  boardId,
  taskId,
  title,
  order,
  description,
  userId,
  columnId,
}: EditTaskParameters) => Promise<Task | null> = async ({
  boardId,
  taskId,
  title,
  order,
  description,
  userId,
  columnId,
}) =>
  tasksRepo.update({
    boardId,
    taskId,
    title,
    order,
    description,
    userId,
    columnId,
  });

export {
  getAllByBoardId,
  getByBoardAndTaskId,
  update,
  deleteTask,
  add,
  getAllByUserId,
};
