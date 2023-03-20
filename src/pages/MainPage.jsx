import React from "react";
import { useNavigate } from "react-router-dom";
import Carousel from "../components/Carousel";
import { WholeAreaWithMargin, WholeViewWidth } from "../styles/WholeAreaStyle";
import { MintButtonLarge } from "../styles/Buttons";
import { LongButtonStyle } from "../styles/LongButtonStyle";
const MainPage = () => {
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
    </WholeAreaWithMargin>
  );
};

export default MainPage;
