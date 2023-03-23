import React, { useState } from "react";
import styled, { keyframes, css } from "styled-components";
import { IoChatbubblesOutline } from "react-icons/io5";
import CommentList from "./CommentList";

const Sample = () => {
  const [showComments, setShowComments] = useState(false);

  const toggleComments = () => {
    setShowComments((prev) => !prev);
  };

  const [comments, setComments] = useState([
    { id: 1, name: "손흥민", comment: "난 존잘이다ㅋ" },
    { id: 2, name: "한지윤", comment: "난 리액트 최강이다" },
    { id: 3, name: "곽세령", comment: "난 CSS 최강이다" },
    { id: 4, name: "최승호", comment: "난 걍 최강이다" },
  ]);

  const [content, setContent] = useState("");
  const [name, setName] = useState("");

  const inputChangeHandler = (event) => {
    const { name, value } = event.target;
    if (name === "name") {
      setName(value);
    } else if (name === "content") {
      setContent(value);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      clickAddButtonHandler(event);
    }
  };

  const clickAddButtonHandler = (event) => {
    event.preventDefault();
    const newContent = {
      id: comments.length + 1,
      name,
      comment: content,
    };
    setComments([...comments, newContent]);
    setName("");
    setContent("");
  };

  return (
    <div>
      <CommentButton onClick={toggleComments}>
        <CommentIcon />
      </CommentButton>

      <CommentsContainer show={showComments}>
        <h3>댓글</h3>
        <CommentList comments={comments} />
        <CommentInput
          name="content"
          placeholder="댓글 달기"
          value={content}
          onChange={inputChangeHandler}
          onKeyDown={handleKeyDown}
        />
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

const CommentInput = styled.input`
  width: 327px;
  height: 40px;
  margin-bottom: 10px;
  margin-left: 10px;
  padding: 5px;
  resize: none;
  background: #f0f0f0;
  border: none;
  border-radius: 20px;
  position: absolute;
  bottom: 0;
`;
