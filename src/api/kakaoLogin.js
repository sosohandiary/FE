import axios from "axios";

const kakaoLoginApi = () => {
  const REDIRECT_URI = "https://sosohandiary.shop/login/kakao";
  console.log("ddd");
  axios
    .get(
      `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`
    )
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

export { kakaoLoginApi };
