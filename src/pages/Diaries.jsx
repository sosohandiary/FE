import React from "react";
import styled from "styled-components";
import defaultProfileImg from "../assets/defaultProfileImg.jpeg";
import { WholeArea, WholeAreaStyle } from "../styles/\bWholeAreaStyle";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

const Diaries = () => {
  return (
    <WholeArea>
      <WelcomeMsg>
        안녕하세요
        <br />
        소다님!
      </WelcomeMsg>
      <ProfileImg>
        <img src={defaultProfileImg} />
      </ProfileImg>
      <CarouselArea>
        <div>전체보기</div>
        <div>필터</div>
        <div>필터</div>
      </CarouselArea>
      <Thumb></Thumb>
      <Thumb></Thumb>
      <Thumb></Thumb>
    </WholeArea>
  );
};

export default Diaries;

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

const CarouselArea = styled.div`
  width: 100vw;
  background-color: #b6b6ee;
  display: flex;
`;

const RoundButton = styled.div`
  background-color: #e3effd;
  padding: 2px 20px;
  border-radius: 10px;
`;
