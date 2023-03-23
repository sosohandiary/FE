import axios from "axios";

//댓글추가
export const addComment = async (id, newComment, accessToken) => {
  return await axios.post(`${process.env.REACT_APP_BASEURL}/detail/${id}/comment`, newComment, {
    headers: { Authorization: accessToken },
  });
};
