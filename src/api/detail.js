import axios from "axios";

//댓글추가
export const addComment = async (id, newComment, accessToken) => {
  return await axios.post(`${process.env.REACT_APP_BASEURL}/detail/${id}/comment`, newComment, {
    headers: { Authorization: accessToken },
  });
};

//댓글 조회
export const getComment = async (id, accessToken) => {
  return await axios.get(`${process.env.REACT_APP_BASEURL}/detail/${id}/comments`, {
    headers: { Authorization: accessToken },
  });
};

//댓글 삭제
export const deleteComment = async (id, commentId, accessToken) => {
  return await axios.delete(`${process.env.REACT_APP_BASEURL}/detail/${id}/comment/${commentId}`, {
    headers: { Authorization: accessToken },
  });
};

//댓글 수정
export const updatedComment = async (id, commentId, editdComment, accessToken) => {
  return await axios.patch(`${process.env.REACT_APP_BASEURL}/detail/${id}/comment/${commentId}`, editdComment, {
    headers: { Authorization: accessToken },
  });
};

//좋아요
export const likePost = async (id, accessToken) => {
  return await axios.post(`${process.env.REACT_APP_BASEURL}/detail/${id}/like`, {
    headers: { Authorization: accessToken },
  });
};
