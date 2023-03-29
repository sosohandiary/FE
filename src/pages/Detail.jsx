import React from "react";
import CommentBox from "../components/detail/CommentBox";
import { WholeAreaWithMargin, WholeViewWidth } from "../styles/WholeAreaStyle";
import GetUser from "../components/detail/GetUser";

import styled from "styled-components";

const Detail = () => {
  return (
    <>
      <GetUser />
      <div>
        <WholeAreaWithMargin>
          <StyledUserBoxWrapper></StyledUserBoxWrapper>
          <StyledDetailCardWrapper>
            <StyledDetailCard>일기데이터 받아오기</StyledDetailCard>
          </StyledDetailCardWrapper>
        </WholeAreaWithMargin>
        <CommentBox />
      </div>
    </>
  );
};

export default Detail;

const StyledUserBoxWrapper = styled.div`
  position: absolute;
  top: 80px;
  left: 620px;
`;

const StyledDetailCardWrapper = styled(WholeViewWidth)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;

const StyledDetailCard = styled.div`
  display: flex;
  width: 375px;
  height: 100vh;
  border: none;
  background-color: #f1f1f1;
  border-radius: 30px 30px 0px 0px;
  padding: 10px;
`;
