import React, { useRef, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import styled from "styled-components";
import BrandStory1 from "./main-brandstory/BrandStory1";
import BrandStory2 from "./main-brandstory/BrandStory2";
import BrandStory3 from "./main-brandstory/BrandStory3";
import BrandStory4 from "./main-brandstory/BrandStory4";
import { TfiArrowRight } from "react-icons/tfi";
import { WholeAreaWithMargin } from "../styles/WholeAreaStyle";

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

  const [mainIndex, setMainIndex] = useState(0);
  const [animation, setAnimation] = useState(false);

  const syncMainBeforeChange = (e) => {
    console.log(e);
    console.log("before");
    setAnimation(true);
  };

  const syncMainAfterChange = (e) => {
    setMainIndex(e.item);
    console.log("after");
    setAnimation(false);
  };

  const toNextSlide = () => {
    if (!animation && mainIndex < items.length - 1) {
      setAnimation(true);
      setMainIndex(mainIndex + 1);
    }
    console.log(mainIndex);
  };

  return (
    <div>
      <DotStyle>
        <AliceCarousel
          activeIndex={mainIndex}
          key="carousel"
          mouseTracking={!animation}
          disableButtonsControls
          items={items}
          autoPlay
          autoPlayInterval={2000}
          animationDuration={1000}
          animationType="slide"
          onSlideChange={syncMainBeforeChange}
          onSlideChanged={syncMainAfterChange}
        />
      </DotStyle>
      <WholeAreaWithMargin>
        <NextArrow>
          <TfiArrowRight className="TfiArrowRight" onClick={toNextSlide} />
        </NextArrow>
      </WholeAreaWithMargin>
    </div>
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
    margin: -90px 0;
  }
  .alice-carousel__dots-item {
    margin: 0 -15px;
  }
  .alice-carousel__dots-item.__active {
    background-color: #c6c6c6;
  }
`;

const NextArrow = styled.div`
  .TfiArrowRight {
    font-size: 40px;
    position: relative;
    top: 94px;
    left: 130px;
  }
`;
