import React from "react";
import styled from "styled-components";

const Canvas = () => {
  return <CanvasStyle>Canvas</CanvasStyle>;
};

export default Canvas;

const CanvasStyle = styled.div`
  color: #fff;
  position: fixed;
  left: 50%;
  top: 50%;
  max-height: 100vh;
  max-width: 100vw;
  transform: translate(-50%, -50%);
`;
