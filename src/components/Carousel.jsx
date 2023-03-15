import React, { useRef, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import "../styles/loginCarouselDotsStyle.css";
import styled from "styled-components";
import BrandStory1 from "./main-brandstory/BrandStory1";
import BrandStory2 from "./main-brandstory/BrandStory2";
import BrandStory3 from "./main-brandstory/BrandStory3";
import BrandStory4 from "./main-brandstory/BrandStory4";

const Carousel = () => {
  const items = [
    <CardStyle style={{ display: "flex", justifyContent: "center" }}>
      <BrandStory1 className="item" data-value="1" />
    </CardStyle>,
    <CardStyle>
      <BrandStory2 className="item" data-value="2" />
    </CardStyle>,
    <CardStyle>
      <BrandStory3 className="item" data-value="3" />
    </CardStyle>,
    <CardStyle>
      <BrandStory4 className="item" data-value="4" />
    </CardStyle>,
  ];
  return (
    <DotStyle>
      <AliceCarousel
        key="carousel"
        mouseTracking
        disableButtonsControls
        items={items}
      />
    </DotStyle>
  );
};

export default Carousel;

const CardStyle = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10vh;
`;

const DotStyle = styled.div`
  .alice-carousel__dots {
    margin: 30px 0;
  }
  .alice-carousel__dots-item {
    margin: 0 -15px;
  }
`;
