import React from "react";
import { useNavigate } from "react-router-dom";
import Carousel from "../components/Carousel";
import { WholeAreaWithMargin, WholeViewWidth } from "../styles/WholeAreaStyle";
import { MintButtonLarge } from "../styles/Buttons";
import { TfiArrowRight } from "react-icons/tfi";
import styled from "styled-components";

const OnBoarding = () => {
  const navigate = useNavigate();
  const goToLogin = () => {
    navigate("/login");
  };
  return (
    <WholeAreaWithMargin>
      <WholeViewWidth>
        <Carousel />
      </WholeViewWidth>
      <MintButtonLarge onClick={goToLogin}>
        공유 다이어리 시작하기
      </MintButtonLarge>
      <NextArrow>
        <TfiArrowRight className="TfiArrowRight" />
      </NextArrow>
    </WholeAreaWithMargin>
  );
};

export default OnBoarding;

const NextArrow = styled.div`
  .TfiArrowRight {
    font-size: 40px;
    position: relative;
    left: 130px;
  }
`;
