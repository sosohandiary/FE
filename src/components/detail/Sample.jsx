import React, { useState } from "react";
import styled, { keyframes, css } from "styled-components";
import { IoChatbubblesOutline } from "react-icons/io5";
import CommentList from "./CommentList";

const Sample = () => {
  const [showComments, setShowComments] = useState(false);

  const toggleComments = () => {
    setShowComments((prev) => !prev);
  };

  return (
    <div>
      <CommentButton onClick={toggleComments}>
        <CommentIcon />
      </CommentButton>

      <CommentsContainer show={showComments}>
        <h3>댓글</h3>
        <CommentList />
      </CommentsContainer>
    </div>
  );
};

export default Sample;

const CommetnslideUp = keyframes`
  0% {
    transform: translateY(60%);
    opacity: 1;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

const CommentIcon = styled(IoChatbubblesOutline)`
  font-size: 2rem; // 원하는 크기로 조절
`;

const CommentButton = styled.button`
  display: flex;
  align-items: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;
const CommentsContainer = styled.div`
  width: 375px;
  height: 643px;
  /* left: 0px;
  top: 172px; */
  display: ${(props) => (props.show ? "block" : "none")};
  border: none;
  background-color: #dfdfdf;
  border-radius: 30px 30px 0px 0px;
  padding: 10px;
  margin-top: 10px;
  ${(props) =>
    props.show &&
    css`
      animation: ${CommetnslideUp} 0.3s ease-out forwards;
    `}
  h3 {
    text-align: center;
    line-height: 22px;
    margin-bottom: 20px;
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 22px;
  }
`;
