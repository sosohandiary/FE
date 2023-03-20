import axios from "axios";

export const getMypage = async (accessToken) => {
  return await axios.get(`${process.env.REACT_APP_BASEURL}/mypage/diaries`, {
    headers: { Authorization: accessToken },
  });
};

export const getProfile = async (accessToken) => {
  return await axios.get(`${process.env.REACT_APP_BASEURL}/mypage/profile`, {
    headers: { Authorization: accessToken },
  });
};

export const editProfile = async (editData, accessToken) => {
  return await axios.patch(`${process.env.REACT_APP_BASEURL}/mypage/profile/edit`, editData,{
    headers: { Authorization: accessToken },
  });
}

export const getFriendsCount = async (accessToken) => {
  return await axios.get(`${process.env.REACT_APP_BASEURL}/mypage/friend/count`, {
    headers: { Authorization: accessToken },
  });
};

export const getDiaryCount = async (accessToken) => {
  return await axios.get(`${process.env.REACT_APP_BASEURL}/mypage/diary/count`, {
    headers: { Authorization: accessToken },
  });
};

export const deleteAccount = async (accessToken) => {
  return await axios.delete(`${process.env.REACT_APP_BASEURL}/mypage/out`, {
    headers: { Authorization: accessToken },
  });
};


//친구목록 조회
export const getMyfriends = async (accessToken) => {
  return await axios.get(`${process.env.REACT_APP_BASEURL}/mypage/friend/myfriends`, {
    headers: { Authorization: accessToken },
  });
};
