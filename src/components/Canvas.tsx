import { FC, useState } from "react";
import styled from "styled-components";

const CanvasContainer = styled.div`
  outline: 2px solid rgb(134, 154, 189);
`;

const Row = styled.div`
  height: 50px;
`;

const Cell = styled.div`
  width: 50px;
  height: 50px;
  outline: 1px solid rgb(134, 154, 189);
  display: inline-block;
`;

const CANVAS_SIZE = 10;

const Canvas: FC = () => {
  // creating a a 10x10 2D array
  const matrix = new Array(CANVAS_SIZE)
    .fill(0)
    .map((row) => new Array(CANVAS_SIZE).fill(0));

  const [canvas, setCanvas] = useState(matrix);

  // create the rows and cells for the canvas
  const mappedCanvas = canvas.map((row, rowIndex) => {
    return (
      <Row key={rowIndex}>
        {row.map((cell, cellIndex) => {
          return <Cell key={cellIndex}></Cell>;
        })}
      </Row>
    );
  });

  return <CanvasContainer>{mappedCanvas}</CanvasContainer>;
};

export default Canvas;
