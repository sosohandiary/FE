import React from "react";
import styled from "styled-components";

const Comment = (props) => {
  console.log(props);

  return (
    <CommentStyle>
      {/* username , comment 받아오기 */}
      <NameText>{props.name}</NameText>
      <CommentText>{props.comment}</CommentText>
    </CommentStyle>
  );
};

export default Comment;

const CommentStyle = styled.div`
  background-color: #f4f4f4;
  border: none;
  border-radius: 5px;
  width: 325px;
  height: 34px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 10px;
  margin-left: 10px;
`;

const NameText = styled.span`
  color: black;
  font-size: 12px;
  font-weight: bold;
  margin-bottom: 5px;
  margin-left: 10px;
`;

const CommentText = styled.span`
  font-size: 14px;
  margin-left: 10px;
`;
