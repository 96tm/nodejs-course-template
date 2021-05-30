import { v4 as uuid } from 'uuid';

type ColumnParameters = { id?: string; title?: string; order?: string };

class Column {
  id: string;

  title: string;

  order: string;

  constructor({
    id = uuid(),
    title = 'Column',
    order = '0',
  }: ColumnParameters) {
    this.id = id;
    this.title = title;
    this.order = order;
  }
}

export default Column;
