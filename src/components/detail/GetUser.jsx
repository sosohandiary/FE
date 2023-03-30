import React from "react";
import styled from "styled-components";
import { ProfilePicSmall } from "../ProfilePics";
import GetTimeAgo from "../GetTimeAgo";

const GetUser = () => {
  return (
    <>
      <StyledUserBox>
        <ProfilePicSmall src="https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzAyMTVfMTA5%2FMDAxNjc2NDMyNzA5NDIy.Di4Jca6bfg9LaSOaeeO3vwdHwRqMVt-14xV2Xat4raUg.xwfQrSJhrS0WuJUuaAdEalXb_Z1BEEOKx_my1FHX9d0g.JPEG.qmfosej%2FIMG_9285.jpg&type=a340" />
        {/* 이름,시간(GetTimeAgo활용) 받아옵니다 */}
        <span>희성짱</span>
        <span>20년 전</span>
      </StyledUserBox>
    </>
  );
};

export default GetUser;

const StyledUserBox = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 28px;
  left: -100px;

  span {
    &:first-of-type {
      font-size: 17px;
      font-weight: bold;
      margin-left: 7px;
      color: #000000;
    }
    &:not(:last-of-type)::after {
      content: "·";
      margin-left: 5px;
      margin-right: 5px;
      color: gray;
    }
    &:last-of-type {
      font-size: 14px;
      font-weight: bold;
      color: gray;
      margin-right: 20px;
    }
  }
`;
