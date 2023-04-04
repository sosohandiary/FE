import React, { useState } from "react";
import styled from "styled-components";
import Draggable from "react-draggable";

const TestAnimation = () => {
  const [xMove, setXMove] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const handleStart = (e) => {};
  const handleDrag = (e) => {
    setXMove((prev) => prev + e.movementX);
  };
  const handleStop = () => {
    if (xMove <= -200) {
      setXMove(-200);
      setTimeout(() => {
        setIsOpen(true);
      }, 500);
    } else {
      setXMove(0);
      setIsOpen(false);
    }
  };

  const acceptHandler = () => {
    console.log("Button clicked");
  };
  return (
    <div>
      <WholeLine>
        <Draggable
          axis="x"
          handle=".handle"
          defaultPosition={{ x: 0, y: 0 }}
          bounds={{ top: 0, bottom: 0, left: -100, right: 0 }}
          position={{ x: xMove, y: 0 }}
          grid={[1, 1]}
          scale={1}
          onStart={handleStart}
          onDrag={handleDrag}
          onStop={handleStop}
        >
          <OuterLine className="handle">
            This readme is really dragging on...
          </OuterLine>
        </Draggable>
        <InnerLine isOpen={isOpen}>
          <button onClick={acceptHandler}>수락하기</button>
        </InnerLine>
      </WholeLine>
    </div>
  );
};

export default TestAnimation;

const WholeLine = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100px;
`;

const OuterLine = styled.div`
  position: relative;
  width: 100vw;
  height: 100%;
  background-color: #e5e5e5;
  transition: 0.5s;
  transition-timing-function: ease;
`;

const InnerLine = styled.div`
  position: absolute;
  right: 50px;
  z-index: ${({ isOpen }) => (isOpen === true ? 1 : -1)};
`;
