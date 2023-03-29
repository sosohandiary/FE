import React from "react";
import { useNavigate } from "react-router-dom";
import Carousel from "../components/Carousel";
import { WholeAreaWithMargin, WholeViewWidth } from "../styles/WholeAreaStyle";
import { MintButtonLarge } from "../styles/Buttons";

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
    </WholeAreaWithMargin>
  );
};

export default OnBoarding;
