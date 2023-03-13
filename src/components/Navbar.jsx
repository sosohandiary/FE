import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { mobileMaxWidth } from "../assets/maxScreen";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <>
      <TopArea>
        <LogoArea>
          <div
            style={{ backgroundColor: "red", height: "35px", minWidth: "50px" }}
          >
            로고
          </div>
          <div>Re: born</div>
        </LogoArea>
        <MypageArea>
          <div>로그인</div>
          <div>마이페이지</div>
        </MypageArea>
      </TopArea>
      <Menubar>
        <span
          onClick={() => {
            navigate("/");
          }}
        >
          Home
        </span>
        <span
          onClick={() => {
            navigate("/notice");
          }}
        >
          공지사항
        </span>
        <span
          onClick={() => {
            navigate("/transfusion");
          }}
        >
          지정헌혈필요게시판
        </span>
        <span>헌혈예약</span>
        <span
          onClick={() => {
            navigate("/knowledge");
          }}
        >
          헌혈지식
        </span>
      </Menubar>
      <ContlorBox>햄버거</ContlorBox>
      <BigImageArea>dd</BigImageArea>
    </>
  );
};

export default Navbar;

// TOP AREA
const TopArea = styled.div`
  background-color: gray;
  display: flex;
  height: 50px;
  justify-content: space-between;
  align-items: center;
`;

const LogoArea = styled.div`
  background-color: #b6b6b6;
  display: flex;

  div {
    margin-left: 10px;
  }
`;

const MypageArea = styled.div`
  background-color: #febcc7;
  display: flex;
  div {
    margin-right: 50px;
  }
`;

// MENU BAR
const Menubar = styled.div`
  background-color: black;
  height: 40px;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    margin: 50px;
  }
`;

// Big IMG Area
const BigImageArea = styled.div`
  background-image: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
    url("https://www.redcross.or.kr/common/file_util.do?action=download&filepath=redcross_mainvisual/22/2622/2622/&display_filename=");
  background-position: cover;

  height: 250px;
`;

const ContlorBox = styled.div`
  display: flex;
  align-items: center;
  position: sticky;
  @media screen and (min-width: ${mobileMaxWidth}) {
    flex-direction: column;
    align-items: flex-end;
    display: none;
  }
`;
