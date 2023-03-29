import React from "react";
import CommentBox from "../components/detail/CommentBox";
import { WholeAreaWithMargin, WholeViewWidth } from "../styles/WholeAreaStyle";
import GetUser from "../components/detail/GetUser";
import styled from "styled-components";
import { MdArrowBack } from "react-icons/md";

const Detail = () => {
  return (
    <>
      <StyledGobackButton />

      <StyledDerailPage>
        <GetUser />
        <WholeAreaWithMargin>
          <StyledDetailCardWrapper>
            <StyledDetailCard>일기데이터 받아오기</StyledDetailCard>
          </StyledDetailCardWrapper>
        </WholeAreaWithMargin>
        <CommentBox />
      </StyledDerailPage>
    </>
  );
};

export default Detail;

const StyledDerailPage = styled.div`
  /* background-color: black; */
  margin-top: 40px;
`;

const StyledGobackButton = styled(MdArrowBack)`
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-500%);
  font-size: 40px;
  color: #adaaaa;
  cursor: pointer;
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
