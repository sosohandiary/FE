import axios from "axios";

const kakaoLoginApi = () => {
  const REDIRECT_URI = "http://localhost:3000/oauth";
  console.log("ddd");
  // axios
  //   .get(
  //     `http://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`
  //   )
  //   .then((res) => console.log("res : ", res))
  //   .catch((err) => console.log("err : ", err));
  window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
};

export { kakaoLoginApi };
