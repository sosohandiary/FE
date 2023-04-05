import React from "react";
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";
import styled from "styled-components";

const TestAnimation = () => {
  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction onClick={() => console.info("swipe action triggered")}>
        Action name
      </SwipeAction>
    </LeadingActions>
  );

  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction
        // destructive={true}
        onClick={() => console.info("swipe action triggered")}
      >
        Delete
      </SwipeAction>
    </TrailingActions>
  );

  return (
    <>
      <SwipeableList>
        <SwipeableListItem
          leadingActions={leadingActions()}
          trailingActions={trailingActions()}
        >
          Item content
        </SwipeableListItem>
      </SwipeableList>
    </>
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
