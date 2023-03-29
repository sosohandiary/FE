import React, { useState } from "react";
import styled, { keyframes, css } from "styled-components";
import { ProfilePicSmall } from "../ProfilePics";
import { RiPencilFill, RiDeleteBin6Fill, RiCheckFill, RiCloseFill } from "react-icons/ri";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { addComment, getComment, deleteComment, updatedComment } from "../../api/detail";
import { useParams } from "react-router-dom";
import Like from "./Like";

const CommentBox = () => {
  const [showComments] = useState(true);
  const [comment, setComment] = useState({
    comment: "",
  });

  const toggleComments = () => {
    setShowComments((prev) => !prev);
  };

  const queryClient = useQueryClient();
  const { id } = useParams();
  const accessToken = localStorage.getItem("accessToken");

  const { mutate: addmutation } = useMutation(() => addComment(id, comment, accessToken), {
    onSuccess: (data) => {
      console.log("data", data);
      queryClient.invalidateQueries("getComment");
    },
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
    addmutation();
    setComment({ comment: "" });
  };

  return (
    <div>
      <WholeAreaWithMargin>
        <CommentsContainer show={showComments}>
          <h3>댓글</h3>

          {mycomment?.map((comment) => {
            const createdAtAgo = <GetTimeAgo createdAt={comment.createdAt} />;
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
        </CommentsContainer>
      </WholeAreaWithMargin>

      <WholeAreaWithMargin>
        <CommentInput
          name="comment"
          placeholder={isEditing ? "댓글 수정하기" : "댓글 달기"}
          value={comment.comment}
          onChange={inputChangeHandler}
          onKeyDown={handleKeyDown}
        />
      </WholeAreaWithMargin>
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
  height: 600px;
  display: ${(props) => (props.show ? "block" : "none")};
  border: none;
  /* background-color: #f1f1f1; */
  /* border-radius: 30px 30px 0px 0px; */
  padding: 10px;
  margin-top: -25px;
  margin-bottom: -25px;
  overflow-y: auto;
  position: relative;

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
  width: 360px;
  height: 40px;
  /* margin-top: 10px; */
  padding: 5px;
  /* resize: none; */
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
