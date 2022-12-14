import { FC, useState } from "react";
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

const Container = styled.div`
  height: 100vh;
  width: 70vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-right: 4px solid black;
`;

const Score = styled.h1``;

const CanvasContainer = styled.div`
  outline: 5px solid black;
  box-shadow: 10px 10px rgb(80, 80, 80);
`;

const Row = styled.div`
  height: 35px;
`;

// the props.backgroundColor determines the cell has snake body(green), food(red), or nothing (null)
const Cell = styled.div`
  width: 35px;
  height: 35px;
  display: inline-block;
  border-radius: 25%;

  &.cell-snake {
    background-image: linear-gradient(
      to right top,
      #069710,
      #0ea730,
      #16b64a,
      #1dc661,
      #25d679,
      #2ade86,
      #30e694,
      #36eea1,
      #3af1a7,
      #3df3ae,
      #42f6b4,
      #46f8ba
    );
  }
  &.cell-apple {
    background-image: linear-gradient(
      to right,
      rgba(255, 255, 255, 1),
      rgba(230, 5, 118, 1)
    );
    border-radius: 50%;
  }
  &.cell-reverseApple {
    background-image: linear-gradient(
      to right,
      rgba(250, 205, 61, 1),
      rgba(86, 38, 196, 1)
    );
    border-radius: 50%;
  }
`;

interface ICanvas {
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  CANVAS_SIZE: number;
  REVERSE_PROB: number;
  gameStart: boolean;
  setGameStart: React.Dispatch<React.SetStateAction<boolean>>;
  gameOver: boolean;
  setGameOver: React.Dispatch<React.SetStateAction<boolean>>;
}

const Canvas: FC<ICanvas> = ({
  score,
  setScore,
  CANVAS_SIZE,
  REVERSE_PROB,
  gameStart,
  setGameStart,
  gameOver,
  setGameOver,
}: ICanvas) => {
  // creating a 2D array as the canvas
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

  useInterval(
    () => {
      // somehow cannot use useEffect to set the event listener. The direction and snakeCells would never been updated if that's in a useEffect hook
      window.addEventListener("keydown", (e: KeyboardEvent) => {
        handleKeydown(e);
      });
      moveSnake();
    },
    gameStart ? 150 : null
  );

  const moveSnake = () => {
    const currentHeadCoords = {
      row: snake.head.value.row,
      col: snake.head.value.col,
    };

    // get the coords (row, col) of the next cell based on key input
    const nextHeadCoords = getNewNodeCoords(currentHeadCoords, direction);

    if (snakeHitsWall(nextHeadCoords, canvas)) {
      // if snake go out of bound, game over
      console.log("Snake hits the wall!");
      handleGameOver();
      return;
    }

    let nextHeadCell: number | null = null;

    if (
      nextHeadCoords.row < canvas.length &&
      nextHeadCoords.col < canvas[0].length
    ) {
      nextHeadCell = canvas[nextHeadCoords.row][nextHeadCoords.col];
    }

    if (nextHeadCell) {
      // if snake head encounters a cell which contains its body, game over
      if (snakeCells.has(nextHeadCell)) {
        console.log("Snake ate its body!");
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
        if (reverseApple) reverseSnake(snake, setDirection);
        setNewAppleLocation(
          CANVAS_SIZE,
          newSnakeCells,
          appleCell,
          setAppleCell,
          setReverseApple,
          setScore,
          REVERSE_PROB
        );
      } else {
        // it means the snake is just moving without growing its body, we need to pop of its tail when it moves because new head will keep adding
        // delete before popping of the tail
        newSnakeCells.delete(snake.tail.value.cell);
        snake.pop();
      }

      setSnakeCells(newSnakeCells);
    }
  };

  const handleGameOver = () => {
    setGameStart(false);
    setGameOver(true);
    const newSnakeBody = initiateSnakeBody(canvas);
    setSnake(new LinkedList(newSnakeBody));
    setSnakeCells(new Set([newSnakeBody.cell]));
    setAppleCell(newSnakeBody.cell + Math.floor(Math.random() * 10));
    setDirection(DIRECTION.RIGHT);
  };

  const getClassName = (
    cellValue: number,
    appleCell: number,
    reverseApple: boolean,
    snakeCells: Set<number>
  ) => {
    let className = "";

    if (cellValue === appleCell) {
      if (reverseApple) {
        className = "cell-reverseApple";
      } else {
        className = "cell-apple";
      }
    }

    if (snakeCells.has(cellValue)) {
      className = "cell-snake";
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

          return <Cell key={cellIndex} className={className} />;
        })}
      </Row>
    );
  });

  return (
    <Container>
      <Score>Score: {score}</Score>
      {gameOver && <p>Sorry, your snake has died. Your score is {score}.</p>}
      <CanvasContainer>{mappedCanvas}</CanvasContainer>
    </Container>
  );
};

export default Canvas;
