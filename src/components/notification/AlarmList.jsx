import React, { useEffect } from "react";
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
  Type as ListType,
} from "react-swipeable-list";

import "react-swipeable-list/dist/styles.css";
import AlarmReadCard from "./AlarmReadCard";
import styled from "styled-components";

const handleReject = () => {
  console.log("reject");
};
const handleDelete = () => {
  console.log("delete");
};

const AlarmList = () => {
  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction onClick={handleReject}>Reject</SwipeAction>
      <SwipeAction destructive={true} onClick={handleDelete}>
        <Button>Delete</Button>
      </SwipeAction>
    </TrailingActions>
  );

  return (
    <>
      <SwipeableList threshold={0.5} type={ListType.IOS}>
        <SwipeableListItem trailingActions={trailingActions()}>
          <AlarmReadCard />
        </SwipeableListItem>
      </SwipeableList>
    </>
  );
};

export default AlarmList;

const Button = styled.div`
  background-color: red;
  vertical-align: center;
`;
