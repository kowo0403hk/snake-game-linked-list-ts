// Directions
export const DIRECTION = {
  UP: "UP",
  DOWN: "DOWN",
  LEFT: "LEFT",
  RIGHT: "RIGHT",
};

export const getDirectionFromKey = (key: string) => {
  if (key === "ArrowUp") return DIRECTION.UP;
  if (key === "ArrowDown") return DIRECTION.DOWN;
  if (key === "ArrowLeft") return DIRECTION.LEFT;
  if (key === "ArrowRight") return DIRECTION.RIGHT;
  return "";
};

export const getOppositeDirection = (direction: string) => {
  if (direction === DIRECTION.UP) return DIRECTION.DOWN;
  if (direction === DIRECTION.DOWN) return DIRECTION.UP;
  if (direction === DIRECTION.LEFT) return DIRECTION.RIGHT;
  if (direction === DIRECTION.RIGHT) return DIRECTION.LEFT;
};
