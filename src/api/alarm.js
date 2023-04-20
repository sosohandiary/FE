import axios from "axios";

export const axiosInviteAlarm = (accessToken) => {
  return axios.get(`${process.env.REACT_APP_BASEURL}/invite/alarm`, {
    headers: { Authorization: accessToken },
  });
};

export const axiosFriendRequests = (accessToken) => {
  return axios.get(`${process.env.REACT_APP_BASEURL}/friend/request`, {
    headers: { Authorization: accessToken },
  });
};

export const axiosCommentAlarm = (accessToken) => {
  return axios.get(`${process.env.REACT_APP_BASEURL}/comment/alarm`, {
    headers: { Authorization: accessToken },
  });
};

export const deleteFriendAlarm = (accessToken, friendListId) => {
  return axios.patch(
    `${process.env.REACT_APP_BASEURL}/friend/request/read/${friendListId}`,
    {},
    { headers: { Authorization: accessToken } }
  );
};

export const deleteInviteAlarm = (accessToken, inviteId) => {
  return axios.patch(
    `${process.env.REACT_APP_BASEURL}/invite/alarm/read/${inviteId}`,
    {},
    { headers: { Authorization: accessToken } }
  );
};

export const deleteCommentAlarm = (accessToken, commentId) => {
  return axios.patch(
    `${process.env.REACT_APP_BASEURL}/comment/alarm/${commentId}`,
    {},
    { headers: { Authorization: accessToken } }
  );
};

export const acceptFriendAlarm = (accessToken, id) => {
  return axios.put(
    `${process.env.REACT_APP_BASEURL}/friend/request/accept/${id}`,
    {},
    {
      headers: { Authorization: accessToken },
    }
  );
};
