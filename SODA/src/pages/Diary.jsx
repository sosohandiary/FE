import React from "react";
import styled from "styled-components";
import defaultProfileImg from "../assets/defaultProfileImg.jpeg";
import Thumbnail from "../components/Thumbnail";

const Diary = () => {
  return (
    <WholeArea>
      <WelcomeAndProfileArea>
        <WelcomePhrase>
          안녕하세요
          <br />
          소다님!
        </WelcomePhrase>
        <ProfileImg>
          <img src={defaultProfileImg} />
        </ProfileImg>
      </WelcomeAndProfileArea>
      <Thumbnail />
      <Thumbnail />
      <Thumbnail />
    </WholeArea>
  );
};

export default Diary;

const WholeArea = styled.div`
  margin: 20px;
`;

const WelcomeAndProfileArea = styled.div`
  display: flex;
  justify-content: space-between;
  vertical-align: bottom;
`;

const WelcomePhrase = styled.h1`
  margin-top: 8%;
`;

const ProfileImg = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 70%;
  overflow: hidden;
  margin-top: 19%;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
