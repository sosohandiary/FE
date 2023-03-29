import React, { useState, useRef, useEffect } from "react";
import { BottomSheet } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";

import CommentBox from "../components/detail/CommentBox";
import { IoChatbubblesOutline } from "react-icons/io5";
import "react-spring-bottom-sheet/dist/style.css";
import Like from "../components/detail/Like";

import { WholeAreaWithMargin, WholeViewWidth } from "../styles/WholeAreaStyle";
import GetUser from "../components/detail/GetUser";
import styled from "styled-components";
import { MdArrowBack } from "react-icons/md";

const Detail = () => {
  const sheetRef = useRef();
  const [open, setOpen] = useState(false);

  console.log(11111);

  useEffect(() => {
    sheetRef.current.click();
  }, []);

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
      </StyledDerailPage>

      <button style={{ display: "none" }} ref={sheetRef} onClick={() => setOpen(true)}>
        Open
      </button>
      <BottomSheet
        open={open}
        header={
          <DetailElement>
            <CommentIcon />
            {/* 5 -> 댓글 및 좋아요수 받아오기 */}
            55
            <Like />
            500
          </DetailElement>
        }
        defaultSnap={({ snapPoints }) => snapPoints}
        snapPoints={({ minHeight, maxHeight }) => [60, maxHeight]}
        blocking={false}
      >
        <CommentBox />
      </BottomSheet>
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

const DetailElement = styled.div`
  display: flex;
`;

const CommentIcon = styled(IoChatbubblesOutline)`
  font-size: 1.8rem; // 원하는 크기로 조절
  display: flex;
  align-items: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;
