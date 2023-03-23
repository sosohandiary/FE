import React from "react";
import Comment from "./Comment";

const CommentList = (props) => {
  const { comments } = props;

  return (
    <>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment.comment} />
      ))}
    </>
  );
};

export default CommentList;
