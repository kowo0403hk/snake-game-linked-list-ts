import React from "react";
import { randomNumGenerator } from "./math";

export const handleAppleConsumption = (
  CANVAS_SIZE: number,
  snakeCells: Set<number>,
  foodCell: number,
  setAppleCell: React.Dispatch<any>
) => {
  const maxPossibleCellValue = CANVAS_SIZE * CANVAS_SIZE;

  let nextAppleCell: number;

  while (true) {
    nextAppleCell = randomNumGenerator(1, maxPossibleCellValue);

    if (snakeCells.has(nextAppleCell) || foodCell === nextAppleCell) continue;
    break;
  }

  setAppleCell(nextAppleCell);
};
