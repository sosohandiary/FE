import React, { useState } from "react";
import Comment from "./Comment";
import styled from "styled-components";

const CommentList = () => {
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

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      clickAddButtonHandler(event);
    }
  };

  return (
    <form>
      {comments.map((comment) => {
        return <Comment key={comment.id} name={comment.name} comment={comment.comment} />;
      })}
      <CommentInput
        name="content"
        placeholder="댓글 달기"
        value={content}
        onChange={inputChangeHandler}
        onKeyDown={handleKeyDown}
      />
    </form>
  );
};

export default CommentList;

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
`;
