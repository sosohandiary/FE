import React, { useRef, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import LoginPharse1 from "./login-phrases/LoginPharse1";
import LoginPhrase2 from "./login-phrases/LoginPhrase2";
import LoginPhrase3 from "./login-phrases/LoginPhrase3";
import "../styles/loginCarouselDotsStyle.css";

const Carousel = () => {
  const items = [
    <LoginPharse1 className="item" data-value="1" />,
    <LoginPhrase2 className="item" data-value="2" />,
    <LoginPhrase3 className="item" data-value="3" />,
  ];
  return (
    <AliceCarousel
      key="carousel"
      mouseTracking
      disableButtonsControls
      items={items}
    />
  );
};

export default Carousel;
