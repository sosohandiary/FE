import React, { useState } from "react";
import styled from "styled-components";
import TitleBox from "../../components/TitleBox";
import { useQuery } from "react-query";
import axios from "axios";
import AlarmList from "../../components/notification/AlarmList";
import AlarmListForFriend from "../../components/notification/AlarmList";

const Notification = () => {
  const accessToken = window.localStorage.getItem("accessToken");

  const { data: dataForFriendRequest } = useQuery(["getFriendRequests"], () => {
    return axios.get(`${process.env.REACT_APP_BASEURL}/friend/request`, {
      headers: { Authorization: accessToken },
    });
  });

  const { data: dataForInviteAlarm } = useQuery(["getInviteAlarm"], () => {
    return axios.get(`${process.env.REACT_APP_BASEURL}/invite/alarm`, {
      headers: { Authorization: accessToken },
    });
  });

  const { data: dataForCommentAlarm } = useQuery(["getCommentAlarm"], () => {
    return axios.get(`${process.env.REACT_APP_BASEURL}/comment/alarm`, {
      headers: { Authorization: accessToken },
    });
  });

  const dataListForFriendRequset = dataForFriendRequest?.data;
  const dataListForInviteAlarm = dataForInviteAlarm?.data;
  const dataListForCommentAlarm = dataForCommentAlarm?.data;

  return (
    <>
      <TitleBox />

      <AlarmBox>
        {dataListForFriendRequset?.map((item, i) => (
          <AlarmList key={i} alarmType="friend" item={item} />
        ))}
        {dataListForInviteAlarm?.map((item, i) => (
          <AlarmList key={i} alarmType="invite" item={item} />
        ))}
        {dataListForCommentAlarm?.map((item, i) => (
          <AlarmList key={i} alarmType="comment" item={item} />
        ))}
        <AlarmList />
      </AlarmBox>
    </>
  );
};

export default Notification;

const AlarmBox = styled.div`
  background-color: white;
  margin-top: 10px;
  margin-bottom: 80px;
`;
