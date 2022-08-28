import React, { FC, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  width: 30vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  border: 1px solid green;
`;

const Player = styled.h1`
  border: 1px solid yellow;
`;

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
  difficulty: IDifficulty;
  setDifficulty: React.Dispatch<React.SetStateAction<IDifficulty>>;
  setGameStart: React.Dispatch<React.SetStateAction<boolean>>;
  setGameOver: React.Dispatch<React.SetStateAction<boolean>>;
  setScore: React.Dispatch<React.SetStateAction<number>>;
}

const PlayerBoard: FC<IPlayerBoard> = ({
  difficulty,
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
      <Player>Player1</Player>
      <HighScore>Leader Board</HighScore>
      <Play>
        <Narrative>Please select difficulty:</Narrative>
        <Select name="difficulty" onChange={handleDifficulty}>
          <Option>EASY</Option>
          <Option selected={true}>NORMAL</Option>
          <Option>HARD</Option>
        </Select>
        <Button onClick={handlePlay}>Play</Button>
      </Play>
    </Container>
  );
};

export default PlayerBoard;
