import React from "react";
import styled from "styled-components";
import AlarmUnReadCard from "../../components/notification/AlarmUnReadCard";
import AlarmReadCard from "../../components/notification/AlarmReadCard";
import TitleBox from "../../components/TitleBox";
import { useQuery } from "react-query";
import axios from "axios";
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
        {dataForFriendRequest?.data.map((item, i) => (
          <AlarmUnReadCard key={i} item={item} alarmSort="friendRequest" />
        ))}
        <AlarmList />
        <AlarmUnReadCard />
        <AlarmReadCard />
        <AlarmReadCard />
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
