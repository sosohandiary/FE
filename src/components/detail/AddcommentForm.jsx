import React, { useState } from "react";
import "../../styles/detail.css";

const AddcommentForm = ({ comments, setComments }) => {
  const [comment, setComment] = useState({
    content: "",
  });

  const onChangeInputHandler = (event) => {
    setComment({
      content: event.target.value,
    });
    // console.log(event.target.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    // 새 댓글 추가하는 함수 호출
  };

  return (
    <div>
      <form className="formDiv" onSubmit={onSubmitHandler}>
        <input
          className="commentInput"
          type="text"
          name="content"
          placeholder="댓글을 입력하세요"
          value={comment.content}
          onChange={onChangeInputHandler}
        />
        <button className="addCommentBtn" type="submit">
          입력
        </button>
      </form>
    </div>
  );
};

export default AddcommentForm;
