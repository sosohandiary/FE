import React from "react";
import Comment from "./Comment";

const comments = [
  { id: 1, name: "손흥민", comment: "난 존잘이다ㅋ" },
  { id: 2, name: "한지윤", comment: "난 리액트 최강이다" },
  { id: 3, name: "곽세령", comment: "난 CSS 최강이다" },
  { id: 4, name: "최승호", comment: "난 걍 최강이다" },
];

const CommentList = () => {
  return (
    <div>
      <h2>CommentList</h2>
      {comments.map((comment) => {
        return <Comment key={comment.id} name={comment.name} comment={comment.comment} />;
      })}
    </div>
  );
};

export default CommentList;
