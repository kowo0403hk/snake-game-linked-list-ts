import { LinkedList } from "./linked-listClasses";

export const initiateSnakeBody = (canvas: number[][]) => {
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

interface ICoords {
  row: number;
  col: number;
}

export const moveSnake = (snake: LinkedList, direction: string) => {
  const currentHeadCoords: ICoords = {
    row: snake.head.value.row,
    col: snake.head.value.col,
  };

  const nextHeadCoords = getCoordsInDirection(currentHeadCoords, direction);
};

const getCoordsInDirection = (coords: ICoords, direction: string) => {
  if (direction === "UP") {
    return {
      row: coords.row - 1,
      col: coords.col,
    };
  }
  if (direction === "RIGHT") {
    return {
      row: coords.row,
      col: coords.col + 1,
    };
  }
  if (direction === "DOWN") {
    return {
      row: coords.row + 1,
      col: coords.col,
    };
  }
  if (direction === "LEFT") {
    return {
      row: coords.row,
      col: coords.col - 1,
    };
  }
};
