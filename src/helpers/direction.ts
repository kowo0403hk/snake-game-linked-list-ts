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
