import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import styled from "styled-components";
import axios from "axios";

import { getMypage, getProfile } from "../api/mypage";
import { WholeArea } from "../styles/WholeAreaStyle";
import { ProfilePicMedium } from "../components/ProfilePics";

function MyPage() {
  const accessToken = localStorage.getItem("accessToken");

  const { data:myPageData } = useQuery(["getMypage"], () =>
    getMypage(accessToken)
  );

  const { data:profileData } = useQuery(["getProfile"], () => 
    getProfile(accessToken)
  );

  const mypage = myPageData?.data;
  const profile = profileData?.data;

  const navigate = useNavigate();

  const navToProfile = () => {
    navigate("/profile");
  };

  return (
    <>
      <WholeArea style={{ margin: "30px auto", maxWidth: "720px" }}>
        <Title size='18'>마이페이지</Title>
        <ProfilePicMedium src='https://avatars.githubusercontent.com/u/109452831?v=4' />
        <Title size='22'>{profile?.nickname}</Title>

        <NavButton onClick={navToProfile}>
          <Label size='16'>프로필 편집</Label>
        </NavButton>

        <MenuBox>
          <EachMenuBox boderRight='1px solid'>
            <LabelSpan>친구</LabelSpan>
            <div>10</div>
          </EachMenuBox>
          <EachMenuBox>
            <LabelSpan>마일리지</LabelSpan>
            <div>20</div>
          </EachMenuBox>
        </MenuBox>
        <Label size='18' alignSelf='flex-start'>
          내 다이어리
        </Label>

        <DiaryCards>
          <ThumbnailBox>??</ThumbnailBox>
          <div style={{ marginLeft: "80px" }}>
            <Title>맵돌리기</Title>
            <Label>개설일: 2023.02.10</Label>
          </div>
        </DiaryCards>

        <DiaryCards>
          <ThumbnailBox>??</ThumbnailBox>
          <div style={{ marginLeft: "80px" }}>
            <Title>하드코딩</Title>
            <Label>개설일: 2023.02.10</Label>
          </div>
        </DiaryCards>

        <DiaryCards>
          <ThumbnailBox>??</ThumbnailBox>
          <div style={{ marginLeft: "80px" }}>
            <Title>하드코딩</Title>
            <Label>개설일: 2023.02.10</Label>
          </div>
        </DiaryCards>
      </WholeArea>
    </>
  );
}

export default MyPage;

const Title = styled.div`
  font-weight: bold;
  font-size: ${({ size }) => `${size}px`};
  color: black;

  display: flex;
  padding: 10px;
`;

const Label = styled.div`
  color: #858585;
  font-size: ${({ size }) => `${size}px`};
  display: block;
  font-weight: ${(props) => props.fontWeight};
  margin: 10px;

  display: flex;
  align-self: ${({ alignSelf }) => alignSelf};
`;

const NavButton = styled.button`
  border: none;
  background: none;

  display: flex;
  align-self: flex-end;
`;

const MenuBox = styled.div`
  /* box-sizing: border-box; */
  display: flex;
  height: 55px;
  width: 50%;
  max-width: 300px;
  outline: none;
  border-radius: 15px;
  padding: 0 10px;
  font-size: 16px;
  border: 1px solid #eee;
  background: #d9d9d9;
  margin-bottom: 20px;

  text-align: center;
  align-items: center;
  justify-content: center;
`;

const EachMenuBox = styled.div`
  cursor: pointer;
  flex: 1;
  line-height: 1.3rem;
  color: ${(props) => props.color};
  border-right: ${(props) => props.boderRight};
  border-right-color: #9e9b9b;

  text-align: center;
  align-items: center;
  justify-content: center;
`;

const DiaryCards = styled.div`
  border-radius: 23px;
  width: 90%;
  max-width: 500px;
  position: relative;

  background: #d9d9d9;

  margin: 5px;
`;

const ThumbnailBox = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;

  box-sizing: border-box;
  background: white;
  padding: 20px;
  border-radius: 18px;
`;

const LabelSpan = styled.span`
  color: #858585;
`;
