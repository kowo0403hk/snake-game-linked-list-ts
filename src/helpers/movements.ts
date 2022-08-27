import { SinglyLinkedList } from "./linked-listClasses";

export const getStartingSnakeLLValue = (canvas: number[][]) => {
  const rowSize = canvas.length;
  const colSize = canvas[0].length;
  const startingRow = Math.round(rowSize / 3);
  const startingCol = Math.round(colSize / 3);
  const startingCell = canvas[startingRow][startingCol];

  return {
    row: startingRow,
    col: startingCol,
    cell: startingCell,
  };
};

export const moveSnake = (snake: SinglyLinkedList) => {
  const currentHeadCoords = {
    row: snake.head.value.row,
    col: snake.head.value.col,
  };
};
