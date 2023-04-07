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
import AlarmUnReadCard from "./AlarmUnReadCard";
import axios from "axios";

const handleReject = () => {
  console.log("reject");
};
const handleDelete = () => {
  console.log("delete");
};

const acceptDiary = (id) => {};

const goToDetailOfComment = () => {};

const AlarmList = ({ item, alarmType }) => {
  const accessToken = window.localStorage.getItem("accessToken");

  const acceptFriend = (id) => {
    axios
      .put(
        `${process.env.REACT_APP_BASEURL}/friend/request/accept/${id}`,
        {},
        {
          headers: { Authorization: accessToken },
        }
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction onClick={handleReject}>
        <ActionContent onClick={() => acceptFriend(item?.friendListId)}>
          수락하기
        </ActionContent>
      </SwipeAction>
      <SwipeAction destructive={true} onClick={handleDelete}>
        <Button color="red">삭제하기</Button>
      </SwipeAction>
    </TrailingActions>
  );

  return (
    <>
      <SwipeableList threshold={0.5} type={ListType.IOS}>
        <SwipeableListItem trailingActions={trailingActions()}>
          {item?.alarm === false ? (
            <AlarmUnReadCard item={item} alarmType={alarmType} />
          ) : (
            <AlarmReadCard item={item} alarmType={alarmType} />
          )}
        </SwipeableListItem>
      </SwipeableList>
    </>
  );
};

export default AlarmList;

const ActionContent = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  padding: 8px;
  font-size: 12px;
  font-weight: 500;
  box-sizing: border-box;
  color: #eee;
  user-select: none;
  background-color: blue;
`;
const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70px;
  height: 100%;
  background-color: ${({ color }) => (color === "red" ? "red" : "blue")};
  vertical-align: center;
`;
