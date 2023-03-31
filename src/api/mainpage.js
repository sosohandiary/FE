import axios from "axios";

export const getDataListForSelfMadePrivate = async (accessToken) => {
  return await axios.get(`${process.env.REACT_APP_BASEURL}/private`, {
    headers: { Authorization: accessToken },
  });
};

export const getDataListForPrivate = async (accessToken, pageParam) => {
  return await axios.get(`${process.env.REACT_APP_BASEURL}/invite`, {
    headers: { Authorization: accessToken },
    params: { page: pageParam, size: 5 },
  });
};

export const getDataListForPublic = async (accessToken, pageParam) => {
  return await axios
    .get(`${process.env.REACT_APP_BASEURL}/public`, {
      headers: { Authorization: accessToken },
      params: { page: pageParam, size: 5 },
    })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};
