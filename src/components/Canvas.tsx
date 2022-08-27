import { FC, useState } from "react";
import styled from "styled-components";
import { Node, SinglyLinkedList } from "../helpers/linked-listClasses";
import { createMatrix } from "../helpers/matrixCreation";

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

const CANVAS_SIZE = 10;

const Canvas: FC = () => {
  // creating a a 10x10 2D array
  const [canvas, setCanvas] = useState(createMatrix(CANVAS_SIZE));

  // determine if the cell should change its color based on
  const [cell, setCell] = useState(new Set([45]));

  // contains the snake body
  const [snake, setSnake] = useState(new SinglyLinkedList(45));

  // create the rows and cells for the canvas
  const mappedCanvas = canvas.map((row, rowIndex) => {
    return (
      <Row key={rowIndex}>
        {row.map((cellValue, cellIndex) => {
          return (
            <Cell
              key={cellIndex}
              className={`${cell.has(cellValue) ? "snake-cell" : ""}`}
            >
              {cellValue}
            </Cell>
          );
        })}
      </Row>
    );
  });

  return <CanvasContainer>{mappedCanvas}</CanvasContainer>;
};

export default Canvas;
