import React from "react";
import Carousel from "../components/Carousel";
import styled from "styled-components";
import kakaoLogin from "../assets/kakao_login_medium_wide.png";

const Login = () => {
  const kakaoLoginButtonHandler = () => {
    alert("카카오 로그인");
  };

  const otherWayLoginButtonHandler = () => {
    alert("다른 방법으로 로그인");
  };

  return (
    <div style={{ width: "100vw" }}>
      <LogoArea>
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFwAAABcCAMAAADUMSJqAAAAM1BMVEX///+P1faJ0/aD0fXQ7Pvm9f2d2vd+0PXv+P7g8vz4/P7z+v7H6fut3/il3PjC5/q14vnqAUkaAAAB/ElEQVRoge1ZyZaEIAzEsAhu+P9fOxpcuucNa3dd5llXoQhJJUAU4sGDBw/SGKxTk/eTcnb4KvGoZkO9JIbsycxq/A6zncxG271hW8JM9mNqN/8mvheY3WfUS4w60C/t9HaW9Eol+w1vLiI5NzpH3TQk5bIqpzc4tS7yXpRItXAv8ppvvH7/pr25VpZLNbXt6KRe9V8D9HrSU1fpGn1R+6iix5v+z+VjcHRuOWmUPV1HFao57ZbZYClZa7ulw5cFM/QRGyr1+2GMKSpQgzm2Wca98GgqVljN+OBGMqXcQgTb8wG6HN5VFO2hK3X7HMyoUq4Om51z45ws3eIrgitlTu0cnfJgVk0LqVks2gshUplEZY+Tr+UWYqWs1w8DGk7fMb/liddf67lP06fECFNfQE+EYpdIvVFmBqTAhsm4R1VrOHd4nhxPENZKXXLe4DRN6CXsrI1biLRPB45J/WF+YGE1xAqe7ZuFuIPF2MeUzkWr7ZKzg+UQLV7pr1mkbWMx9Y1i2eTSp3L0K+SxLIGST0i3QAMKlSI0iaDpDy1c2JILPSygxxz0gMZeLaCXIuh1DnsRhV6hsZd/6LMF++CCPhWxj1zs8xzbWIC2RLDNHGwbCttAE9DWn8A2LbHtVgFtFDM9rsW9A9icZ+B+KxzYf4j4DV//IfLgwYP/iB/IARJeyL/yUwAAAABJRU5ErkJggg==" />
      </LogoArea>
      <div>
        <Carousel />
      </div>
      <LoginArea>
        <div>
          <img
            src={kakaoLogin}
            alt="카카오 로그인"
            onClick={kakaoLoginButtonHandler}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <OtherLogin onClick={otherWayLoginButtonHandler}>
            다른 방법으로 로그인
          </OtherLogin>
        </div>
      </LoginArea>
    </div>
  );
};

export default Login;

const LogoArea = styled.div`
  margin-top: 8vh;
  display: flex;
  justify-content: center;
  img {
    width: 200px;
    height: 200px;
    border: 1px solid rgb(194, 194, 194);
  }
`;

const LoginArea = styled.div`
  margin-top: 5px;
  div {
    text-align: center;
    margin: 5px 0px;
  }
`;

const OtherLogin = styled.div`
  width: 300px;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgb(162, 162, 162);
  background-color: rgb(242, 242, 242);
  border-radius: 5px;
`;
