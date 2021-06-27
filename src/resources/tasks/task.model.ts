type TaskParameters = {
  id?: string;
  title: string;
  order: number;
  description: string;
  userId: string | null;
  boardId: string | null;
  columnId: string | null;
};

type EditTaskParameters = {
  id?: string;
  title: string;
  taskId: string;
  order: number;
  description: string;
  userId: string | null;
  boardId: string;
  columnId: string | null;
};

export { TaskParameters, EditTaskParameters };
