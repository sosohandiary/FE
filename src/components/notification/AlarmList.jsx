import React from "react";
import {
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
  Type as ListType,
} from "react-swipeable-list";

import "react-swipeable-list/dist/styles.css";
import styled from "styled-components";
import AlarmUnReadCard from "./AlarmUnReadCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AlarmList = ({ item, alarmType }) => {
  const navigate = useNavigate();
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
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const handleAccept = () => {
    switch (alarmType) {
      case "friend":
        axios
          .patch(
            `${process.env.REACT_APP_BASEURL}/friend/request/read/${item.friendListId}`,
            {},
            { headers: { Authorization: accessToken } }
          )
          .then((res) => {
            acceptFriend(item?.friendListId);
            console.log(res);
          })
          .catch((err) => console.log(err));
      case "invite":
        return axios
          .patch(
            `${process.env.REACT_APP_BASEURL}/invite/alarm/read/${item.inviteId}`,
            {},
            { headers: { Authorization: accessToken } }
          )
          .then((res) => {
            console.log(res);
          })
          .catch((err) => console.log(err));
      case "comment":
        return axios
          .patch(
            `${process.env.REACT_APP_BASEURL}/comment/alarm/${item.commentId}?page=0`,
            {},
            { headers: { Authorization: accessToken } }
          )
          .then((res) => {
            navigate(`/diaries/${item.diaryDetailId}`);
          })
          .catch((err) => console.log(err));
      default:
        return;
    }
  };

  const handleDelete = () => {
    switch (alarmType) {
      case "friend":
        axios
          .patch(
            `${process.env.REACT_APP_BASEURL}/friend/request/read/${item.friendListId}`,
            {},
            { headers: { Authorization: accessToken } }
          )
          .then((res) => {
            console.log(res);
          })
          .catch((err) => console.log(err));
      case "invite":
        return axios
          .patch(
            `${process.env.REACT_APP_BASEURL}/invite/alarm/read/${item.id}`,
            {},
            { headers: { Authorization: accessToken } }
          )
          .then((res) => {
            console.log(res);
          })
          .catch((err) => console.log(err));
      case "comment":
        return axios
          .patch(
            `${process.env.REACT_APP_BASEURL}/comment/alarm/${item.commentId}`,
            {},
            { headers: { Authorization: accessToken } }
          )
          .then((res) => {})
          .catch((err) => console.log(err));
      default:
        return;
    }
  };

  const getButtonMsg = () => {
    switch (alarmType) {
      case "friend":
        return { acceptMsg: "수락", rejectMsg: "삭제" };
      case "invite":
        return { acceptMsg: "다이어리로 가기", rejectMsg: "삭제" };
      case "comment":
        return { acceptMsg: "다이어리로 가기", rejectMsg: "삭제" };
      default:
        return;
    }
  };

  const trailingActions = () => {
    switch (alarmType) {
      case "friend":
        return (
          <TrailingActions>
            <SwipeAction destructive={true} onClick={handleAccept}>
              <ActionContent color="blue">
                <InnerButton>{getButtonMsg().acceptMsg}</InnerButton>
              </ActionContent>
            </SwipeAction>

            <SwipeAction destructive={true} onClick={handleDelete}>
              <ActionContent color="red">
                <InnerButton>{getButtonMsg().rejectMsg}</InnerButton>
              </ActionContent>
            </SwipeAction>
          </TrailingActions>
        );
      default:
        return (
          <TrailingActions>
            <SwipeAction destructive={true} onClick={handleDelete}>
              <ActionContent color="red">
                <InnerButton>{getButtonMsg().rejectMsg}</InnerButton>
              </ActionContent>
            </SwipeAction>
          </TrailingActions>
        );
    }
  };

  return (
    <>
      <SwipeableList threshold={0.5} type={ListType.IOS} fullSwipe={true}>
        <SwipeableListItem trailingActions={trailingActions()}>
          <AlarmUnReadCard item={item} alarmType={alarmType} />
        </SwipeableListItem>
      </SwipeableList>
      ;
    </>
  );
};

export default AlarmList;

const ActionContent = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 8px;
  font-size: 12px;
  font-weight: 500;
  box-sizing: border-box;
  color: #eee;
  user-select: none;
  background-color: ${({ color }) => color};
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

const InnerButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
`;
