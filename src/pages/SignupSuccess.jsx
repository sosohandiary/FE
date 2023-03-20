import React from "react";
import styled from "styled-components";
import {
  WholeAreaStyle,
  WholeAreaWithMargin,
} from "../styles/\bWholeAreaStyle";
import { LongButtonStyle } from "../styles/LongButtonStyle";

const SignupSuccess = () => {
  return (
    <WholeAreaWithMargin>
      <CelebratingMsg>
        소다님,
        <br />
        회원가입을 축하합니다!
      </CelebratingMsg>
      <Circle></Circle>
      <WelcomeMsg>3초후 홈으로 이동합니다</WelcomeMsg>
      <WelcomeMsg>이제부터 소소한 일상을 담아보세요!</WelcomeMsg>
      <LongButtonStyle>홈으로 가기</LongButtonStyle>
    </WholeAreaWithMargin>
  );
};

export default SignupSuccess;

const CelebratingMsg = styled.h2`
  margin-top: 8vh;
  position: relative;
  right: 20px;
`;
const Circle = styled.div`
  background-color: #d6d6d6;
  height: 30vh;
  width: 30vh;
  border-radius: 50%;
  margin: 8vh 0px;
`;

const WelcomeMsg = styled.div`
  margin-top: -1vh;
  margin-bottom: 4vh;
`;
