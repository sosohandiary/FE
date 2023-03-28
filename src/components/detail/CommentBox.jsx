import React, { useState } from "react";
import styled, { keyframes, css } from "styled-components";
import { ProfilePicSmall } from "../ProfilePics";
import { RiPencilFill, RiDeleteBin6Fill, RiCheckFill, RiCloseFill } from "react-icons/ri";
import { IoChatbubblesOutline } from "react-icons/io5";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { addComment, getComment, deleteComment, updatedComment } from "../../api/detail";
import { useParams } from "react-router-dom";
import Like from "./Like";

function getTimeAgo(createdAt) {
  const date = new Date(createdAt);
  const now = new Date();
  const diff = Math.floor((now - date) / 1000);

  if (diff < 60) {
    return `${diff}초 전`;
  } else if (diff < 60 * 60) {
    const minutes = Math.floor(diff / 60);
    return `${minutes}분 전`;
  } else if (diff < 60 * 60 * 24) {
    const hours = Math.floor(diff / (60 * 60));
    return `${hours}시간 전`;
  } else {
    const days = Math.floor(diff / (60 * 60 * 24));
    return `${days}일 전`;
  }
}

const CommentBox = () => {
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState({
    comment: "",
  });
  const [editingComment, setEditingComment] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [test, setTest] = useState(null);

  const toggleComments = () => {
    setShowComments((prev) => !prev);
  };

  const queryClient = useQueryClient();
  const { id } = useParams();
  const accessToken = localStorage.getItem("accessToken");
  const { data: commentData } = useQuery(["getComment"], () => getComment(id, accessToken));
  const mycomment = commentData?.data;

  // <----Mutation----> //

  //add
  const { mutate: addmutation } = useMutation(() => addComment(id, comment, accessToken), {
    onSuccess: (data) => {
      queryClient.invalidateQueries("getComment");
    },
  });

  //delete
  const { mutate: deleteCommentMutate } = useMutation((commentId) => deleteComment(id, commentId, accessToken), {
    onSuccess: () => {
      queryClient.invalidateQueries("getComment");
    },
  });

  //edit
  const { mutate: updatedCommentMutate } = useMutation(
    (commentId) => updatedComment(id, commentId, comment, accessToken),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("getComment");
      },
    }
  );

  // <----Handler----> //
  const inputChangeHandler = (event) => {
    const { name, value } = event.target;
    setComment({ ...comment, [name]: value });
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      if (isEditing) {
        onUpdateHandler();
      } else {
        onAddHandler(event);
      }
    }
  };

  const onAddHandler = (event) => {
    event.preventDefault();
    addmutation();
    setComment({ comment: "" });
  };

  const onDeleteHandler = (commentId) => {
    deleteCommentMutate(commentId);
  };

  const onEditHandler = (comment) => {
    console.log(comment);
    setIsEditing(true);
    setEditingComment(comment);
    setComment({ comment: comment.comment });
    setTest(comment);
  };

  const onCancelEditHandler = () => {
    setIsEditing(false);
    setEditingComment(null);
    setComment({ comment: "" });
  };

  const onUpdateHandler = () => {
    updatedCommentMutate(test.commentId);
    setIsEditing(false);
    setEditingComment(null);
    setComment({ comment: "" });
  };

  return (
    <div>
      <DetailElement>
        <CommentIcon onClick={toggleComments} />
        {/* 5 -> 댓글 및 좋아요수 받아오기 */}
        5
        <Like />5
      </DetailElement>

      <CommentsContainer show={showComments}>
        <h3>댓글</h3>
        {mycomment?.map((comment) => {
          const createdAtAgo = getTimeAgo(comment.createdAt);
          return (
            <React.Fragment key={comment.commentId}>
              <CommentStyle>
                <ProfilePicSmall src="https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzAyMTVfMTA5%2FMDAxNjc2NDMyNzA5NDIy.Di4Jca6bfg9LaSOaeeO3vwdHwRqMVt-14xV2Xat4raUg.xwfQrSJhrS0WuJUuaAdEalXb_Z1BEEOKx_my1FHX9d0g.JPEG.qmfosej%2FIMG_9285.jpg&type=a340" />
                <UserBox>
                  <span>{comment.commentName}</span>
                  <span>{createdAtAgo}</span>
                </UserBox>
                <IconStyle>
                  {isEditing && editingComment.commentId === comment.commentId ? (
                    <>
                      <CancelIcon onClick={onCancelEditHandler} />
                      <UpdateIcon onClick={onUpdateHandler} />
                    </>
                  ) : (
                    <>
                      <EditIcon onClick={() => onEditHandler(comment)} />
                      <DeleteIcon onClick={() => onDeleteHandler(comment.commentId)} />
                    </>
                  )}
                </IconStyle>
              </CommentStyle>
              <CommentText>{comment.comment}</CommentText>
            </React.Fragment>
          );
        })}

        <CommentInput
          name="comment"
          placeholder={isEditing ? "댓글 수정하기" : "댓글 달기"}
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

const DetailElement = styled.div`
  display: flex;
`;

const CommentIcon = styled(IoChatbubblesOutline)`
  font-size: 1.8rem; // 원하는 크기로 조절
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

const CommentStyle = styled.div`
  border: none;
  width: 325px;
  height: 55px;
  display: flex;
  align-items: center;
  margin-left: 10px;
  margin-top: 5px;
  margin-bottom: -3px;
  /* background-color: #4a92d1; */
`;
const CommentText = styled.span`
  font-size: 14px;
  /* font-weight: 600; */
  margin-left: 10px;
  display: block;
`;

const UserBox = styled.div`
  font-size: 14px;

  span {
    &:first-of-type {
      font-size: 15px;
      font-weight: bold;
      margin-left: 7px;
      color: gray;
    }

    &:not(:last-of-type)::after {
      content: "·";
      margin-left: 5px;
      margin-right: 5px;
      color: gray;
    }

    &:last-of-type {
      font-size: 12px;
      color: gray;
    }
  }
`;

const IconStyle = styled.div`
  position: relative;
  display: flex;
  align-items: flex-end;
  width: 118px;
  height: 40px;
  color: #a5a2a2;
`;

const EditIcon = styled(RiPencilFill)`
  position: absolute;
  right: -60px;
  cursor: pointer;
`;

const DeleteIcon = styled(RiDeleteBin6Fill)`
  position: absolute;
  right: -80px;
  cursor: pointer;
`;

const CancelIcon = styled(RiCloseFill)`
  position: absolute;
  right: -80px;
  cursor: pointer;
`;

const UpdateIcon = styled(RiCheckFill)`
  position: absolute;
  right: -60px;
  cursor: pointer;
`;
