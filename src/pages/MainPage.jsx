import React, { useEffect, useState } from "react";
import styled from "styled-components";
import $ from "jquery";
import gsap from "gsap";
import axios from "axios";
import "swiper/css";
import "swiper/css/pagination";
import { useInView } from "react-intersection-observer";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const MainPage = () => {
  // 원형 카로셀
  useEffect(() => {
    const slides = $(".slide__container");
    var activeSlideIndex = 2;

    for (let i = 0; i < slides.length; i++) {
      gsap.set(".slide__container", {
        opacity: 0,
      });
    }

    updateSlider(activeSlideIndex);

    function updateSlider(way) {
      var slideOnLeft,
        slideOnRight,
        slideOnCenter,
        slideToLoad,
        SlideToLoadRotation,
        SlideToUnLoad,
        SlideToUnLoadRotation;

      if (way == "next") {
        activeSlideIndex++;
      } else if (way == "prev") {
        activeSlideIndex--;
      }
      updateIndex();

      slideOnCenter = slides[activeSlideIndex];

      if (activeSlideIndex === slides.length - 1) {
        slideOnRight = slides[0];
      } else {
        slideOnRight = slides[activeSlideIndex + 1];
      }

      if (activeSlideIndex === 0) {
        slideOnLeft = slides[slides.length - 1];
      } else {
        slideOnLeft = slides[activeSlideIndex - 1];
      }

      if (way == "next") {
        slideToLoad = slideOnRight;
        SlideToLoadRotation = -90;
        SlideToUnLoad = slides[activeSlideIndex - 2];
        SlideToUnLoadRotation = 90;
      } else if (way == "prev") {
        slideToLoad = slideOnLeft;
        SlideToLoadRotation = 90;
        SlideToUnLoad = slides[activeSlideIndex + 2];
        SlideToUnLoadRotation = -90;
      }

      if (activeSlideIndex === 0 && way == "next") {
        SlideToUnLoad = slides[slides.length - 2];
      }
      if (activeSlideIndex === 1 && way == "next") {
        SlideToUnLoad = slides[slides.length - 1];
      }
      if (activeSlideIndex === 0 && way == "prev") {
        SlideToUnLoad = slides[2];
      }
      if (activeSlideIndex === 1 && way == "prev") {
        SlideToUnLoad = slides[3];
      }
      if (activeSlideIndex === slides.length - 1 && way == "prev") {
        SlideToUnLoad = slides[1];
      }
      if (activeSlideIndex === slides.length - 2 && way == "prev") {
        SlideToUnLoad = slides[0];
      }

      $(".slide--active").removeClass("slide--active");
      $(slideOnCenter).addClass("slide--active");

      gsap
        .timeline()
        .to(SlideToUnLoad, {
          rotate: SlideToUnLoadRotation,
          opacity: 0,
        })
        .set(
          slideToLoad,
          {
            rotate: SlideToLoadRotation,
            opacity: 0,
          },
          "<"
        )
        .to(
          slideOnCenter,

          {
            opacity: 1,
            rotate: 0,
          },
          "<"
        )
        .to(
          slideOnLeft,

          {
            opacity: 1,
            rotate: 45,
          },
          "<"
        )
        .to(
          slideOnRight,

          {
            opacity: 1,
            rotate: -45,
          },
          "<"
        );
    }

    function updateIndex() {
      if (activeSlideIndex < 0) {
        activeSlideIndex = slides.length - 1;
      } else if (activeSlideIndex > slides.length - 1) {
        activeSlideIndex = 0;
      }
    }

    $(".prev").click(function () {
      updateSlider("prev");
    });
    $(".next").click(function () {
      updateSlider("next");
    });
  }, []);

  //무한스크롤
  const { ref: refForSelfMadePrivate, inView: inViewForSelfMadePrivate } =
    useInView({
      threshold: 0,
    });
  const { ref: refForPrivate, inView: inViewForPrivate } = useInView({
    threshold: 0,
  });
  const { ref: refForPublic, inView: inViewForPublic } = useInView({
    threshold: 0,
  });

  //데이터 겟
  const [selfMadePrivatePage, setSelfMadePrivatePage] = useState(0);
  const [privatePage, setPrivatePage] = useState(0);
  const [publicPage, setPublicPage] = useState(0);
  const [IsLoadingForSelfMadePrivate, setIsLoadingForSelfMadePrivate] =
    useState(false);
  const [IsLoadingForPrivate, setIsLoadingForPrivate] = useState(false);
  const [IsLoadingForPublic, setIsLoadingForPublic] = useState(false);
  const [dataListForSelfMadePrivate, setDataListForSelfMadePrivate] = useState([
    {},
    {},
    {},
    {},
  ]);
  const [dataListForPrivate, setDataListForPrivate] = useState([]);
  const [dataListForPublic, setDataListForPublic] = useState([]);

  const accessToken = window.localStorage.getItem("accessToken");

  // api public에서 바꿔야 합니다.
  useEffect(() => {
    if (inViewForSelfMadePrivate) {
      setIsLoadingForSelfMadePrivate(true);
      axios
        .get(
          `${process.env.REACT_APP_BASEURL}/private?page=${selfMadePrivatePage}&size=5`,
          {
            headers: { Authorization: accessToken },
          }
        )
        .then((res) => {
          setIsLoadingForSelfMadePrivate(false);
          setDataListForSelfMadePrivate((prev) => [
            ...prev,
            ...res.data.content,
          ]);
          setSelfMadePrivatePage((prev) => prev + 1);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [inViewForSelfMadePrivate]);

  // <------------------------------ api상 private에서 invite로 바꿔야 합니다.
  useEffect(() => {
    if (inViewForPrivate) {
      setIsLoadingForPrivate(true);
      axios
        .get(
          `${process.env.REACT_APP_BASEURL}/private?page=${privatePage}&size=5`,
          {
            headers: { Authorization: accessToken },
          }
        )
        .then((res) => {
          setIsLoadingForPrivate(false);
          setDataListForPrivate((prev) => [...prev, ...res.data.content]);
          setPrivatePage((prev) => prev + 1);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [inViewForPrivate]);

  useEffect(() => {
    if (inViewForPublic) {
      setIsLoadingForPublic(true);
      axios
        .get(
          `${process.env.REACT_APP_BASEURL}/public?page=${publicPage}&size=5`,
          {
            headers: { Authorization: accessToken },
          }
        )
        .then((res) => {
          setIsLoadingForPublic(false);
          setDataListForPublic((prev) => [...prev, ...res.data.content]);
          setPublicPage((prev) => prev + 1);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [inViewForPublic]);

  //원형 카로셀
  const [touchStartX, setTouchStartX] = useState(0);
  const carouselTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };
  const carouselTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    if (touchStartX - touchEndX < -5) {
      const prevButton = document.querySelector(".prev");
      prevButton.click();
    } else if (touchStartX - touchEndX > 5) {
      const nextButton = document.querySelector(".next");
      nextButton.click();
    }
  };

  const curUserNickname = useSelector(
    (state) => state.currentUserInfoSlice.userNickname
  );

  return (
    <div>
      {/* 원형 카로셀 */}
      <CircularCarousel
        onTouchStart={carouselTouchStart}
        onTouchEnd={carouselTouchEnd}
      >
        <WelcomeArea>
          <div>
            안녕하세요
            <br />
            {curUserNickname}님!
          </div>
          <div
            style={{
              backgroundColor: "skyblue",
              borderRadius: "50%",
              height: "40px",
              width: "40px",
            }}
          >
            사진
          </div>
        </WelcomeArea>
        <div className="slider__container">
          {dataListForSelfMadePrivate.map((item, i) => {
            console.log(
              "dataListForSelfMadePrivate : ",
              dataListForSelfMadePrivate
            );
            return (
              <div className="slide__container">
                <div className="slide">
                  cc{i} {item.name}
                </div>
              </div>
            );
          })}
          <div className="slide__container">
            <div className="slide" ref={refForSelfMadePrivate}>
              cc End
            </div>
          </div>

          {/* <div className="slide__container">
            <div className="slide">cc 0</div>
          </div>
          <div className="slide__container">
            <div className="slide">cc 1</div>
          </div>
          <div className="slide__container">
            <div className="slide">cc 2</div>
          </div>
          <div className="slide__container">
            <div className="slide">cc 3</div>
          </div>
          <div className="slide__container">
            <div className="slide">cc 4</div>
          </div> */}
        </div>
      </CircularCarousel>
      <div style={{ display: "none" }}>
        <button className="prev">prev</button>
        <button className="next">next</button>
      </div>

      <div style={{ margin: "10px" }}>
        <div>공유 다이어리</div>
        <SwiperArea>
          <Swiper
            slidesPerView={"auto"}
            spaceBetween={30}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            modules={[Pagination]}
            className="mySwiper"
          >
            {dataListForPrivate.map((item) => (
              <SwiperSlide key={item.id}>
                <SlideOne imageUrl={item.img}>
                  <h1>{item.title}</h1>
                  <h3>{item.name}</h3>
                  <p>{item.modifiedAt}</p>
                </SlideOne>
              </SwiperSlide>
            ))}
            {IsLoadingForPrivate ? (
              <div className="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
            ) : (
              ""
            )}
            <span slot="wrapper-end" ref={refForPrivate}>
              PUBLIC 더 넣기
            </span>
          </Swiper>
        </SwiperArea>
        <div>공개 다이어리</div>
        <SwiperArea>
          <Swiper
            slidesPerView={"auto"}
            spaceBetween={30}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            modules={[Pagination]}
            className="mySwiper"
          >
            {dataListForPublic.map((item) => (
              <SwiperSlide key={item.id}>
                <SlideOne imageUrl={item.img}>
                  <h1>{item.title}</h1>
                  <h3>{item.name}</h3>
                  <p>{item.modifiedAt}</p>
                </SlideOne>
              </SwiperSlide>
            ))}
            {IsLoadingForPublic ? (
              <div className="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
            ) : (
              ""
            )}
            <span slot="wrapper-end" ref={refForPublic}>
              PUBLIC 더 넣기
            </span>
          </Swiper>
        </SwiperArea>
      </div>
    </div>
  );
};

export default MainPage;

const WelcomeArea = styled.div`
  display: flex;
  justify-content: space-between;
  z-index: 1;
  position: absolute;
  top: 5vh;
  background-color: #c2e9f9;
  width: 90vw;
`;

const CircularCarousel = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #ededed;
  overflow: hidden;

  .slider__container {
    display: block;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    margin-left: auto;
    margin-right: auto;
    position: relative;
    width: 50%;
    margin-bottom: 20px;
    bottom: 140px;
    &:after {
      content: "";
      display: block;
      padding-bottom: 100%;
    }
    .slide__container {
      position: absolute;
      background: rgba(green, 0.3);
      border-radius: 50%;
      width: 100%;
      height: 100%;

      .slide {
        position: absolute;
        left: 50%;
        bottom: -90px;
        width: 80px;
        height: 80px;
        background-color: red;
        background: rgba(red, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        transform: translate(-50%, 50%);
        transition: all 0.5s ease-in-out;
      }

      &.slide--active {
        .slide {
          width: 120px;
          height: 120px;
        }
      }
    }
  }
`;

const SwiperArea = styled.div`
  body {
    position: relative;
    height: 100%;
  }

  body {
    background: #eee;
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
    background: #fff;

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

  .swiper-slide {
    height: 150px;
    width: 30%;
  }
`;

const SlideOne = styled.div`
  border-radius: 25px;
  font-weight: 700;
  font-size: 10px;
  color: #fff;
  z-index: 1;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
    url(${({ imageUrl }) => imageUrl});
  background-size: cover;
`;
