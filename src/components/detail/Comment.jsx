import React from "react";
import styled from "styled-components";
import { ProfilePicSmall } from "../ProfilePics";
import { getDate } from "../../utils/getDate";
import { RiPencilFill, RiDeleteBin6Fill } from "react-icons/ri";
import { getComment } from "../../api/comment";

const Comment = ({ comment }) => {
  return (
    <>
      <CommentStyle>
        <ProfilePicSmall src="https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzAyMTVfMTA5%2FMDAxNjc2NDMyNzA5NDIy.Di4Jca6bfg9LaSOaeeO3vwdHwRqMVt-14xV2Xat4raUg.xwfQrSJhrS0WuJUuaAdEalXb_Z1BEEOKx_my1FHX9d0g.JPEG.qmfosej%2FIMG_9285.jpg&type=a340" />
        <UserBox>
          {/* 데이터받아오기 */}
          <span>username</span>
          <span>2023.03.23</span>
        </UserBox>
        <IconStyle>
          <EditIcon />
          <DeleteIcon />
        </IconStyle>
      </CommentStyle>
      <CommentText>{comment}</CommentText>
    </>
  );
};

export default Comment;

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

  span:first-child {
    font-size: 20px;
    font-weight: bold;
    margin-right: 5px;
    margin-left: 7px;
    color: #2b2a2a;
  }

  span:last-child {
    font-size: 12px;
    color: gray;
  }
`;

const IconStyle = styled.div`
  position: relative;
  display: flex;
  align-items: flex-end;
  width: 118px;
  height: 50px;
  color: #a5a2a2;
`;

const EditIcon = styled(RiPencilFill)`
  position: absolute;
  right: -10px;
`;

const DeleteIcon = styled(RiDeleteBin6Fill)`
  position: absolute;
  right: -30px;
`;
