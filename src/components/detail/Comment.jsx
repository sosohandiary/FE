import styled from "styled-components";
import { ProfilePicSmall } from "../ProfilePics";
import { getDate } from "../../utils/getDate";
import { RiPencilFill, RiDeleteBin6Fill } from "react-icons/ri";
import { getComment, deleteComment } from "../../api/comment";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";

function getTimeAgo(createdAt) {
  const date = new Date(createdAt);
  const now = new Date();
  const diff = Math.floor((now - date) / 1000); // 차이 초단위로 계산

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

const Comment = () => {
  const accessToken = localStorage.getItem("accessToken");
  const queryClient = useQueryClient();
  const { id } = useParams();

  const { data: commentData } = useQuery(["getComment"], () => getComment(id, accessToken));

  // console.log("받아옵니까", commentData);

  const { mutate: deleteCommentMutate } = useMutation((commentId) => deleteComment(id, commentId, accessToken), {
    onSuccess: () => {
      queryClient.invalidateQueries("getComment");
    },
  });

  const mycomment = commentData?.data;

  const onDeleteHandler = (commentId) => {
    deleteCommentMutate(commentId);
  };

  return (
    <>
      {mycomment?.map((comment) => {
        const createdAtAgo = getTimeAgo(comment.createdAt);
        return (
          <>
            <CommentStyle>
              <ProfilePicSmall src="https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzAyMTVfMTA5%2FMDAxNjc2NDMyNzA5NDIy.Di4Jca6bfg9LaSOaeeO3vwdHwRqMVt-14xV2Xat4raUg.xwfQrSJhrS0WuJUuaAdEalXb_Z1BEEOKx_my1FHX9d0g.JPEG.qmfosej%2FIMG_9285.jpg&type=a340" />
              <UserBox>
                <span>{comment.commentName}</span>
                <span>{createdAtAgo}</span> {/* 변환된 날짜값 표시 */}
              </UserBox>
              <IconStyle>
                <EditIcon />
                <DeleteIcon onClick={() => onDeleteHandler(comment.commentId)} />
              </IconStyle>
            </CommentStyle>
            <CommentText>{comment.comment}</CommentText>
          </>
        );
      })}
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
    font-size: 15px;
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
  right: -80px;
  cursor: pointer;
`;

const DeleteIcon = styled(RiDeleteBin6Fill)`
  position: absolute;
  right: -100px;
  cursor: pointer;
`;
