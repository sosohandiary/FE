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
import { useNavigate } from "react-router-dom";

const Detail = () => {
  const navigate = useNavigate();
  const sheetRef = useRef();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    sheetRef.current.click();
  }, []);

  return (
    <>
      <StyledGobackButton onClick={() => navigate(-1)} />

      <StyledDerailPage>
        <GetUser />
        <WholeAreaWithMargin>
          <StyledDetailCardWrapper>
            <StyledDetailCard>일기데이터 받아오기</StyledDetailCard>
          </StyledDetailCardWrapper>
        </WholeAreaWithMargin>
      </StyledDerailPage>

      <button style={{ display: "none" }} ref={sheetRef} onClick={() => setOpen(true)}></button>
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
        snapPoints={({ minHeight, maxHeight }) => [60, 800]}
        blocking={false}
      >
        <CommentBox />
      </BottomSheet>
    </>
  );
};

export default Detail;
