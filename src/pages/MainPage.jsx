import React, { useEffect, useState, Component } from "react";
import styled from "styled-components";
import defaultProfileImg from "../assets/defaultProfileImg.jpeg";
import { WholeArea } from "../styles/WholeAreaStyle";
import "react-alice-carousel/lib/alice-carousel.css";
import Navigationbar from "../components/Navigationbar";
import { useQuery } from "react-query";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSpring, animated } from "@react-spring/web";

const MainPage = () => {
  const accessToken = localStorage.getItem("accessToken");
  // useEffect(() => {
  //   if (!accessToken) {
  //     navigate("/login");
  //   }
  // }, []);

  const currentLoginUser = useSelector((state) => state.currentUserInfoSlice);

  // 데이터 수신
  // const { data, isLoading, isError, error } = useQuery(["getDiaries"], () => {
  //   return axios.get(`${process.env.REACT_APP_BASEURL}/?page=1&size=5`, {
  //     headers: { Authorization: accessToken },
  //   });
  // });
  // if (isError) {
  //   console.log(error);
  // } else if (isLoading) {
  //   console.log("LOADING");
  // }

  // 애니메이션
  const [prevItem, setPrevItem] = useState(0);
  const [centerItem, setCenterItem] = useState(1);
  const [nextItem, setNextItem] = useState(2);

  const [carouselDeg, setCarouselDeg] = useState(17);
  const [itemDeg, setItemDeg] = useState(-17);
  const [carousel, setCarousel] = useState([
    { name: "1", id: 0 },
    { name: "2", id: 1 },
    { name: "3", id: 2 },
    { name: "4", id: 3 },
    { name: "5", id: 4 },
    { name: "6", id: 5 },
    { name: "7", id: 6 },
    { name: "8", id: 7 },
    { name: "9", id: 8 },
  ]);

  return (
    <WholeArea>
      <WelcomeMsg>
        {currentLoginUser.userNickname === ""
          ? "좋은 하루입니다"
          : currentLoginUser.userNickname + "님"}
        <br />
        안녕하세요
      </WelcomeMsg>
      <div style={{ display: "flex" }}>
        <div style={{ backgroundColor: "gray", width: "30vw", height: "42vw" }}>
          a
        </div>
        <div style={{ backgroundColor: "gray", width: "35vw", height: "49vw" }}>
          b
        </div>
        <div style={{ backgroundColor: "gray", width: "30vw", height: "42vw" }}>
          c
        </div>
        <div>d</div>
      </div>
      <ProfileImg>
        <img src={defaultProfileImg} />
      </ProfileImg>

      <Navigationbar />
    </WholeArea>
  );
};

export default MainPage;

const RoundCircle = styled.div`
  background-color: gray;
  width: 565px;
  height: 565px;
  position: fixed;
  top: -400px;
  border-radius: 50%;
`;

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
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
