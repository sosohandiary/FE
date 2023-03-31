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
import { useSelector } from "react-redux";
import Navigationbar from "../components/Navigationbar";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const MainPage = () => {
  const navigate = useNavigate();

  //비로그인 -> 로그인창으로
  const accessToken = window.localStorage.getItem("accessToken");
  useEffect(() => {
    if (accessToken === null) {
      navigate("/login");
    }
  }, []);

  //무한스크롤

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
  const [dataListForSelfMadePrivate, setDataListForSelfMadePrivate] = useState(
    []
  );
  const [dataListForPrivate, setDataListForPrivate] = useState([]);
  const [dataListForPublic, setDataListForPublic] = useState([]);

  // api public에서 바꿔야 합니다.
  useEffect(() => {
    setIsLoadingForSelfMadePrivate(true);
    axios
      .get(`${process.env.REACT_APP_BASEURL}/private`, {
        headers: { Authorization: accessToken },
      })
      .then((res) => {
        console.log(res);
        setIsLoadingForSelfMadePrivate(false);
        setDataListForSelfMadePrivate((prev) => [...prev, ...res.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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

          setDataListForPrivate((prev) => [...prev, ...res.data]);
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

  const curUserNickname = useSelector(
    (state) => state.currentUserInfoSlice.userNickname
  );

  const goToDiaryDetail = (id) => {
    navigate(`/diaries/${id}`);
  };

  return (
    <div>
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
      <Label>공유 다이어리</Label>
      <SwiperArea>
        <Swiper
          slidesPerView={"auto"}
          spaceBetween={20}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {dataListForSelfMadePrivate.map((item) => (
            <SwiperSlide
              key={item.id}
              onClick={() => {
                goToDiaryDetail(item.id);
              }}
            >
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
          <span
            slot="wrapper-end"
            ref={refForPrivate}
            style={{ margin: "0px 10px" }}
          >
            <Skeleton width={140} height={196} borderRadius={25} />
          </span>
          <span slot="wrapper-end" style={{ margin: "0px 10px" }}>
            <Skeleton width={140} height={196} borderRadius={25} />
          </span>
          <span slot="wrapper-end" style={{ margin: "0px 10px" }}>
            <Skeleton width={140} height={196} borderRadius={25} />
          </span>
        </Swiper>
      </SwiperArea>
      <div style={{ display: "none" }}>
        <button className="prev">prev</button>
        <button className="next">next</button>
      </div>
      <div style={{ margin: "10px 10px 80px 10px" }}>
        <Label>공유 다이어리</Label>
        <SwiperArea>
          <Swiper
            slidesPerView={"auto"}
            spaceBetween={20}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            modules={[Pagination]}
            className="mySwiper"
          >
            {dataListForPrivate.map((item) => (
              <SwiperSlide
                key={item.id}
                onClick={() => {
                  goToDiaryDetail(item.id);
                }}
              >
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
            <span
              slot="wrapper-end"
              ref={refForPrivate}
              style={{ margin: "0px 10px 0px 0px" }}
            >
              <Skeleton width={140} height={196} borderRadius={25} />
            </span>
            <span slot="wrapper-end" style={{ margin: "0px 10px" }}>
              <Skeleton width={140} height={196} borderRadius={25} />
            </span>
            <span slot="wrapper-end" style={{ margin: "0px 10px" }}>
              <Skeleton width={140} height={196} borderRadius={25} />
            </span>
          </Swiper>
        </SwiperArea>
        <Label>공개 다이어리</Label>
        <SwiperArea>
          <Swiper
            slidesPerView={"auto"}
            spaceBetween={20}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            modules={[Pagination]}
            className="mySwiper"
          >
            {dataListForPublic.map((item) => (
              <SwiperSlide
                key={item.id}
                onClick={() => {
                  goToDiaryDetail(item.id);
                }}
              >
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
            <span
              slot="wrapper-end"
              ref={refForPublic}
              style={{ margin: "0px 10px" }}
            >
              <Skeleton width={140} height={196} borderRadius={25} />
            </span>
            <span slot="wrapper-end" style={{ margin: "0px 10px" }}>
              <Skeleton width={140} height={196} borderRadius={25} />
            </span>
            <span slot="wrapper-end" style={{ margin: "0px 10px" }}>
              <Skeleton width={140} height={196} borderRadius={25} />
            </span>
          </Swiper>
        </SwiperArea>
      </div>
      <Navigationbar />
    </div>
  );
};

export default MainPage;

const WelcomeArea = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px auto;

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
    width: 70%;
    margin-bottom: 50px;
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
        width: 90px;
        height: 126px;
        border-radius: 25px;
        background-color: red;
        /* background: rgba(red, 0.5); */
        display: flex;
        justify-content: center;
        align-items: center;
        transform: translate(-50%, 50%);
        transition: all 0.5s ease-in-out;
      }

      &.slide--active {
        .slide {
          width: 140px;
          height: 196px;
        }
      }
    }
  }
`;

const SwiperArea = styled.div`
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
    height: 196px;
    width: 140px;
  }
`;

const Label = styled.div`
  margin: 10px;
  font-weight: 800;
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
