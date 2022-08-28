import { useEffect } from "react";
import { FC, useState } from "react";
import styled from "styled-components";
import Canvas from "./components/Canvas";
import PlayerBoard from "./components/PlayerBoard";

const Container = styled.div`
  text-align: center;
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 1vmin);
  color: white;
`;

interface IDifficulty {
  LEVEL: string;
  CANVAS_SIZE: number;
  REVERSE_PROB: number;
}

const App: FC = () => {
  const [score, setScore] = useState(0);

  const [highScore, setHighScore] = useState(0);

  // game start or end mechanism
  const [gameStart, setGameStart] = useState(false);

  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
    }
  }, [score, highScore]);

  const [difficulty, setDifficulty] = useState<IDifficulty>({
    LEVEL: "NORMAL",
    CANVAS_SIZE: 10,
    REVERSE_PROB: 0.4,
  });

  const { CANVAS_SIZE, REVERSE_PROB } = difficulty;

  return (
    <Container>
      <Canvas
        score={score}
        setScore={setScore}
        CANVAS_SIZE={CANVAS_SIZE}
        REVERSE_PROB={REVERSE_PROB}
        gameStart={gameStart}
        setGameStart={setGameStart}
        gameOver={gameOver}
        setGameOver={setGameOver}
      />
      <PlayerBoard
        difficulty={difficulty}
        setDifficulty={setDifficulty}
        setGameStart={setGameStart}
        setGameOver={setGameOver}
        setScore={setScore}
      />
    </Container>
  );
};

export default App;
