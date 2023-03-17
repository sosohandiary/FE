import React, { useState } from "react";
import Comment from "./Comment";
import "../../styles/detail.css";

function CommentList() {
  const [comments, setComments] = useState([
    { id: 1, userName: "지윤", content: "리액트 껌이다" },
    { id: 2, userName: "세령", content: "CSS 껌이다" },
    { id: 3, userName: "승호", content: "프론트는 껌이다" },
    { id: 4, userName: "주애", content: "나 걍 껌이다" },
  ]);

  const handleDelete = (id) => {
    setComments(comments.filter((comment) => comment.id !== id));
  };

  return (
    <div className="commentBox">
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          id={comment.id}
          userName={comment.userName}
          content={comment.content}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
}

export default CommentList;
