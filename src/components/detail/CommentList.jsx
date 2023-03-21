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
    setName(""); // 추가 후 name 값을 초기화
    setContent(""); // 추가 후 content 값을 초기화
  };

  return (
    <form>
      <h2>CommentList</h2>
      {/* <input name="name" placeholder="작성자 이름을 입력하세요" value={name} onChange={inputChangeHandler} /> */}
      <CommentInput name="content" placeholder="댓글을 입력하세요" value={content} onChange={inputChangeHandler} />
      <CommentSubmitButton onClick={clickAddButtonHandler}>추가</CommentSubmitButton>

      {comments.map((comment) => {
        return <Comment key={comment.id} name={comment.name} comment={comment.comment} />;
      })}
    </form>
  );
};

export default CommentList;

const CommentInput = styled.input`
  height: 30px;
  width: 400px;
  margin-bottom: 10px;
  margin-left: 10px;
  padding: 5px;
  resize: none;
  background-color: #f4f4f4;
  border: none;
  border-radius: 5px;
`;

const CommentSubmitButton = styled.button`
  background-color: #f2fefa;
  border: none;
  border-radius: 5px;
  color: #000000;
  padding: 8px 16px;
  margin-left: 20px;
  cursor: pointer;
`;
