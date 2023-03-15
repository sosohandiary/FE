import React from "react";
import { useNavigate } from "react-router-dom";
import Carousel from "../components/Carousel";
import { LongButtonStyle } from "../styles/LongButtonStyle";

const MainPage = () => {
  const navigate = useNavigate();
  const goToLogin = () => {
    navigate("/login");
  };
  return (
    <div>
      <Carousel />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <LongButtonStyle onClick={goToLogin}>
          공유 다이어리 시작하기
        </LongButtonStyle>
      </div>
    </div>
  );
};

export default MainPage;
