import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper";
import styled from "styled-components";

const TestAnimation = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const dataList = [
    { id: 0 },
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
    { id: 7 },
  ];

  return (
    <AllStyle>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        onSlideChange={(e) => setActiveIdx(e.activeIndex)}
        className="mySwiper"
      >
        {dataList.map((item) => (
          <SwiperSlide>
            <SlideStyle idx={item.id} activeIdx={activeIdx}>
              Slide {item.id}
            </SlideStyle>
          </SwiperSlide>
        ))}
      </Swiper>
    </AllStyle>
  );
};

export default TestAnimation;

const AllStyle = styled.div`
  #app {
    height: 100%;
  }
  html,
  body {
    position: relative;
    height: 100%;
  }

  body {
    background: #eee;
    font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
    font-size: 14px;
    color: #000;
    margin: 0;
    padding: 0;
  }

  .swiper {
    width: 100%;
    height: 100%;
  }

  .swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #cecedb;
    height: 300px;

    /* Center slide text vertically */
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const SlideStyle = styled.div`
  transition: 0.5s;
  background-color: #e3d7d7;

  height: ${({ idx, activeIdx }) =>
    idx === activeIdx + 1 ? "168px" : "140px"};
  width: ${({ idx, activeIdx }) => (idx === activeIdx + 1 ? "120px" : "100px")};
  border-radius: 25px;
  margin-bottom: ${({ idx, activeIdx }) =>
    idx === activeIdx + 1
      ? "0px"
      : idx === activeIdx || idx === activeIdx + 2
      ? "75px"
      : "150px"};
`;
