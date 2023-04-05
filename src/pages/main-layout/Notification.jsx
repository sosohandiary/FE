import React, { useState } from "react";
import styled from "styled-components";
import TitleBox from "../../components/TitleBox";
import { useQuery } from "react-query";
import axios from "axios";
import AlarmList from "../../components/notification/AlarmList";
import AlarmList from "../../components/notification/AlarmList";

const Notification = () => {
  const accessToken = window.localStorage.getItem("accessToken");
  const { data: dataForFriendRequest } = useQuery(["getFriendRequests"], () => {
    return axios.get(`${process.env.REACT_APP_BASEURL}/friend/request`, {
      headers: { Authorization: accessToken },
    });
  });

  return (
    <>
      <TitleBox />

      <AlarmBox>
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
