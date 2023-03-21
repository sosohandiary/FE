import { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

function AddCommentForm() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [comment, setComment] = useState({
    content: "",
  });

  const onAddCommentButtonHandler = (e) => {
    e.preventDefault();
    if (comment.content.trim() === "") {
      return alert("내용을 입력해주세요");
    }
  };

  const onChangeInputHandler = (event) => {
    const { name, value } = event.target;
    // console.log(`name: ${name}, value: ${value}`);
    setComment({
      ...comment,
      [name]: value,
    });
  };

  return (
    <CommentBoxWrapper>
      <CommentForm onSubmit={onAddCommentButtonHandler}>
        <CommentInput
          value={comment.content}
          name="content"
          type="text"
          onChange={onChangeInputHandler}
          placeholder="댓글을 입력하세요."
        />
        <CommentSubmitButton type="submit" onClick={onAddCommentButtonHandler}>
          댓글 추가
        </CommentSubmitButton>
      </CommentForm>
      <div className="comment-list">{/* 댓글 목록이 표시될 영역 */}</div>
    </CommentBoxWrapper>
  );
}

export default AddCommentForm;

const CommentBoxWrapper = styled.div`
  border: 1px solid #ccc;
  padding: 10px;
`;

const CommentForm = styled.div`
  display: flex;
  flex-direction: column;
`;

const CommentInput = styled.textarea`
  height: 100px;
  margin-bottom: 10px;
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
  cursor: pointer;
`;
