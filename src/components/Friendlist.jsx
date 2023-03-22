import React from "react";
import styled from "styled-components";
import { CgProfile } from "react-icons/cg";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { WholeViewWidth, WholeAreaWithMargin } from "../styles/WholeAreaStyle";

const Friendlist = () => {
  const itemsLength = [
    <div>ddd</div>,
    <div>ddd</div>,
    <div>ddd</div>,
    <div>ddd</div>,
    <div>ddd</div>,
    <div>ddd</div>,
    <div>ddd</div>,
  ];

  const items = itemsLength.map((item, index) => {
    const style = { width: 80 };
    return (
      <Friend>
        <CgProfile className="CgProfile item" style={style} />
        <AcceptButton>+수락하기</AcceptButton>
      </Friend>
    );
  });
  return (
    <WholeAreaWithMargin>
      <TextNotice>나를 추가했어요!</TextNotice>
      <WholeViewWidth>
        <FriendList>
          <AliceCarousel
            autoWidth
            mouseTracking
            disableDotsControls
            disableButtonsControls
            items={items}
          />
        </FriendList>
      </WholeViewWidth>
    </WholeAreaWithMargin>
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
  margin: 0px 24px;
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

const TextNotice = styled.div`
  font-size: 140%;
  font-weight: bold;
  padding-left: 10px;
  display: flex;
  position: relative;
  right: 98px;
`;
