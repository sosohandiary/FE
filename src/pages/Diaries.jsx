import React from "react";
import styled from "styled-components";
import defaultProfileImg from "../assets/defaultProfileImg.jpeg";
import { WholeArea, WholeAreaStyle } from "../styles/\bWholeAreaStyle";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

const Diaries = () => {
  const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 3 },
  };

  const items = [
    <div className="item" data-value="1">
      1
    </div>,
    <div className="item" data-value="2">
      2
    </div>,
    <div className="item" data-value="3">
      3
    </div>,
    <div className="item" data-value="4">
      4
    </div>,
    <div className="item" data-value="5">
      5
    </div>,
  ];

  return (
    <WholeArea>
      <RoundButton>
        ddd
        <br />
        ddd
      </RoundButton>
      <WelcomeMsg>
        안녕하세요
        <br />
        소다님!
      </WelcomeMsg>
      <ProfileImg>
        <img src={defaultProfileImg} />
      </ProfileImg>
      <CarouselArea>
        <AliceCarousel
          mouseTracking
          disableDotsControls
          disableButtonsControls
          items={items}
          responsive={responsive}
          controlsStrategy="alternate"
        />
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
`;

const RoundButton = styled.div`
  background-color: #e3effd;
  padding: 2px 20px;
  border-radius: 10px;
`;
