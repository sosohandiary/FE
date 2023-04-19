import { useRef } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import styled from "styled-components";
import { TfiArrowRight } from "react-icons/tfi";
import { WholeAreaWithMargin } from "../styles/WholeAreaStyle";
import { BrandStoryStyle } from "../styles/BrandStoryStyle";
import { MintButtonLarge } from "../styles/Buttons";
import { useNavigate } from "react-router-dom";

const Carousel = () => {
  const navigate = useNavigate();
  const goToSignup = () => {
    navigate("/signup");
  };

  const items = [
    <CardStyle style={{ display: "flex", justifyContent: "center" }}>
      <div>
        <BrandStoryStyle
          style={{ backgroundColor: "transparent" }}
          className="item"
          data-value="1"
        >
          <div style={{ height: "50%" }}></div>
          <h1>
            일상을 공유하는
            <br />
            소소한 다이어리,
            <br />
            소다
          </h1>
          <p>
            소소한 다이어리 소다에
            <br />
            여러분의 소중한 일상을 담아보세요
          </p>
        </BrandStoryStyle>
        <WholeAreaWithMargin>
          <NextArrowArea key="btns" className="b-refs-buttons">
            <TfiArrowRight onClick={(e) => carousel?.current?.slideNext(e)} />
          </NextArrowArea>
        </WholeAreaWithMargin>
      </div>
    </CardStyle>,
    <CardStyle>
      <div>
        <BrandStoryStyle className="item" data-value="2"></BrandStoryStyle>{" "}
        <WholeAreaWithMargin>
          <NextArrowArea key="btns" className="b-refs-buttons">
            <TfiArrowRight onClick={(e) => carousel?.current?.slideNext(e)} />
          </NextArrowArea>
        </WholeAreaWithMargin>
      </div>
    </CardStyle>,
    <CardStyle>
      <div>
        <BrandStoryStyle className="item" data-value="3"></BrandStoryStyle>
        <WholeAreaWithMargin>
          <NextArrowArea key="btns" className="b-refs-buttons">
            <TfiArrowRight onClick={(e) => carousel?.current?.slideNext(e)} />
          </NextArrowArea>
        </WholeAreaWithMargin>
      </div>
    </CardStyle>,
    <CardStyle>
      <div>
        <BrandStoryStyle className="item" data-value="4"></BrandStoryStyle>
        <MintButtonArea>
          <MintButtonLarge onClick={goToSignup}>
            공유 다이어리 시작하기
          </MintButtonLarge>
        </MintButtonArea>
      </div>
    </CardStyle>,
  ];

  const carousel = useRef(null);

  return (
    <div>
      <DotStyle>
        <AliceCarousel
          key="carousel"
          mouseTracking
          disableButtonsControls
          items={items}
          ref={carousel}
          autoPlay
          autoPlayInterval={2000}
          animationDuration={1000}
        />
      </DotStyle>
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

const NextArrowArea = styled.div`
  position: relative;
  font-size: 40px;
  top: 40px;
  left: 140px;
  .TfiArrowRight {
  }
`;

const MintButtonArea = styled.div`
  margin-top: 63px;
`;
