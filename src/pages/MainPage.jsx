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

  console.log(accessToken);
  useEffect(() => {
    return axios.get(`${process.env.REACT_APP_BASEURL}/?page=0&size=5`, {
      headers: { Authorization: accessToken },
    });
  }, []);
  // const { data } = useQuery(["getDiaries"], () => {
  //   return axios
  //     .get(`${process.env.REACT_APP_BASEURL}/?page=0&size=5`, {
  //       headers: { Authorization: accessToken },
  //     })
  //     .then((res) => console.log(res))
  //     .catch((err) => console.log(err));
  // });
  // console.log(data);

  const onClickFilterButtonHandler = (val) => {
    setFilterMode(val);
    console.log(val);
  };

  return (
    <WholeArea>
      <WelcomeMsg>
        {currentLoginUser.userNickname === ""
          ? "좋은 하루입니다"
          : currentLoginUser.userNickname + "님"}
        <br />
        안녕하세요
      </WelcomeMsg>
      <ProfileImg>
        <img src={defaultProfileImg} />
      </ProfileImg>
      <FilterArea>
        <FilterButton onClick={() => onClickFilterButtonHandler("ALL")}>
          전체보기
        </FilterButton>
        <FilterButton onClick={() => onClickFilterButtonHandler("PUBLIC")}>
          필터
        </FilterButton>
        <FilterButton onClick={() => onClickFilterButtonHandler("PRIVATE")}>
          필터
        </FilterButton>
      </FilterArea>
      <Thumb></Thumb>
      <Thumb></Thumb>
      <Thumb></Thumb>
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
  img {
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
