import React, { useEffect, useState } from "react";
import styled from "styled-components";
import defaultProfileImg from "../assets/defaultProfileImg.jpeg";
import { WholeArea } from "../styles/WholeAreaStyle";
import "react-alice-carousel/lib/alice-carousel.css";
import Navigationbar from "../components/Navigationbar";
import { useQuery } from "react-query";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");
  // useEffect(() => {
  //   if (!accessToken) {
  //     navigate("/login");
  //   }
  // }, []);

  const [filterMode, setFilterMode] = useState("ALL");

  const currentLoginUser = useSelector((state) => state.currentUserInfoSlice);

  // useEffect(() => {
  //   return axios
  //     .get(`${process.env.REACT_APP_BASEURL}/?page=0&size=5`, {
  //       headers: { Authorization: accessToken },
  //     })
  //     .then((res) => console.log(res))
  //     .catch((err) => console.log(err));
  // }, []);

  // 데이터 수신
  const { data, isLoading, isError, error } = useQuery(["getDiaries"], () => {
    return axios.get(`${process.env.REACT_APP_BASEURL}/?page=1&size=5`, {
      headers: { Authorization: accessToken },
    });
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
  // useEffect(() => {
  //   setIsLoadingForSelfMadePrivate(true);
  //   axios
  //     .get(`${process.env.REACT_APP_BASEURL}/public?page=${0}&size=5`, {
  //       headers: { Authorization: accessToken },
  //     })
  //     .then((res) => {
  //       setIsLoadingForSelfMadePrivate(false);
  //       console.log(res.data.content);
  //       setDataListForSelfMadePrivate((prev) => [...prev, ...res.data.content]);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  // <------------------------------ api상 private에서 invite로 바꿔야 합니다.
  // useEffect(() => {
  //   if (inViewForPrivate) {
  //     setIsLoadingForPrivate(true);
  //     axios
  //       .get(
  //         `${process.env.REACT_APP_BASEURL}/private?page=${privatePage}&size=5`,
  //         {
  //           headers: { Authorization: accessToken },
  //         }
  //       )
  //       .then((res) => {
  //         setIsLoadingForPrivate(false);

  //         setDataListForPrivate((prev) => [...prev, ...res.data]);
  //         setPrivatePage((prev) => prev + 1);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }
  // }, [inViewForPrivate]);

  // useEffect(() => {
  //   if (inViewForPublic) {
  //     setIsLoadingForPublic(true);
  //     axios
  //       .get(
  //         `${process.env.REACT_APP_BASEURL}/public?page=${publicPage}&size=5`,
  //         {
  //           headers: { Authorization: accessToken },
  //         }
  //       )
  //       .then((res) => {
  //         setIsLoadingForPublic(false);
  //         setDataListForPublic((prev) => [...prev, ...res.data.content]);
  //         setPublicPage((prev) => prev + 1);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }
  // }, [inViewForPublic]);

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


  console.log(data);
  const diaryList = data?.data;
  console.log(diaryList);

  const onClickFilterButtonHandler = (val) => {
    filterMode = val;
  };

  const [dataListForSelfMade, setDataListForSelfMade] = useState([
    {},
    {},
    {},
    {},
    {},
  ]);
  axios
    .get(`${process.env.REACT_APP_BASEURL}/public?page=${0}&size=5`, {
      headers: { Authorization: accessToken },
    })
    .then((res) => console.log(res));

  return (
    <div>
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
          {dataListForSelfMade?.map((item, i) => (
            <div key={i} className="slide__container">
              <div className="slide">{i}</div>
            </div>
          ))}
        </div>
      </CircularCarousel>
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
            <span slot="wrapper-end" ref={refForPrivate}>
              PUBLIC 더 넣기
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
            <span slot="wrapper-end" ref={refForPublic}>
              PUBLIC 더 넣기
            </span>
          </Swiper>
        </SwiperArea>
      </div>

      <Navigationbar />
    </WholeArea>
  );
};

export default MainPage;

const WelcomeMsg = styled.h2`
  position: relative;
  right: 80px;
`;

const ProfileImg = styled.div`
  position: relative;
  left: 120px;
  bottom: 30px;
  width: 50px;
  height: 50px;
  border-radius: 70%;
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
        background: rgba(red, 0.5);
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
`;

const Thumb = styled.div`
  background-color: gray;
  width: 300px;
  height: 200px;
  margin-bottom: 10px;
`;

const FilterArea = styled.div`
  width: 280px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
`;

const FilterButton = styled.div`
  height: 20px;
  padding: 0px 20px;
  background-color: #d7d7d7;
  border-radius: 20px;
`;
