import { useEffect } from "react";
import { FC, useState } from "react";
import styled from "styled-components";
import Canvas from "./components/Canvas";
import PlayerBoard from "./components/PlayerBoard";

const Container = styled.div`
  background-image: linear-gradient(
    to right bottom,
    #d16ba5,
    #c777b9,
    #ba83ca,
    #aa8fd8,
    #9a9ae1,
    #8aa7ec,
    #79b3f4,
    #69bff8,
    #52cffe,
    #41dfff,
    #46eefa,
    #5ffbf1
  );
  text-align: center;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 1vmin);
  color: black;
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
    CANVAS_SIZE: 14,
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
        score={score}
        highScore={highScore}
        setDifficulty={setDifficulty}
        setGameStart={setGameStart}
        setGameOver={setGameOver}
        setScore={setScore}
      />
    </Container>
  );
};

export default App;
