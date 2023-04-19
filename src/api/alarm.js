import axios from "axios";

export const getInviteAlarm = (accessToken) => {
  return axios.get(`${process.env.REACT_APP_BASEURL}/invite/alarm`, {
    headers: { Authorization: accessToken },
  });
};

export const getFriendRequests = (accessToken) => {
  return axios.get(`${process.env.REACT_APP_BASEURL}/friend/request`, {
    headers: { Authorization: accessToken },
  });
};

export const getCommentAlarm = (accessToken) => {
  return axios.get(`${process.env.REACT_APP_BASEURL}/friend/request`, {
    headers: { Authorization: accessToken },
  });
};
