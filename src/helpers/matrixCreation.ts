// canvas creation function
export const createMatrix = (CANVAS_SIZE: number): number[][] => {
  let counter = 1;
  const canvas = [];

  // put number on every cell
  for (let row = 0; row < CANVAS_SIZE; row++) {
    const currentRow = [];

    for (let col = 0; col < CANVAS_SIZE + 2; col++) {
      currentRow.push(counter++);
    }
    canvas.push(currentRow);
  }
  return canvas;
};
