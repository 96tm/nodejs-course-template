import Board from './board.model';

// const getAll: () => Promise<Board[]> = async () => boards;

// const addBoard: (board: Board) => Promise<void> = async (board) => {
//   boards.push(board);
// };

// const getById: (id: string) => Promise<Board | undefined> = async (id) =>
//   boards.find((board) => board.id === id);

// const editById: (
//   id: string,
//   title: string,
//   columns: Column[]
// ) => Promise<Board | undefined> = async (id, title, columns) => {
//   const board = await getById(id);
//   if (board) {
//     board.title = title;
//     if (columns) {
//       columns.forEach((currentColumn) => {
//         const { id: colId, title: colTitle, order } = currentColumn;
//         const column = new Column({ id: colId, title: colTitle, order });
//         if (!board.columns.find((col) => col.id === colId)) {
//           board.columns.push(column);
//         }
//       });
//     }
//   }
//   return board;
// };

// const deleteById: (id: string) => Promise<Board | undefined> = async (id) => {
//   const boardToDelete = await getById(id);
//   if (boardToDelete) {
//     boards.splice(
//       boards.findIndex((board) => board.id === id),
//       1
//     );
//   }
//   return boardToDelete;
// };

// export { getAll, addBoard, getById, editById, deleteById, boards };
