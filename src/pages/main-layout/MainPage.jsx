import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import "swiper/css";
import "swiper/css/pagination";
import { useInView } from "react-intersection-observer";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ellipse from "../../assets/main-page/Ellipse 111.png";
import DiaryCard from "../../components/mainpage/DiaryCard";
import DiaryCardTopBig from "../../components/mainpage/DiaryCardTopBig";
import { useInfiniteQuery, useQuery } from "react-query";
import {
  axiosDiariesOfSelfmade,
  axiosInvitedDiaries,
  axiosPublicDiaries,
} from "../../api/mainpage";
import { getProfile } from "../../api/mypage";
import { useDispatch } from "react-redux";
import { changeCurNavbarMode } from "../../contexts/curNavbarModeSlice";
import defaultProfileImg from "../../assets/defaultProfileImg.jpeg";
import { cacheTime, staleTime } from "../../constants/staleAndCacheTime";

const MainPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [activeIdxForSelfmade, setActiveIdxForSelfmade] = useState(0);
  const [skeletonWidth, skeletonHeight, skeletonBorderRadius] = [140, 196, 25];
  const accessToken = window.localStorage.getItem("accessToken");

  //navMode 설정
  useEffect(() => {
    dispatch(changeCurNavbarMode("HOME"));
  }, []);

  const resOfCurrentUserInfo = useQuery(
    ["getProfile"],
    () => getProfile(accessToken),
    {
      staleTime,
      cacheTime,
    }
  );

  //데이터 겟

  const resForSelfmade = useQuery(
    ["getDiariesOfSelfmade"],
    () => {
      console.log("REFETCH");
      return axiosDiariesOfSelfmade(accessToken);
    },
    {
      staleTime,
      cacheTime,
    }
  );

  const {
    data: dataOfPublicDiaries,
    fetchNextPage: fetchNextPageOfPublicDiaries,
    isFetching: isFetchingOfPublicDiaries,
  } = useInfiniteQuery(
    "getPublicDiaries",
    ({ pageParam = 0 }) => axiosPublicDiaries(pageParam),
    {
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length + 1;
        return nextPage;
      },
    }
  );

  const {
    data: dataOfInvitedDiaries,
    fetchNextPage: fetchNextPageOfInvitedDiaries,
    isFetching: isFetchingOfInvitedDiaries,
  } = useInfiniteQuery(
    "getInvitedDiaries",
    ({ pageParam = 0 }) => axiosInvitedDiaries(accessToken, pageParam),
    {
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length + 1;
        return nextPage;
      },
    }
  );

  const dataListForPublic = dataOfPublicDiaries?.pages.reduce((acc, cur) => {
    return [...acc, ...cur.data.content];
  }, []);
  const dataListForInvited = dataOfInvitedDiaries?.pages.reduce((acc, cur) => {
    return [...acc, ...cur.data.content];
  }, []);

  //무한스크롤
  const { ref: refForInvited, inView: inViewForInvited } = useInView({
    threshold: 0,
  });
  const { ref: refForPublic, inView: inViewForPublic } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inViewForPublic) {
      fetchNextPageOfPublicDiaries();
    }
  }, [inViewForPublic]);

  useEffect(() => {
    if (inViewForInvited) {
      fetchNextPageOfInvitedDiaries();
    }
  }, [inViewForInvited]);

  const goToDiaryDetail = (id) => {
    navigate(`/diaries/${id}`);
  };

  return (
    <MainContainer>
      <div style={{ marginBottom: "100px" }}>
        <WelcomeArea>
          <div>안녕하세요</div>

          <div>{resOfCurrentUserInfo.data?.data.nickname + "님!"}</div>
        </WelcomeArea>
        <Label
          style={{
            backgroundColor: "#e1e7fc",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div>내가 만든 다이어리</div>
          <CurProfileImage
            style={{ marginRight: "15px" }}
            url={
              resOfCurrentUserInfo.data?.data.profileImageUrl
                ? resOfCurrentUserInfo.data?.data.profileImageUrl
                : defaultProfileImg
            }
            onClick={() => {
              navigate("/mypage");
            }}
          ></CurProfileImage>
        </Label>
        <SelfmadeArea>
          <Swiper
            watchSlidesProgress
            centeredSlides={true}
            slidesPerView={3}
            spaceBetween={0}
            onSlideChange={(e) => setActiveIdxForSelfmade(e.activeIndex)}
            className="mySwiper"
          >
            {resForSelfmade.data?.data.length === 0 ? (
              <SwiperSlide
                onClick={() => {
                  navigate("/diary");
                }}
              >
                <DiaryCardTopBig
                  color="purple"
                  idx={0}
                  activeIdxForSelfmade={activeIdxForSelfmade}
                  item={{
                    title: "다이어리 만들기",
                  }}
                ></DiaryCardTopBig>
              </SwiperSlide>
            ) : (
              resForSelfmade.data?.data.map((item, i) => (
                <SwiperSlide key={i} onClick={() => goToDiaryDetail(item.id)}>
                  <DiaryCardTopBig
                    color="purple"
                    idx={i}
                    activeIdxForSelfmade={activeIdxForSelfmade}
                    item={item}
                    onClick={() => {
                      navigate("/dd");
                    }}
                  ></DiaryCardTopBig>
                </SwiperSlide>
              ))
            )}
          </Swiper>
        </SelfmadeArea>
        <div style={{ margin: "10px 10px 80px 10px" }}>
          <Label>공개 다이어리</Label>
          <SwiperArea>
            <Swiper
              slidesPerView={"auto"}
              spaceBetween={20}
              className="mySwiper"
            >
              {dataListForPublic?.map((item, i) => (
                <SwiperSlide
                  key={i}
                  onClick={() => {
                    goToDiaryDetail(item.id);
                  }}
                >
                  <DiaryCard item={item} color="purple" />
                </SwiperSlide>
              ))}
              {dataListForPublic?.length < 3 ? (
                <div>
                  <SwiperSlide
                    style={{
                      width: "375px",
                      backgroundColor: "#e4e4e4",
                      borderRadius: "25px",
                    }}
                  >
                    다이어리가 없습니다.
                  </SwiperSlide>
                </div>
              ) : (
                ""
              )}
              {isFetchingOfPublicDiaries ? (
                <div className="swiper-lazy-preloader"></div>
              ) : (
                ""
              )}
              <SpanCard slot="wrapper-end" ref={refForPublic}>
                <Skeleton
                  width={skeletonWidth}
                  height={skeletonHeight}
                  borderRadius={skeletonBorderRadius}
                />
              </SpanCard>
            </Swiper>
          </SwiperArea>
          <Label>초대된 다이어리</Label>
          <SwiperArea>
            <Swiper
              slidesPerView={"auto"}
              spaceBetween={20}
              className="mySwiper"
            >
              {dataListForInvited?.map((item) => (
                <SwiperSlide
                  key={item.id}
                  onClick={() => {
                    goToDiaryDetail(item.id);
                  }}
                >
                  <DiaryCard item={item} color="purple" />
                </SwiperSlide>
              ))}
              {dataListForInvited?.length < 3 ? (
                <SwiperSlide
                  style={{
                    width: "375px",
                    backgroundColor: "#e4e4e4",
                    borderRadius: "25px",
                  }}
                >
                  다이어리가 없습니다.
                </SwiperSlide>
              ) : (
                ""
              )}
              {isFetchingOfInvitedDiaries ? (
                <div className="swiper-lazy-preloader"></div>
              ) : (
                ""
              )}
              <SpanCard slot="wrapper-end" ref={refForInvited}>
                <Skeleton
                  width={skeletonWidth}
                  height={skeletonHeight}
                  borderRadius={skeletonBorderRadius}
                />
              </SpanCard>
            </Swiper>
          </SwiperArea>
        </div>
      </div>
      <InvisibleDiv></InvisibleDiv>
    </MainContainer>
  );
};

export default MainPage;

const MainContainer = styled.div`
  margin: 0 auto;
  width: 400px;
  height: auto;

  border-left: 0.0625rem solid rgb(225, 226, 228);
  border-right: 0.0625rem solid rgb(225, 226, 228);
`;

const WelcomeArea = styled.div`
  font-size: 32px;
  display: flex;
  justify-content: space-between;
  padding: 24px;
  background-color: #e1e7fc;
  margin-bottom: -20px;
`;

const CurProfileImage = styled.div`
  z-index: 10;

  /* position: absolute; */
  /* top: 70px;
  right: 23px; */
  cursor: pointer;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  background-image: url(${({ url }) => url});
  background-size: cover;
  background-position: center;
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
  padding: 10px;
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

const SelfmadeArea = styled.div`
  .swiper {
    width: 100%;
    height: 100%;
    background-image: url(${ellipse});
    background-size: 100% 100%;
    background-position: 0 -120px;
    background-repeat: no-repeat;
    margin-top: -10px;
  }

  .swiper-slide {
    text-align: center;
    font-size: 18px;
    height: 300px;
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

const LoginButton = styled.div`
  border-radius: 25px;
  box-shadow: 30px;
  padding: 5px;
  font-size: 17px;
  color: gray;
  cursor: pointer;
`;

const InvisibleDiv = styled.div`
  height: 0.01px;
`;

const SpanCard = styled.span`
  margin: 0px 10px 0px 0px;
`;
