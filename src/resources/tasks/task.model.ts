import { v4 as uuid } from 'uuid';

type TaskParameters = {
  id?: string;
  title: string;
  order: string;
  description: string;
  userId: string | null;
  boardId: string | null;
  columnId: string | null;
};

type EditTaskParameters = {
  id?: string;
  title: string;
  taskId: string;
  order: string;
  description: string;
  userId: string | null;
  boardId: string;
  columnId: string | null;
};
class Task {
  id: string;

  title: string;

  order: string;

  description: string;

  userId: string | null = null;

  boardId: string | null = null;

  columnId: string | null = null;

  constructor({
    id = uuid(),
    title = 'TASK',
    order = '0',
    description = 'Description',
    userId = null,
    boardId = null,
    columnId = null,
  }: TaskParameters) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }
}

export { Task, TaskParameters, EditTaskParameters };
