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
