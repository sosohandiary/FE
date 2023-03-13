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
    <div>
      <LogoArea>
        <Logo>IMG</Logo>
      </LogoArea>
      <PhraseArea>
        <Carousel />
      </PhraseArea>
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
`;

const Logo = styled.div`
  width: 200px;
  height: 200px;
  border: 1px solid black;
`;

const PhraseArea = styled.div`
  margin-top: 2vh;
  margin-left: 10vw;
  height: 37vh;
  border: 1px solid black;
  width: 69vw;
  padding: 10px 20px;
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
