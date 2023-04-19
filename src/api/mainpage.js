import axios from "axios";

export const axiosDiariesOfSelfmade = (accessToken) => {
  return axios.get(`${process.env.REACT_APP_BASEURL}/private`, {
    headers: { Authorization: accessToken },
  });
};

export const axiosPublicDiaries = (page) => {
  return axios.get(
    `${process.env.REACT_APP_BASEURL}/public?page=${page}&size=10`
  );
};

export const axiosInvitedDiaries = (accessToken, page) => {
  return axios.get(
    `${process.env.REACT_APP_BASEURL}/invite?page=${page}&size=10`,
    {
      headers: { Authorization: accessToken },
    }
  );
};
