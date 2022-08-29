import React, { FC } from "react";
import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  width: 30vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  border-left: 4px solid rgb(80, 80, 80);
`;

const GameName = styled.h1``;

const Description = styled.div`
  margin: 10px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-bottom: 10px;
`;

const SnakeSpan = styled.span`
  width: 35px;
  height: 35px;
  display: inline-block;
  border-radius: 25%;
  background-image: linear-gradient(
    to right top,
    #069710,
    #0ea730,
    #16b64a,
    #1dc661,
    #25d679,
    #2ade86,
    #30e694,
    #36eea1,
    #3af1a7,
    #3df3ae,
    #42f6b4,
    #46f8ba
  );
  margin-right: 10px;
`;

const AppleSpan = styled.span`
  width: 35px;
  height: 35px;
  display: inline-block;
  border-radius: 50%;
  background-image: linear-gradient(
    to right,
    rgba(255, 255, 255, 1),
    rgba(230, 5, 118, 1)
  );
  margin-right: 10px;
`;

const ReverseAppleSpan = styled.span`
  width: 35px;
  height: 35px;
  display: inline-block;
  background-image: linear-gradient(
    to right,
    rgba(250, 205, 61, 1),
    rgba(86, 38, 196, 1)
  );
  border-radius: 50%;
  margin-right: 10px;
`;

const HighScore = styled.div`
  font-size: 2rem;
  font-weight: 600;
`;

const Play = styled.div`
  diplay: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Narrative = styled.div`
  margin: 10px 20px;
`;

const Select = styled.select`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 20px;
  color: rgb(80, 80, 80);
  padding: 5px;
  box-shadow: 5px 5px;
`;

const Option = styled.option``;

const Button = styled.button`
  background-color: white;
  font-weight: 600;
  font-size: 1.5rem;
  border-radius: 5%;
  color: rgb(80, 80, 80);
  padding: 5px;
  box-shadow: 5px 5px;
  cursor: pointer;
`;

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
        CANVAS_SIZE: 12,
        REVERSE_PROB: 0.2,
      });
    }

    if (difficulty === "NORMAL") {
      setDifficulty({
        LEVEL: "NORMAL",
        CANVAS_SIZE: 14,
        REVERSE_PROB: 0.4,
      });
    }

    if (difficulty === "HARD") {
      setDifficulty({
        LEVEL: "HARD",
        CANVAS_SIZE: 17,
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
      <GameName>Reversed Linked-List Snake!</GameName>
      <Narrative>
        <Description>
          <SnakeSpan></SnakeSpan>This is your linked-list snake.
        </Description>
        <Description>
          <AppleSpan></AppleSpan>This is an apple to grow your linked list.
        </Description>
        <Description>
          <ReverseAppleSpan></ReverseAppleSpan>This is an apple to reverse your
          linked list.
        </Description>
      </Narrative>
      <HighScore>
        <Narrative>Highest Score</Narrative>
        {highScore}
      </HighScore>
      <Play>
        <Narrative>Please select difficulty:</Narrative>
        <Narrative>
          <Select
            name="difficulty"
            defaultValue="NORMAL"
            onChange={handleDifficulty}
          >
            <Option>EASY</Option>
            <Option>NORMAL</Option>
            <Option>HARD</Option>
          </Select>
        </Narrative>
        <Button onClick={handlePlay}>Start Game</Button>
      </Play>
    </Container>
  );
};

export default PlayerBoard;
