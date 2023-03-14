const kakaoLoginApi = () => {
  const REST_API_KEY = "a4f51a54027aba6af7a598bb87bf1439";
  const REDIRECT_URI = "https://sosohandiary.vercel.app";
  window.location.href = `/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
};

export { kakaoLoginApi };
