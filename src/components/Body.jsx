import React from "react";
import styled from "styled-components";
import Canvas from "./Canvas";

const body = () => {
  return (
    <BodyStyle>
      <Canvas />
    </BodyStyle>
  );
};

export default body;

const BodyStyle = styled.div`
  background: #000;
  height: 500vh;
`;
