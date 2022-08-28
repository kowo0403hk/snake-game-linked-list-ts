import { FC, useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { LinkedList, Node } from "../helpers/linked-listClasses";
import { createMatrix } from "../helpers/matrixCreation";
import {
  getDirectionFromKey,
  DIRECTION,
  getOppositeDirection,
} from "../helpers/direction";
import {
  initiateSnakeBody,
  setNewAppleLocation,
  getNewNodeCoords,
  snakeHitsWall,
  reverseSnake,
} from "../helpers/gameLogic";

import { useInterval } from "../hooks/useInterval";

const Container = styled.div``;

const Score = styled.h1``;

const CanvasContainer = styled.div`
  outline: 2px solid rgb(134, 154, 189);
`;

const Row = styled.div`
  height: 50px;
`;

// the props.backgroundColor determines the cell has snake body(green), food(red), or nothing (null)
const Cell = styled.div`
  width: 50px;
  height: 50px;
  outline: 1px solid rgb(134, 154, 189);
  display: inline-block;

  &.cell-green {
    background-color: green;
  }
  &.cell-red {
    background-color: red;
  }
  &.cell-purple {
    background-color: purple;
  }
`;

interface IDifficulty {
  LEVEL: string;
  CANVAS_SIZE: number;
  REVERSE_PROP: number;
}

const Canvas: FC = () => {
  const [score, setScore] = useState(0);

  const [difficulty, setDifficulty] = useState<IDifficulty>({
    LEVEL: "Normal",
    CANVAS_SIZE: 10,
    REVERSE_PROP: 0.4,
  });

  const { LEVEL, CANVAS_SIZE, REVERSE_PROP } = difficulty;

  // creating a a 10x10 2D array
  const canvas = createMatrix(CANVAS_SIZE);

  // contains the snake body
  const [snake, setSnake] = useState(new LinkedList(initiateSnakeBody(canvas)));

  // determine if the cell should change its color based on
  const [snakeCells, setSnakeCells] = useState(
    new Set([snake.head.value.cell])
  );
  const [appleCell, setAppleCell] = useState(
    snake.head.value.cell + Math.floor(Math.random() * 10)
  );

  // handle the movement direction
  const [direction, setDirection] = useState(DIRECTION.RIGHT);

  const [reverseApple, setReverseApple] = useState(false);

  const handleKeydown = (e: KeyboardEvent) => {
    const newDirection = getDirectionFromKey(e.key);
    const isValidDirection = newDirection !== "";

    // ignore if user presses any keys other than arrow keys
    if (!isValidDirection) return;

    const isOppositeDirection =
      getOppositeDirection(direction) === newDirection && snakeCells.size > 1;

    if (!isOppositeDirection) {
      setDirection(newDirection);
    } else {
      setDirection(direction);
    }
  };

  useInterval(() => {
    // somehow cannot use useEffect to set the event listener. The direction and snakeCells would never been updated if that's in a useEffect hook
    window.addEventListener("keydown", (e: KeyboardEvent) => {
      handleKeydown(e);
    });
    moveSnake();
  }, 150);

  const moveSnake = () => {
    const currentHeadCoords = {
      row: snake.head.value.row,
      col: snake.head.value.col,
    };

    // get the coords (row, col) of the next cell based on key input
    const nextHeadCoords = getNewNodeCoords(currentHeadCoords, direction);

    // if snake hits the wall, game over
    if (snakeHitsWall(nextHeadCoords, canvas)) {
      handleGameOver();
      return;
    }

    // get the value of the cell
    const nextHeadCell = canvas[nextHeadCoords.row][nextHeadCoords.col];

    // if snake head encounters a cell which contains its body, game over
    if (snakeCells.has(nextHeadCell)) {
      handleGameOver();
      return;
    }

    // create a new head for the linked list
    const newHead = new Node({
      row: nextHeadCoords.row,
      col: nextHeadCoords.col,
      cell: nextHeadCell,
    });

    // add new head to the linked list
    snake.unshift(newHead);

    // update snakeCells set as the snake moves (add new head to Set and delete tail from Set)
    const newSnakeCells = new Set(snakeCells);
    newSnakeCells.add(nextHeadCell);

    // handle apple consumption on the move
    const appleIsConsumed = nextHeadCell === appleCell;

    if (appleIsConsumed) {
      if (reverseApple) reverseSnake(snake, direction, setDirection);
      setNewAppleLocation(
        CANVAS_SIZE,
        newSnakeCells,
        appleCell,
        setAppleCell,
        setReverseApple,
        setScore
      );
    } else {
      // it means the snake is just moving without growing its body, we need to pop of its tail when it moves because new head will keep adding
      // delete before popping of the tail
      newSnakeCells.delete(snake.tail.value.cell);
      snake.pop();
    }

    setSnakeCells(newSnakeCells);
  };

  const handleGameOver = () => {};

  const getClassName = (
    cellValue: number,
    appleCell: number,
    reverseApple: boolean,
    snakeCells: Set<number>
  ) => {
    let className = "";

    if (cellValue === appleCell) {
      if (reverseApple) {
        className = "cell-purple";
      } else {
        className = "cell-red";
      }
    }

    if (snakeCells.has(cellValue)) {
      className = "cell-green";
    }
    return className;
  };

  // create the rows and cells for the canvas
  const mappedCanvas = canvas.map((row, rowIndex) => {
    return (
      <Row key={rowIndex}>
        {row.map((cellValue, cellIndex) => {
          const className = getClassName(
            cellValue,
            appleCell,
            reverseApple,
            snakeCells
          );
          return (
            <Cell key={cellIndex} className={className}>
              {cellValue}
            </Cell>
          );
        })}
      </Row>
    );
  });

  return (
    <Container>
      <Score>Score: {score}</Score>
      <CanvasContainer>{mappedCanvas}</CanvasContainer>
    </Container>
  );
};

export default Canvas;
