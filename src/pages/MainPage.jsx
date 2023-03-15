import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Carousel from "../components/Carousel";
import { subColor1 } from "../constants/colorPalette";

const MainPage = () => {
  const navigate = useNavigate();
  const goToLogin = () => {
    navigate("/login");
  };
  return (
    <div>
      <Carousel />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <StartButtonStyle onClick={goToLogin}>
          공유 다이어리 시작하기
        </StartButtonStyle>
      </div>
    </div>
  );
};

export default MainPage;

const StartButtonStyle = styled.div`
  background-color: rgb(${subColor1});
  width: 300px;
  height: 45px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  cursor: pointer;
`;
