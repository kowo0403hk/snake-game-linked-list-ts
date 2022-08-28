import { randomNumGenerator } from "./math";

// initial starting point of the snake
export const initiateSnakeBody = (canvas: number[][]) => {
  const rowSize = canvas.length;
  const colSize = canvas[0].length;
  const startingRow = Math.round(rowSize / 3);
  const startingCol = Math.round(colSize / 3);
  const startingCell = canvas[startingRow][startingCol];

  const initialSnakeBody = {
    row: startingRow,
    col: startingCol,
    cell: startingCell,
  };

  return initialSnakeBody;
};

// movement of the snake
interface ICoords {
  row: number;
  col: number;
}

export const getNewNodeCoords = (coords: ICoords, direction: string) => {
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

  return {
    row: coords.row,
    col: coords.col - 1,
  };
};

// consumption of apple
export const setNewAppleLocation = (
  CANVAS_SIZE: number,
  snakeCells: Set<number>,
  appleCell: number,
  setAppleCell: React.Dispatch<any>
) => {
  const maxPossibleCellValue = CANVAS_SIZE * CANVAS_SIZE;

  let nextAppleCell: number;

  while (true) {
    nextAppleCell = randomNumGenerator(1, maxPossibleCellValue);

    if (snakeCells.has(nextAppleCell) || appleCell === nextAppleCell) continue;
    break;
  }

  setAppleCell(nextAppleCell);
};

// snake hits wall
export const snakeHitsWall = (coords: ICoords, canvas: number[][]) => {
  const { row, col } = coords;

  // up and left wall
  if (row < 0 || col < 0) return true;

  // down and right wall
  if (row > canvas.length || col > canvas[0].length) return true;

  return false;
};
