import React from "react";
import styled from "styled-components";
import { CgProfile } from "react-icons/cg";
import AliceCarousel from "react-alice-carousel";

const Friendlist = () => {
  const responsive = {
    0: { items: 4, itemsFit: "contain" },
  };

  const items = [
    <div className="item" data-value="1">
      <Friend>
        <CgProfile className="CgProfile" />
        <AcceptButton>+수락하기</AcceptButton>
      </Friend>
    </div>,
    <div className="item" data-value="2">
      <Friend>
        <CgProfile className="CgProfile" />
        <AcceptButton>+수락하기</AcceptButton>
      </Friend>
    </div>,
    <div className="item" data-value="3">
      <Friend>
        <CgProfile className="CgProfile" />
        <AcceptButton>+수락하기</AcceptButton>
      </Friend>
    </div>,
    <div className="item" data-value="4">
      <Friend>
        <CgProfile className="CgProfile" />
        <AcceptButton>+수락하기</AcceptButton>
      </Friend>
    </div>,
    <div className="item" data-value="5">
      <Friend>
        <CgProfile className="CgProfile" />
        <AcceptButton>+수락하기</AcceptButton>
      </Friend>
    </div>,
  ];

  return (
    <Style>
      <TextNotice>나를 추가했어요!</TextNotice>
      <FriendList>
        <AliceCarousel
          mouseTracking
          disableDotsControls
          disableButtonsControls
          items={items}
          responsive={responsive}
          controlsStrategy="alternate"
        />
      </FriendList>
    </Style>
  );
};

export default Friendlist;

const AcceptButton = styled.button`
  border: none;
  border-radius: 10px;
  color: white;
  background-color: #d9d9d9;
  margin-top: 5px;
  font-size: 70%;
`;

const FriendList = styled.div`
  display: flex;
  flex-direction: row;
`;

const Friend = styled.div`
  width: 80px;
  display: flex;
  flex-direction: column;
  padding: 5px;
  margin: 15px 15px 0px 0px;
  .CgProfile {
    font-size: 80px;
    color: black;
  }
`;

const Style = styled.div`
  margin: 25px;
`;

const TextNotice = styled.div`
  font-size: 140%;
  font-weight: bold;
  padding-left: 10px;
`;
