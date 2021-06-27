export interface IBoard {
  id: string;
  title: string;
  columns: IColumn[];
}

export interface IColumn {
  id: string;
  title: string;
  order: number;
}
