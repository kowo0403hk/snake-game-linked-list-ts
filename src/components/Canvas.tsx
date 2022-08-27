import { FC, useState, useEffect } from "react";
import styled from "styled-components";
import { Node, LinkedList } from "../helpers/linked-listClasses";
import { createMatrix } from "../helpers/matrixCreation";
import { getDirectionFromKey, DIRECTION } from "../helpers/direction";
import { initiateSnakeBody, moveSnake } from "../helpers/movements";
import { handleAppleConsumption } from "../helpers/appleConsumption";
import { useInterval } from "../hooks/useInterval";

const Board = styled.div``;

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

  &.snake-cell {
    background-color: green;
  }
  &.apple-cell {
    background-color: red;
  }
`;

const CANVAS_SIZE = 15;
const REVERSE_PROBABILITY = 0.3;

const Canvas: FC = () => {
  const [score, setScore] = useState(0);

  // creating a a 10x10 2D array
  const [canvas, setCanvas] = useState(createMatrix(CANVAS_SIZE));

  // contains the snake body
  const [snake, setSnake] = useState(new LinkedList(initiateSnakeBody(canvas)));

  // determine if the cell should change its color based on
  const [snakeCells, setSnakeCells] = useState(
    new Set([snake.head.value.cell])
  );
  const [appleCell, setAppleCells] = useState(
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

    const moveOpposite =
      getOppositeDirection(newDirection) === direction && snakeCells.size > 1;

    if (moveOpposite) return;

    setDirection(newDirection);
  };

  useEffect(() => {
    window.addEventListener("keydown", (e: KeyboardEvent) => {
      handleKeydown(e);
    });
  }, []);

  useInterval(() => {
    moveSnake(snake, direction);
  }, 150);

  const handleGameOver = () => {
    setScore(0);
    const newSnakeLLValue = initiateSnakeBody(canvas);
    setSnake(new LinkedList(newSnakeLLValue));
    setAppleCells(
      newSnakeLLValue.head.value.cell + Math.floor(Math.random() * 10)
    );
    setDirection(DIRECTION.RIGHT);
  };

  // create the rows and cells for the canvas
  const mappedCanvas = canvas.map((row, rowIndex) => {
    return (
      <Row key={rowIndex}>
        {row.map((cellValue, cellIndex) => {
          return (
            <Cell
              key={cellIndex}
              className={`${snakeCells.has(cellValue) ? "snake-cell" : ""}`}
            >
              {cellValue}
            </Cell>
          );
        })}
      </Row>
    );
  });

  return (
    <Board>
      <Score>Score: {score}</Score>
      <CanvasContainer>{mappedCanvas}</CanvasContainer>;
    </Board>
  );
};

export default Canvas;
