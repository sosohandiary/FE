import React from "react";
import styled from "styled-components";
import Navigationbar from "../../components/Navigationbar";
import AlarmUnReadCard from "../../components/AlarmUnReadCard";
import AlarmReadCard from "../../components/AlarmReadCard";
import TitleBox from "../../components/TitleBox";

const Notification = () => {
  return (
    <>
      <TitleBox />

      <AlarmBox>
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
