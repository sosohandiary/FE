import React, { useState } from "react";
import styled, { keyframes, css } from "styled-components";
import { IoChatbubblesOutline } from "react-icons/io5";

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
        <p>댓글을 여기에 표시합니다.</p>
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
  display: ${(props) => (props.show ? "block" : "none")};
  border: 1px solid #ccc;
  padding: 10px;
  margin-top: 10px;
  ${(props) =>
    props.show &&
    css`
      animation: ${CommetnslideUp} 0.3s ease-out forwards;
    `}
`;
const CommentList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const CommentItem = styled.li`
  padding: 5px 0;
`;

const DeleteButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 0.8rem;
  color: red;
  margin-left: 10px;
`;
