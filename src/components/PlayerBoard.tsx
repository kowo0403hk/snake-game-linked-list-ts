import React, { FC } from "react";
import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  width: 30vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  border: 2px solid white;
`;

const Player = styled.h1``;

const HighScore = styled.div``;

const Play = styled.div``;

const Narrative = styled.p``;

const Select = styled.select``;

const Option = styled.option``;

const Button = styled.button``;

interface IDifficulty {
  LEVEL: string;
  CANVAS_SIZE: number;
  REVERSE_PROB: number;
}

interface IPlayerBoard {
  score: number;
  highScore: number;
  setDifficulty: React.Dispatch<React.SetStateAction<IDifficulty>>;
  setGameStart: React.Dispatch<React.SetStateAction<boolean>>;
  setGameOver: React.Dispatch<React.SetStateAction<boolean>>;
  setScore: React.Dispatch<React.SetStateAction<number>>;
}

const PlayerBoard: FC<IPlayerBoard> = ({
  highScore,
  setDifficulty,
  setGameStart,
  setGameOver,
  setScore,
}: IPlayerBoard) => {
  const handleDifficulty = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const difficulty = e.target.value;

    if (difficulty === "EASY") {
      setDifficulty({
        LEVEL: "EASY",
        CANVAS_SIZE: 8,
        REVERSE_PROB: 0.2,
      });
    }

    if (difficulty === "NORMAL") {
      setDifficulty({
        LEVEL: "NORMAL",
        CANVAS_SIZE: 10,
        REVERSE_PROB: 0.4,
      });
    }

    if (difficulty === "HARD") {
      setDifficulty({
        LEVEL: "HARD",
        CANVAS_SIZE: 15,
        REVERSE_PROB: 0.6,
      });
    }
  };

  const handlePlay = () => {
    setGameStart(true);
    setGameOver(false);
    setScore(0);
  };

  return (
    <Container>
      <Player>Linked List Snake!</Player>
      <HighScore>
        <Narrative>Highest Score</Narrative>
        {highScore}
      </HighScore>
      <Play>
        <Narrative>Please select difficulty:</Narrative>
        <Select
          name="difficulty"
          defaultValue="NORMAL"
          onChange={handleDifficulty}
        >
          <Option>EASY</Option>
          <Option>NORMAL</Option>
          <Option>HARD</Option>
        </Select>
        <Button onClick={handlePlay}>Play</Button>
      </Play>
    </Container>
  );
};

export default PlayerBoard;
