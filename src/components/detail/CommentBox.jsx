import React, { useState } from "react";
import styled, { keyframes, css } from "styled-components";
import { IoChatbubblesOutline } from "react-icons/io5";
import CommentList from "./CommentList";
import Comment from "./Comment";
import { useQueryClient, useMutation } from "react-query";
import { addComment } from "../../api/comment";
import { useParams } from "react-router-dom";

const CommentBox = () => {
  const [showComments, setShowComments] = useState(false);
  const toggleComments = () => {
    setShowComments((prev) => !prev);
  };

  const queryClient = useQueryClient();
  const { id } = useParams();
  const accessToken = localStorage.getItem("accessToken");

  const { mutate: addmutation } = useMutation(() => addComment(id, comment, accessToken), {
    onSuccess: (data) => {
      console.log("data", data);
      queryClient.invalidateQueries("comment");
    },
  });

  // const [comments, setComments] = useState([
  //   { id: 1, name: "손흥민", comment: "난 존잘이다ㅋ난 존잘이다ㅋ난 존잘이다ㅋ난 존잘이다ㅋ난 존잘이다ㅋ" },
  // ]);

  const [comment, setComment] = useState({
    comment: "",
  });

  const inputChangeHandler = (event) => {
    const { name, value } = event.target;
    setComment({ ...comment, [name]: value });
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      clickAddButtonHandler(event);
    }
  };

  const clickAddButtonHandler = (event) => {
    event.preventDefault();
    //   const newContent = {
    //     id: comments.length + 1,
    //     name,
    //     comment: content,
    //   };
    //   setComments([...comments, newContent]);
    //   setName("");
    //   setContent("");
    // };

    addmutation();
  };

  return (
    <div>
      <CommentButton onClick={toggleComments}>
        <CommentIcon />
      </CommentButton>

      <CommentsContainer show={showComments}>
        <h3>댓글</h3>
        <Comment />
        <CommentInput
          name="comment"
          placeholder="댓글 달기"
          value={comment.comment}
          onChange={inputChangeHandler}
          onKeyDown={handleKeyDown}
        />
      </CommentsContainer>
    </div>
  );
};

export default CommentBox;

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
  display: ${(props) => (props.show ? "block" : "none")};
  border: none;
  background-color: #f7dcdc;
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
    font-size: 16px;
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
