import React from "react";
import styled from "styled-components";
import defaultProfileImg from "../assets/defaultProfileImg.jpeg";
import { WholeAreaStyle } from "../styles/\bWholeAreaStyle";

const Diary = () => {
  return (
    <WholeAreaStyle>
      <WelcomeMsg>
        안녕하세요
        <br />
        소다님!
      </WelcomeMsg>
      <ProfileImg>
        <img src={defaultProfileImg} />
      </ProfileImg>
      <Thumb></Thumb>
      <Thumb></Thumb>
      <Thumb></Thumb>
    </WholeAreaStyle>
  );
};

export default Diary;

const WelcomeMsg = styled.h2`
  position: relative;
  right: 90px;
`;

const ProfileImg = styled.div`
  position: relative;
  left: 120px;
  bottom: 30px;
  width: 50px;
  height: 50px;
  border-radius: 70%;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Thumb = styled.div`
  background-color: gray;
  width: 300px;
  height: 200px;
  margin-bottom: 10px;
`;
