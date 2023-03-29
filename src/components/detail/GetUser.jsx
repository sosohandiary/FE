import React from "react";
import styled from "styled-components";
import { ProfilePicSmall } from "../ProfilePics";

const GetUser = () => {
  return (
    <StyledUserBox>
      <ProfilePicSmall src="https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzAyMTVfMTA5%2FMDAxNjc2NDMyNzA5NDIy.Di4Jca6bfg9LaSOaeeO3vwdHwRqMVt-14xV2Xat4raUg.xwfQrSJhrS0WuJUuaAdEalXb_Z1BEEOKx_my1FHX9d0g.JPEG.qmfosej%2FIMG_9285.jpg&type=a340" />
      {/* 이름받아옵니다 */}
      <StyledUserName>희성짱</StyledUserName>
    </StyledUserBox>
  );
};

export default GetUser;

const StyledUserBox = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 28px;
  left: -130px;
`;
const StyledUserName = styled.span`
  font-size: 15px;
  font-weight: bold;
  margin-left: 7px;
`;
