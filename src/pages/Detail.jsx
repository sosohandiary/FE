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
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getDiary } from "../api/detail";
import Spinner from "../styles/Spinner";

function Detail() {
  const navigate = useNavigate();
  const sheetRef = useRef();
  const [open, setOpen] = useState(false);
  const { diaryId, detailId } = useParams();

  const accessToken = localStorage.getItem("accessToken");

  const { data: diaryData } = useQuery(["getDiary"], () => getDiary(diaryId, detailId, accessToken));

  const myDiary = diaryData?.data;

  console.log(myDiary);

  useEffect(() => {
    sheetRef.current.click();
  }, []);

  return (
    <>
      <StyledGobackButton onClick={() => navigate(-1)} />

      {myDiary && (
        <StyledDerailPage>
          <GetUser createdAt={myDiary.createdAt} nickname={myDiary.nickname} />
          <WholeAreaWithMargin>
            <StyledDetailCardWrapper>
              <StyledDetailCard>야이씨 언제 나몰래 봄 왔냐 커플다망해라</StyledDetailCard>
            </StyledDetailCardWrapper>
          </WholeAreaWithMargin>
        </StyledDerailPage>
      )}

      <button style={{ display: "none" }} ref={sheetRef} onClick={() => setOpen(true)}></button>

      {myDiary ? (
        <BottomSheet
          open={open}
          header={
            <DetailElement>
              <CommentIcon />
              {myDiary.commentCount}
              <Like diaryData={myDiary} />
              {myDiary.likeCount}
            </DetailElement>
          }
          defaultSnap={({ snapPoints }) => snapPoints}
          snapPoints={({ minHeight, maxHeight }) => [60, 800]}
          blocking={false}
        >
          <CommentBox />
        </BottomSheet>
      ) : (
        <div style={{ marginTop: "40vh", display: "flex", justifyContent: "center" }}>
          <Spinner />
        </div>
      )}
    </>
  );
}
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
