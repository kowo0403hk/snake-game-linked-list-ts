import { FC } from "react";
import styled from "styled-components";
import Canvas from "./components/Canvas";

const Container = styled.div`
  text-align: center;
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;

const App: FC = () => {
  return (
    <Container>
      <Canvas />
    </Container>
  );
};

export default App;
