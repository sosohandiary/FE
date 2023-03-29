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
  return await axios.patch(
    `${process.env.REACT_APP_BASEURL}/mypage/profile/edit`,
    editData,
    {
      headers: { Authorization: accessToken },
    }
  );
};

export const getFriendsCount = async (accessToken) => {
  return await axios.get(
    `${process.env.REACT_APP_BASEURL}/mypage/friend/count`,
    {
      headers: { Authorization: accessToken },
    }
  );
};

export const getDiaryCount = async (accessToken) => {
  return await axios.get(
    `${process.env.REACT_APP_BASEURL}/mypage/diary/count`,
    {
      headers: { Authorization: accessToken },
    }
  );
};

export const deleteAccount = async (accessToken) => {
  return await axios.delete(`${process.env.REACT_APP_BASEURL}/mypage/out`, {
    headers: { Authorization: accessToken },
  });
};

//친구목록 조회
export const getMyfriends = async (accessToken) => {
  return await axios.get(
    `${process.env.REACT_APP_BASEURL}/mypage/friend/myfriends`,
    {
      headers: { Authorization: accessToken },
    }
  );
};

//친구 삭제
export const deleteFriend = async (friendId, accessToken) => {
  return await axios.delete(`${process.env.REACT_APP_BASEURL}/friend/list/${friendId}`, {
    headers: { Authorization: accessToken },
  });
};

//친구추가요청목록
export const getRequested = async (accessToken) => {
  return await axios.get(
    `${process.env.REACT_APP_BASEURL}/friend/request`,
    {
      headers: { Authorization: accessToken },
    }
  );
};


//친구 추가 수락 테스트
export const acceptFriend = async (friend_id, accessToken) => {
  return await axios.put(
    `${process.env.REACT_APP_BASEURL}/friend/request/accept/${friend_id}`,{},
    {
      headers: { Authorization: accessToken },
    }
  );
};