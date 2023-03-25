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
