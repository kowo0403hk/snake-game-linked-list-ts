import { LinkedList } from "./linked-listClasses";
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

const REVERSE_PROBABILITY = 0.3;

// consumption of apple
export const setNewAppleLocation = (
  CANVAS_SIZE: number,
  snakeCells: Set<number>,
  appleCell: number,
  setAppleCell: React.Dispatch<React.SetStateAction<number>>,
  setReverseApple: React.Dispatch<React.SetStateAction<boolean>>,
  setScore: React.Dispatch<React.SetStateAction<number>>
) => {
  const maxPossibleCellValue = CANVAS_SIZE * CANVAS_SIZE;

  let nextAppleCell: number;

  while (true) {
    nextAppleCell = randomNumGenerator(1, maxPossibleCellValue);

    if (snakeCells.has(nextAppleCell) || appleCell === nextAppleCell) continue;
    break;
  }

  const appleIsReversed = Math.random() < REVERSE_PROBABILITY;

  setAppleCell(nextAppleCell);
  setReverseApple(appleIsReversed); // handle the reverse logic
  setScore((prev) => (prev += 1));
};

// snake hits wall
export const snakeHitsWall = (coords: ICoords, canvas: number[][]) => {
  const { row, col } = coords;

  // currently, it seems like it would not go pass the row < 0 or row > canvas.length

  // up and left wall
  if (row < 0 || col < 0) return true;

  // down and right wall
  if (row > canvas.length - 1 || col > canvas[0].length - 1) return true;

  return false;
};

// reverse snake (linked list) and direction
export const reverseSnake = (
  snake: LinkedList,
  setDirection: React.Dispatch<React.SetStateAction<string>>
) => {
  snake.reverse();

  // after reverse, need to determine the head direction
  if (snake.head.value.col === snake.head.next!.value.col) {
    snake.head.value.row > snake.head.next!.value.row
      ? setDirection("DOWN")
      : setDirection("UP");
  } else if (snake.head.value.row === snake.head.next!.value.row) {
    snake.head.value.col > snake.head.next!.value.col
      ? setDirection("RIGHT")
      : setDirection("LEFT");
  }
};
